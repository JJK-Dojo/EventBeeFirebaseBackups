
'use client';

import React, { useMemo, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Event } from '@/lib/types';
import EventCardMini from '@/components/event-card-mini';
import FeaturedEventCard from '@/components/featured-event-card';
import { Search, PlusCircle } from 'lucide-react';
import { collection, query, where } from 'firebase/firestore';
import Header from '@/components/header';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function LandingPage() {
  const firestore = useFirestore();

  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const publishedEventsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'events'), where('status', '==', 'published'));
  }, [firestore]);

  const { data: allEvents, isLoading } = useCollection<Event>(publishedEventsQuery);

  const featuredEvents = useMemo(() => {
    if (!allEvents) return [];
    return [...allEvents]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [allEvents]);

  const eventsByDate = useMemo(() => {
    if (!allEvents) return [];
    return [...allEvents]
      .filter(event => event.date && new Date(event.date) >= new Date()) // Filter for upcoming events
      .sort((a, b) => {
          if (a.date && b.date) {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          }
          return 0;
      });
  }, [allEvents]);

  const eventsByPublished = useMemo(() => {
    if (!allEvents) return [];
    return [...allEvents]
        .sort((a, b) => {
            if (a.createdAt && b.createdAt) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }
            return 0;
        });
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
      <Header showNavButtons={false} />
       <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
            <div className="mb-12">
                {isLoading ? (
                    <Skeleton className="h-[50vh] w-full rounded-lg" />
                ) : featuredEvents.length > 0 ? (
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent className="-ml-4 h-[50vh]">
                            {featuredEvents.map((event) => (
                                <CarouselItem key={event.id} className="pl-4">
                                    <FeaturedEventCard event={event} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                ) : (
                    <div className="mb-8 p-6 rounded-lg bg-card border text-center">
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                            Discover Your Next Experience
                        </h1>
                        <p className="text-lg text-muted-foreground mb-6">
                          Your guide to local happenings.
                        </p>
                    </div>
                )}
            </div>
            
            <div className="mb-8 p-6 rounded-lg bg-card border text-center">
                 <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Find an Event
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Browse events or create your own.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/find-events" passHref>
                        <Button variant="accent">
                          <Search className="mr-2 h-5 w-5" />
                          Find an Event
                        </Button>
                    </Link>
                    <Link href="/create-event" passHref>
                        <Button variant="accent">
                          <PlusCircle className="mr-2 h-5 w-5" />
                          Create an Event
                        </Button>
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
