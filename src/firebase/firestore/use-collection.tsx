'use client';
import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
  type DocumentData,
  type Query,
  type FirestoreError,
  Timestamp,
} from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

type Options = {
  where?: [string, '==', any];
};

const processDoc = (doc: DocumentData) => {
    const data = doc.data();
    const processedData: DocumentData = {};
    for (const key in data) {
        if (data[key] instanceof Timestamp) {
            processedData[key] = data[key].toDate().toISOString();
        } else {
            processedData[key] = data[key];
        }
    }
    return { id: doc.id, ...processedData };
}

export function useCollection<T>(path: string, opts?: Options) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    let q = query(collection(firestore, path));
    if (opts?.where && opts.where[2] !== undefined) {
      q = query(q, where(opts.where[0], opts.where[1], opts.where[2]));
    } else if (opts?.where && opts.where[2] === undefined) {
      // If where clause is provided but the value is undefined, it means we should not fetch yet.
      setIsLoading(false);
      setData([]); // No user, no events
      return;
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map(processDoc) as T[];
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
  }, [firestore, path, opts?.where?.[0], opts?.where?.[1], opts?.where?.[2]]); // Re-run effect if query params change

  return { data, isLoading, error };
}
