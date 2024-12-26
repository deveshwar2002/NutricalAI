import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const DAILY_CREDIT_LIMIT = 3;

export const initializeUserCredits = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists() || !userDoc.data().credits) {
    await setDoc(userRef, {
      credits: {
        count: DAILY_CREDIT_LIMIT,
        lastReset: new Date().toISOString(),
        isPremium: false
      }
    }, { merge: true });
  }
};

export const checkAndResetCredits = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  const credits = userDoc.data()?.credits;

  if (!credits) return null;

  const lastReset = new Date(credits.lastReset);
  const now = new Date();
  const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);

  if (hoursSinceReset >= 24) {
    const newCredits = {
      count: DAILY_CREDIT_LIMIT,
      lastReset: now.toISOString(),
      isPremium: credits.isPremium
    };
    await updateDoc(userRef, { credits: newCredits });
    return newCredits;
  }

  return credits;
};

export const useCredit = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const credits = await checkAndResetCredits(userId);

  if (!credits) return false;
  if (credits.isPremium) return true;
  if (credits.count <= 0) return false;

  await updateDoc(userRef, {
    'credits.count': credits.count - 1
  });

  return true;
};