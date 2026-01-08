
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import EventCard from '@/components/event-card';
import EventFilters from '@/components/event-filters';
import Header from '@/components/header';
import type { Event } from '@/lib/types';
import type { FilterState } from '@/components/event-filters';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, Timestamp } from 'firebase/firestore';

export default function FindEventsPage() {
  const firestore = useFirestore();
  const [sortOption, setSortOption] = useState('recent');
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  const eventsQuery = useMemoFirebase(() => {
    const now = new Date();
    let q = query(collection(firestore, 'events'), where('status', '==', 'published'));

    if (activeFilters) {
        const { category, state, district, searchText, tags } = activeFilters;
        if (category) {
            q = query(q, where('category', '==', category));
        }
        // Firestore does not support partial string matches ('contains' for location)
        // Client-side filtering will be needed for state, district, and searchText
        if (tags.length > 0) {
            q = query(q, where('tags', 'array-contains-any', tags));
        }
    }
    
    // Sorting logic
    switch (sortOption) {
        case 'recent':
            q = query(q, orderBy('createdAt', 'desc'));
            break;
        case 'today':
            const todayStart = new Date(now.setHours(0, 0, 0, 0));
            const todayEnd = new Date(now.setHours(23, 59, 59, 999));
            q = query(q, where('createdAt', '>=', todayStart), where('createdAt', '<=', todayEnd), orderBy('createdAt', 'desc'));
            break;
        case 'next3-5':
            const threeDays = new Date(now);
            threeDays.setDate(now.getDate() + 3);
            const fiveDays = new Date(now);
            fiveDays.setDate(now.getDate() + 5);
            q = query(q, where('date', '>=', threeDays), where('date', '<=', fiveDays), orderBy('date'));
            break;
        case 'next6-10':
             const sixDays = new Date(now);
            sixDays.setDate(now.getDate() + 6);
            const tenDays = new Date(now);
            tenDays.setDate(now.getDate() + 10);
            q = query(q, where('date', '>=', sixDays), where('date', '<=', tenDays), orderBy('date'));
            break;
        // State and District sorting must be done client-side
        default:
            q = query(q, orderBy('date', 'desc'));
    }

    return q;
  }, [firestore, activeFilters, sortOption]);

  const { data: allEvents, isLoading } = useCollection<Event>(eventsQuery);

  const filteredEvents = useMemo(() => {
    if (!allEvents) return [];

    let eventsToDisplay = [...allEvents];

    // Client-side filtering for location because Firestore doesn't support substring matches easily.
    if (activeFilters) {
      const { state, district, searchText } = activeFilters;
      if (state) {
          eventsToDisplay = eventsToDisplay.filter(event => (event.location?.toLowerCase() || '').includes(state.toLowerCase()));
      }
      if (district) {
          eventsToDisplay = eventsToDisplay.filter(event => (event.location?.toLowerCase() || '').includes(district.toLowerCase()));
      }
      if (searchText) {
          const lowercasedSearch = searchText.toLowerCase();
          eventsToDisplay = eventsToDisplay.filter(event => 
              (event.location?.toLowerCase() || '').includes(lowercasedSearch) ||
              (event.title?.toLowerCase() || '').includes(lowercasedSearch)
          );
      }
    }

    // Client-side sorting for location
    if (sortOption === 'state' || sortOption === 'district') {
       eventsToDisplay.sort((a, b) => {
            const aLocation = a.location.split(', ');
            const bLocation = b.location.split(', ');
            if (sortOption === 'state') {
                return (aLocation[1] || '').localeCompare(bLocation[1] || '');
            }
            return (aLocation[0] || '').localeCompare(bLocation[0] || '');
        });
    }
    
    return eventsToDisplay;
  }, [allEvents, activeFilters, sortOption]);


  const handleFilter = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  const handleSort = (sortValue: string) => {
    setSortOption(sortValue);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Find Your Next Experience
            </h1>
            <p className="text-lg text-muted-foreground">
              Hyperlocal events for your city, curated for students & young professionals.
            </p>
          </div>
          <EventFilters onFilter={handleFilter} onSortChange={handleSort} />
          {isLoading ? (
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
             </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg font-semibold text-foreground">No Events Found</p>
              <p className="text-muted-foreground">Try adjusting your filters or searching for something else.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
