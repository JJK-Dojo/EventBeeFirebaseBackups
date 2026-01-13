'use client';
import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, type DocumentData, type FirestoreError, Timestamp } from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

const processDoc = (doc: DocumentData) => {
    const data = doc.data();
    const processedData: DocumentData = {};
    if (data) {
        for (const key in data) {
            if (data[key] instanceof Timestamp) {
                processedData[key] = data[key].toDate().toISOString();
            } else {
                processedData[key] = data[key];
            }
        }
    }
    return { id: doc.id, ...processedData };
}

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
          setData(processDoc(snapshot) as T);
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
