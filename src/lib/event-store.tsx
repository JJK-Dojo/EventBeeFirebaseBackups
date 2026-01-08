'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Event } from '@/lib/types';
import { DUMMY_EVENTS } from '@/lib/data';

type EventContextType = {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (updatedEvent: Event) => void;
  isLoading: boolean;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

const EVENT_STORAGE_KEY = 'eventbee_events';

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load events from localStorage on initial render
  useEffect(() => {
    try {
      const storedEvents = localStorage.getItem(EVENT_STORAGE_KEY);
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        // If no events in storage, initialize with dummy data
        setEvents(DUMMY_EVENTS);
      }
    } catch (error) {
      console.error("Failed to parse events from localStorage", error);
      // Fallback to dummy data if parsing fails
      setEvents(DUMMY_EVENTS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    // Don't save during initial loading or if events are empty
    if (!isLoading) {
      try {
        localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(events));
      } catch (error) {
        console.error("Failed to save events to localStorage", error);
      }
    }
  }, [events, isLoading]);

  const addEvent = (event: Event) => {
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
    <EventContext.Provider value={{ events, addEvent, updateEvent, isLoading }}>
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
