
'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { CalendarDays, MapPin, Navigation, User, Clock } from 'lucide-react';
import { useEvents } from '@/lib/event-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/header';

export default function EventDetailPage({ params: { id } }: { params: { id: string } }) {
  const { events } = useEvents();
  const event = events.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
    <Header/>
    <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
            <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg shadow-lg md:h-96">
                <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                data-ai-hint={event.imageHint}
                />
            </div>
            <h1 className="mb-4 font-headline text-3xl font-bold tracking-tight md:text-4xl">
                {event.title}
            </h1>
            <p className="text-lg text-muted-foreground">{event.description}</p>
            </div>
            <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                    <CalendarDays className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <p className="font-semibold">Date</p>
                        <p className="text-muted-foreground">
                        {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                        </p>
                    </div>
                    </div>
                    <div className="flex items-start">
                    <Clock className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <p className="font-semibold">Time</p>
                        <p className="text-muted-foreground">
                        {format(new Date(event.date), 'h:mm a')}
                        </p>
                    </div>
                    </div>
                    <div className="flex items-start">
                    <MapPin className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <p className="font-semibold">Location</p>
                        <p className="text-muted-foreground">{event.location}</p>
                    </div>
                    </div>
                    <div className="flex items-start">
                    <User className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <p className="font-semibold">Organizer</p>
                        <p className="text-muted-foreground">{event.organizer.name}</p>
                    </div>
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                <div className="flex h-60 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    Map Placeholder
                </div>
                </CardContent>
            </Card>

            <Button size="lg" className="w-full">
                <Navigation className="mr-2 h-5 w-5" />
                Get Directions
            </Button>
            </div>
        </div>
        </div>
    </main>
    </div>
  );
}
