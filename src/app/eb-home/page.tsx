
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection } from '@/firebase';
import type { Event } from '@/lib/types';
import Logo from '@/components/logo';
import EventCardMini from '@/components/event-card-mini';
import type { Metadata } from 'next';

export default function LandingPage() {
  const { data: allEvents, isLoading } = useCollection<Event>('events', {
    where: ['status', '==', 'published'],
  });

  const eventsByDate = useMemo(() => {
    if (!allEvents) return [];
    return [...allEvents]
      .filter(event => new Date(event.date) >= new Date()) // Filter for upcoming events
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [allEvents]);

  const eventsByPublished = useMemo(() => {
    if (!allEvents) return [];
    return [...allEvents]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [allEvents]);

  const EventList = ({ events }: { events: Event[] }) => {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                        <Skeleton className="h-20 w-20 rounded-md" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No events to display.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {events.map((event) => (
                <EventCardMini key={event.id} event={event} />
            ))}
        </div>
    );
  };


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
          <div className="container mx-auto flex h-20 items-center justify-between px-4">
            <Logo />
             <div className="flex items-center gap-2 sm:gap-4">
                <Link href="/login" passHref>
                    <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/signup" passHref>
                    <Button>Sign Up</Button>
                </Link>
             </div>
          </div>
      </header>
       <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 p-6 rounded-lg bg-card border text-center">
                <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Discover Your Next Experience
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                    Hyperlocal events for your city, curated for students & young professionals.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/find-events" passHref>
                        <Button size="lg">Find an Event</Button>
                    </Link>
                    <Link href="/create-event" passHref>
                        <Button size="lg" variant="secondary">Create an Event</Button>
                    </Link>
                    <Link href="/find-events" passHref>
                        <Button size="lg" variant="ghost">Continue as Guest</Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h2 className="text-2xl font-bold font-headline mb-4">Happening Soon</h2>
                    <EventList events={eventsByDate} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold font-headline mb-4">Recently Added</h2>
                    <EventList events={eventsByPublished} />
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}