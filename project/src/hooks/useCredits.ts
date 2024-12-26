import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { checkAndResetCredits, useCredit as useCreditUtil } from '../utils/creditSystem';

export const useCredits = () => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCredits(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), async (doc) => {
      if (doc.exists()) {
        const updatedCredits = await checkAndResetCredits(user.uid);
        setCredits(updatedCredits);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const useCredit = async () => {
    if (!user) return false;
    return useCreditUtil(user.uid);
  };

  return {
    credits,
    loading,
    useCredit
  };
};