'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Event } from '@/lib/types';
import { DUMMY_EVENTS } from '@/lib/data';

type EventContextType = {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (updatedEvent: Event) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(DUMMY_EVENTS);

  const addEvent = (event: Event) => {
    // Add the new event to the beginning of the list to show it first
    setEvents(prevEvents => [event, ...prevEvents]);
  };
  
  const updateEvent = (updatedEvent: Event) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
