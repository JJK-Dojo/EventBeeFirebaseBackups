'use client';
import { useState, useEffect, useRef } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
  type DocumentData,
  type Query,
  type FirestoreError,
} from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

type Options = {
  where?: [string, '==', any];
};

export function useCollection<T>(path: string, opts?: Options) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  // useRef to store the query to avoid re-creating it on every render
  const queryRef = useRef<Query | null>(null);
  if (!queryRef.current) {
    let q = query(collection(firestore, path));
    if (opts?.where) {
      q = query(q, where(opts.where[0], opts.where[1], opts.where[2]));
    }
    queryRef.current = q;
  }

  useEffect(() => {
    if (!queryRef.current) return;

    const unsubscribe = onSnapshot(
      queryRef.current,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(items);
        setIsLoading(false);
      },
      (err: FirestoreError) => {
        setError(err);
        setIsLoading(false);
        const permissionError = new FirestorePermissionError({
            path,
            operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [path]); // Re-run effect if path changes

  return { data, isLoading, error };
}
