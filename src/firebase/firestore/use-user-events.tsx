
'use client';
import { useCollection } from './use-collection';
import type { Event } from '@/lib/types';

export function useUserEvents(userId?: string) {
  const { data, isLoading, error } = useCollection<Event>('events', {
    where: userId ? ['organizer.id', '==', userId] : undefined,
  });

  return { data, isLoading, error };
}
