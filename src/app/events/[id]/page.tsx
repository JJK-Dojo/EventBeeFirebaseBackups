
'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, MapPin, Navigation, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/header';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { Event } from '@/lib/types';
import { doc } from 'firebase/firestore';

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const firestore = useFirestore();
  
  const eventRef = useMemoFirebase(() => {
    if (!id) return null;
    return doc(firestore, 'events', id);
  }, [firestore, id]);

  const { data: event, isLoading } = useDoc<Event>(eventRef);

  if (isLoading) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8 text-center">
              <p>Loading event...</p>
            </div>
            </main>
        </div>
    )
  }

  if (!event) {
    // In a real app, you might want to show a more descriptive "not found" page
    // notFound(); 
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8 text-center">
              <p>Event not found.</p>
            </div>
            </main>
        </div>
    )
  }


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative mb-6 h-80 w-full cursor-pointer overflow-hidden rounded-lg shadow-lg md:h-[450px]">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      data-ai-hint={event.imageHint}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                  <div className="relative h-[80vh] w-full">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>

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
                        <p className="text-muted-foreground">
                          {event.organizer.name}
                        </p>
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
