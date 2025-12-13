
'use client';

import { useState } from 'react';
import { useEvents } from '@/lib/event-store';
import EventCard from '@/components/event-card';
import EventFilters from '@/components/event-filters';
import Header from '@/components/header';
import type { Event } from '@/lib/types';
import type { FilterState } from '@/components/event-filters';

export default function Home() {
  const { events: allEvents } = useEvents();
  const sortedEvents = [...allEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [filteredEvents, setFilteredEvents] = useState<Event[]>(sortedEvents);

  const handleFilter = (filters: FilterState) => {
    const {
      tags,
      category,
      state,
      district,
      searchText,
    } = filters;

    let events = sortedEvents;

    if (tags.length > 0) {
        events = events.filter(event => 
            tags.some(tag => event.title.toLowerCase().includes(tag) || event.description.toLowerCase().includes(tag))
        );
    }
    
    if (category) {
        events = events.filter(event => event.category.toLowerCase() === category.toLowerCase());
    }

    if (state) {
        events = events.filter(event => event.location.toLowerCase().includes(state.toLowerCase()));
    }

    if (district) {
        events = events.filter(event => event.location.toLowerCase().includes(district.toLowerCase()));
    }

    if (searchText) {
        const lowercasedSearch = searchText.toLowerCase();
        const isPincode = /^\d{6}$/.test(lowercasedSearch);
        
        events = events.filter(event => {
            if (isPincode) {
                return event.location.includes(lowercasedSearch);
            }
            return event.location.toLowerCase().includes(lowercasedSearch) || event.title.toLowerCase().includes(lowercasedSearch)
        });
    }

    setFilteredEvents(events);
  };

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
          <EventFilters onFilter={handleFilter} />
          {filteredEvents.length > 0 ? (
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
