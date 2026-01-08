
'use client';

import React, { useState, useEffect } from 'react';
import EventCard from '@/components/event-card';
import EventFilters from '@/components/event-filters';
import Header from '@/components/header';
import type { Event } from '@/lib/types';
import type { FilterState } from '@/components/event-filters';
import { Skeleton } from '@/components/ui/skeleton';

export default function FindEventsPage() {
  const { events: allEvents, isLoading } = { events: [], isLoading: false };
  const [sortOption, setSortOption] = useState('recent');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  useEffect(() => {
    if (isLoading) return;

    let eventsToDisplay = [...allEvents];

    if (activeFilters) {
        const {
            tags,
            category,
            state,
            district,
            searchText,
        } = activeFilters;

        if (tags.length > 0) {
            eventsToDisplay = eventsToDisplay.filter(event => 
                tags.some(tag => (event.title?.toLowerCase() || '').includes(tag) || (event.description?.toLowerCase() || '').includes(tag))
            );
        }
        
        if (category) {
            eventsToDisplay = eventsToDisplay.filter(event => (event.category?.toLowerCase() || '') === category.toLowerCase());
        }

        if (state) {
            eventsToDisplay = eventsToDisplay.filter(event => (event.location?.toLowerCase() || '').includes(state.toLowerCase()));
        }

        if (district) {
            eventsToDisplay = eventsToDisplay.filter(event => (event.location?.toLowerCase() || '').includes(district.toLowerCase()));
        }

        if (searchText) {
            const lowercasedSearch = searchText.toLowerCase();
            const isPincode = /^\d{6}$/.test(lowercasedSearch);
            
            eventsToDisplay = eventsToDisplay.filter(event => {
                if (isPincode) {
                    return (event.location || '').includes(lowercasedSearch);
                }
                return (event.location?.toLowerCase() || '').includes(lowercasedSearch) || (event.title?.toLowerCase() || '').includes(lowercasedSearch)
            });
        }
    }
    
    // Filter only published events
    eventsToDisplay = eventsToDisplay.filter(event => event.status === 'published');

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const threeDays = new Date(now);
    threeDays.setDate(now.getDate() + 3);
    const fiveDays = new Date(now);
    fiveDays.setDate(now.getDate() + 5);
    const sixDays = new Date(now);
    sixDays.setDate(now.getDate() + 6);
    const tenDays = new Date(now);
    tenDays.setDate(now.getDate() + 10);
    
    let eventsToSort = [...eventsToDisplay];

    if (sortOption === 'today') {
      eventsToSort = eventsToSort.filter(event => {
        const eventCreationDate = new Date(event.createdAt);
        const eventDay = new Date(eventCreationDate.getFullYear(), eventCreationDate.getMonth(), eventCreationDate.getDate());
        return eventDay.getTime() === today.getTime();
      });
    }

    const sorted = eventsToSort.sort((a, b) => {
        switch (sortOption) {
            case 'state':
                return (a.location.split(',')[1] || '').localeCompare(b.location.split(',')[1] || '');
            case 'district':
                 return (a.location.split(',')[0] || '').localeCompare(b.location.split(',')[0] || '');
            case 'recent':
            case 'today': // Also sort today's posts by time
            default: {
                const aDate = new Date(a.date).getTime();
                const bDate = new Date(b.date).getTime();
                
                // For "recent", we use creation date. For others, event date.
                const timeA = sortOption === 'recent' ? new Date(a.createdAt).getTime() : aDate;
                const timeB = sortOption === 'recent' ? new Date(b.createdAt).getTime() : bDate;
                
                const now = new Date().getTime();
                const aIsFuture = aDate >= now;
                const bIsFuture = bDate >= now;

                if (aIsFuture && !bIsFuture) return -1;
                if (!aIsFuture && bIsFuture) return 1;

                return timeB - timeA;
            }
        }
    }).filter(event => {
        // This filter is for date ranges, not for "today" which is handled above
        const eventDate = new Date(event.date);
        switch (sortOption) {
            case 'next3-5':
                return eventDate >= threeDays && eventDate <= fiveDays;
            case 'next6-10':
                return eventDate >= sixDays && eventDate <= tenDays;
            default:
                return true;
        }
    });

    setFilteredEvents(sorted);

  }, [allEvents, sortOption, activeFilters, isLoading]);

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
