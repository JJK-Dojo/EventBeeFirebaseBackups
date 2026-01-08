import type { Event } from '@/lib/types';

const now = new Date();
const getFutureDate = (days: number) => {
    const future = new Date(now);
    future.setDate(now.getDate() + days);
    return future.toISOString();
}

const getPastDate = (days: number) => {
    const past = new Date(now);
    past.setDate(now.getDate() - days);
    return past.toISOString();
}


export const DUMMY_EVENTS: Event[] = [];
