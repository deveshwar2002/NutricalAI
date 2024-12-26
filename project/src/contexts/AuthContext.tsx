import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  isPremium: boolean;
  loading: boolean;
  signup: (email: string, password: string, fullName: string, phone?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setPremiumStatus: (status: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setIsPremium(userDoc.data()?.isPremium || false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, fullName: string, phone?: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', user.uid), {
        email,
        fullName,
        phone: phone || '',
        isPremium: false,
        createdAt: new Date().toISOString(),
        credits: {
          count: 3,
          lastReset: new Date().toISOString(),
          isPremium: false
        }
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create account');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to login');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user document exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create new user document for Google sign-in with initial credits
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          fullName: user.displayName,
          isPremium: false,
          createdAt: new Date().toISOString(),
          credits: {
            count: 3,
            lastReset: new Date().toISOString(),
            isPremium: false
          }
        });
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to login with Google');
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const setPremiumStatus = async (status: boolean) => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { isPremium: status }, { merge: true });
      setIsPremium(status);
    }
  };

  const value = {
    user,
    isPremium,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    setPremiumStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};