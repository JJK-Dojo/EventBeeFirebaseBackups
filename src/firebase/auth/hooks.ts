
'use client';

import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth, useFirestore } from '../provider';

export function useSignUp() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string, profileData: { firstName: string; lastName: string; }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const displayName = `${profileData.firstName} ${profileData.lastName}`;
      await updateProfile(user, { displayName });

      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        createdAt: new Date().toISOString(),
        role: 'basic',
      });

      setError(null);
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    }
  };

  return { signUp, error };
}

export function useSignInWithEmailAndPassword() {
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    }
  };

  return { signIn, error };
}

export function useSignInWithGoogle() {
    const auth = useAuth();
    const firestore = useFirestore();
    const [error, setError] = useState<string | null>(null);

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userDocRef = doc(firestore, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
              // If the user is new, create their profile with a default 'basic' role
              await setDoc(userDocRef, {
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  createdAt: new Date().toISOString(),
                  role: 'basic',
              });
            } else {
              // If user exists, just update their info but do not touch the role
              await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
              }, { merge: true });
            }

            setError(null);
            return true;
        } catch (e: any) {
            // Don't show an error if the user closes the popup.
            if (e.code === 'auth/popup-closed-by-user') {
                return false;
            }
            setError(e.message);
            return false;
        }
    };
    return { signInWithGoogle, error };
}

export function useSignOut() {
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const router = useRouter();

  return { signOut, error };
}
