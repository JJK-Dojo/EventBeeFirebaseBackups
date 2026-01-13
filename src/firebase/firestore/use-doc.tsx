'use client';
import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, type DocumentData, type FirestoreError } from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useDoc<T>(path: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const docRef = useRef(doc(firestore, path));

  useEffect(() => {
    const unsubscribe = onSnapshot(
      docRef.current,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() } as T);
        } else {
          setData(null);
        }
        setIsLoading(false);
      },
      (err: FirestoreError) => {
        setError(err);
        setIsLoading(false);
        const permissionError = new FirestorePermissionError({
            path,
            operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return { data, isLoading, error };
}
