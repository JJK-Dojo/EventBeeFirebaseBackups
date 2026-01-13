
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import EventCard from '@/components/event-card';
import EventFilters from '@/components/event-filters';
import Header from '@/components/header';
import type { Event } from '@/lib/types';
import type { FilterState } from '@/components/event-filters';
import { Skeleton } from '@/components/ui/skeleton';
import { DUMMY_EVENTS } from '@/lib/data';

export default function FindEventsPage() {
  const [sortOption, setSortOption] = useState('recent');
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  const allEvents = DUMMY_EVENTS.filter(event => event.status === 'published');
  const isLoading = false;

  const filteredEvents = useMemo(() => {
    let eventsToDisplay = [...allEvents];

    // Sorting logic
    switch (sortOption) {
        case 'recent':
            eventsToDisplay.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        case 'date':
             eventsToDisplay.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            break;
        default:
             eventsToDisplay.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    if (activeFilters) {
      const { category, state, district, searchText, tags } = activeFilters;
      
      if (category) {
          eventsToDisplay = eventsToDisplay.filter(event => event.category.toLowerCase() === category.toLowerCase());
      }
      if (state) {
          eventsToDisplay = eventsToDisplay.filter(event => (event.location?.toLowerCase() || '').includes(state.toLowerCase()));
      }
      if (district) {
          eventsToDisplay = eventsToDisplay.filter(event => (event.location?.toLowerCase() || '').includes(district.toLowerCase()));
      }
      if (tags.length > 0) {
        eventsToDisplay = eventsToDisplay.filter(event => 
            tags.some(tag => (event.tags || []).includes(tag))
        );
      }
      if (searchText) {
          const lowercasedSearch = searchText.toLowerCase();
          eventsToDisplay = eventsToDisplay.filter(event => 
              (event.location?.toLowerCase() || '').includes(lowercasedSearch) ||
              (event.title?.toLowerCase() || '').includes(lowercasedSearch) ||
              (event.description?.toLowerCase() || '').includes(lowercasedSearch)
          );
      }
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
