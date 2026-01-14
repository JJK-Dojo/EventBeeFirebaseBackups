
'use client';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Event } from '@/lib/types';
import { collection, query, where } from 'firebase/firestore';

export function useUserEvents(userId?: string) {
  const firestore = useFirestore();

  const userEventsQuery = useMemoFirebase(() => {
    if (!firestore || !userId) return null;
    return query(collection(firestore, 'events'), where('organizer.id', '==', userId));
  }, [firestore, userId]);

  const { data, isLoading, error } = useCollection<Event>(userEventsQuery);

  return { data, isLoading, error };
}
