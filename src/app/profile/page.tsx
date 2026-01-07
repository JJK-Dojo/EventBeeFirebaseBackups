
'use client';

import Image from 'next/image';
import React, { useState, useEffect, useMemo } from 'react';
import {
  User,
  Edit,
  FileCheck,
  FileText,
  BarChart2,
  MessageSquare,
  Award,
} from 'lucide-react';
import Header from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Combobox } from '@/components/ui/combobox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useEvents } from '@/lib/event-store';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import type { Event } from '@/lib/types';


const BeeIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
        <path d="M22 10.5c0-1.28-1.02-2.3-2.3-2.3h-1.09c-.28-2.3-2.22-4.1-4.51-4.1-2.04 0-3.79 1.4-4.32 3.25-.08.28-.18.55-.28.82-1.3-.8-2.9-1.07-4.5-1.07C2.45 6.1 1 8.01 1 10.5c0 2.25 1.54 4.14 3.75 4.86.3.92.79 1.77 1.43 2.5h-.18C3.81 17.86 2 20.06 2 22.5h2c0-1.85 1.28-3.41 3-3.92.51.35 1.05.65 1.63.89l-1.4 1.4H6.5c-.28 0-.5.22-.5.5s.22.5.5.5h3.79l1.4-1.4c.4.1.81.16 1.23.16s.82-.06 1.23-.16l1.4 1.4h3.79c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1.73l-1.4-1.4c.58-.24 1.12-.54 1.63-.89 1.72.51 3 2.07 3 3.92h2c0-2.44-1.81-4.64-4.01-4.98h-.18c.64-.73 1.13-1.58 1.43-2.5C20.46 14.64 22 12.75 22 10.5zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
    </svg>
);

type UserEvent = Event & {
    views: number;
    comments: number;
    bees: number;
}

const sortOptions = [
    { value: 'recent', label: 'Recent posts' },
    { value: 'today', label: 'Posted Today' },
    { value: 'state', label: 'Location: State' },
    { value: 'district', label: 'Location: District' },
    { value: 'next3-5', label: 'For the next 3-5 days' },
    { value: 'next6-10', label: 'For the next 6-10 days' },
];


function EventListItem({ event }: { event: UserEvent }) {
    return (
        <Card key={event.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-md md:flex-row">
            <div className="relative h-48 w-full flex-shrink-0 md:h-auto md:w-48">
            <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                data-ai-hint={event.imageHint}
            />
            </div>
            <div className="flex flex-1 flex-col p-4">
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="mb-2">{event.category}</Badge>
                    {event.status === 'draft' && (
                        <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    )}
                </div>
                <h3 className="text-xl font-bold font-headline">
                {event.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                {format(new Date(event.date), 'EEE, MMM d, yyyy')} &bull; {event.location}
                </p>
            </div>
            <Separator className="my-3" />
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="flex flex-col items-center justify-center gap-1 rounded-md bg-muted/50 p-2">
                <BarChart2 className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{event.views.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">Views</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 rounded-md bg-muted/50 p-2">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{event.comments}</span>
                <span className="text-xs text-muted-foreground">Comments</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 rounded-md bg-muted/50 p-2">
                <Award className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{event.bees}</span>
                <span className="text-xs text-muted-foreground">Bees Earned</span>
                </div>
            </div>
            </div>
        </Card>
    );
}

export default function ProfilePage() {
    const { events } = useEvents();
    const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
    const [totalBees, setTotalBees] = useState(0);
    const [sortOption, setSortOption] = useState('recent');

    useEffect(() => {
        const eventsWithStats = events.map((event) => ({
            ...event,
            views: Math.floor(Math.random() * 5000) + 200,
            comments: Math.floor(Math.random() * 100) + 10,
            bees: Math.floor(Math.random() * 50) + 5,
        }));
        setUserEvents(eventsWithStats);
        setTotalBees(eventsWithStats.reduce((acc, event) => acc + event.bees, 0) + 500);
    }, [events]);

    const sortedUserEvents = useMemo(() => {
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
        
        let eventsToFilter = [...userEvents];

        if (sortOption === 'today') {
            eventsToFilter = eventsToFilter.filter(event => {
                const eventCreationDate = new Date(event.createdAt);
                const eventDay = new Date(eventCreationDate.getFullYear(), eventCreationDate.getMonth(), eventCreationDate.getDate());
                return eventDay.getTime() === today.getTime();
            });
        }

        return eventsToFilter.sort((a, b) => {
            switch (sortOption) {
                case 'state':
                    return (a.location.split(',')[1] || '').localeCompare(b.location.split(',')[1] || '');
                case 'district':
                     return (a.location.split(',')[0] || '').localeCompare(b.location.split(',')[0] || '');
                case 'recent':
                case 'today':
                default: {
                    const timeA = new Date(a.createdAt).getTime();
                    const timeB = new Date(b.createdAt).getTime();
                    return timeB - timeA;
                }
            }
        }).filter(event => {
            if (sortOption === 'today') return true; // Already filtered above

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
    }, [userEvents, sortOption]);


    const publishedEvents = sortedUserEvents.filter(e => e.status === 'published');
    const draftEvents = sortedUserEvents.filter(e => e.status === 'draft');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <Card className="w-full overflow-hidden">
            <CardHeader className="bg-muted/30 p-6">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                  <AvatarImage
                    src="https://picsum.photos/seed/9/100/100"
                    alt="@guest"
                    data-ai-hint="person portrait"
                  />
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="font-headline text-3xl">
                    Guest User
                  </CardTitle>
                  <CardDescription className="mt-1">
                    guest@example.com
                  </CardDescription>
                  <div className="mt-4 flex items-center justify-center gap-2 sm:justify-start">
                    <BeeIcon className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold text-foreground">
                      {totalBees.toLocaleString()} Bees
                    </span>
                    <Badge variant="secondary">Redeem for Vouchers</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
                 <div className="mb-8">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                       <div className="flex items-center gap-3">
                         <FileCheck className="h-6 w-6 text-primary" />
                         <h2 className="text-2xl font-bold font-headline">
                             Published Events
                         </h2>
                         <Badge variant="outline">{publishedEvents.length} Events</Badge>
                       </div>
                       <div className="w-full sm:w-auto sm:min-w-[200px]">
                         <Combobox
                            items={sortOptions}
                            value={sortOption}
                            onValueChange={setSortOption}
                            placeholder="Sort by..."
                            searchPlaceholder="Search options..."
                            noResultsText="No options found."
                         />
                       </div>
                    </div>

                    {publishedEvents.length > 0 ? (
                        <div className="space-y-6">
                        {publishedEvents.map((event) => (
                           <EventListItem key={event.id} event={event} />
                        ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center rounded-lg border-2 border-dashed">
                        <p className="text-lg font-semibold">No published events</p>
                        <p className="text-muted-foreground">
                            Create and publish an event to see it here.
                        </p>
                        </div>
                    )}
                </div>
                
                <Separator className="my-12"/>

                <div>
                    <div className="mb-6 flex items-center gap-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold font-headline">
                            Drafts
                        </h2>
                        <Badge variant="outline">{draftEvents.length} Events</Badge>
                    </div>
                    {draftEvents.length > 0 ? (
                        <div className="space-y-6">
                        {draftEvents.map((event) => (
                            <EventListItem key={event.id} event={event} />
                        ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center rounded-lg border-2 border-dashed">
                        <p className="text-lg font-semibold">No drafts saved</p>
                        <p className="text-muted-foreground">
                            Save an event as a draft to see it here.
                        </p>
                        </div>
                    )}
                </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
