
'use client';

import Image from 'next/image';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  FileCheck,
  LogIn,
  LogOut,
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
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import type { Event } from '@/lib/types';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';


function EventListItem({ event }: { event: Event }) {
    return (
        <Link href={`/events/${event.id}`} className="group block">
            <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md md:flex-row">
                <div className="relative h-24 w-full flex-shrink-0 md:h-auto md:w-32">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    data-ai-hint={event.imageHint}
                />
                </div>
                <div className="flex flex-1 flex-col p-3">
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <Badge variant={event.status === 'published' ? 'secondary' : 'outline'} className="mb-2">{event.status}</Badge>
                            <p className="text-xs text-muted-foreground">
                                Posted {format(new Date(event.createdAt), 'MMM d, h:mm a')}
                            </p>
                        </div>
                        <h3 className="font-bold font-headline group-hover:text-primary">
                            {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {format(new Date(event.date), 'EEE, MMM d, yyyy')} &bull; {event.location}
                        </p>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

export default function DashboardPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const router = useRouter();

    const userEventsQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(collection(firestore, 'events'), where('organizer.id', '==', user.uid));
    }, [user, firestore]);

    const { data: events, isLoading } = useCollection<Event>(userEventsQuery);

    const recentEvents = useMemo(() => {
        if (!events) return [];
        return [...events]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 10);
    }, [events]);

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [isUserLoading, user, router]);


    if (isUserLoading || !user) {
        return (
            <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
                <p>Loading user dashboard...</p>
            </div>
        );
    }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage
                            src={user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`}
                            alt={user.displayName || "User"}
                            data-ai-hint="person portrait"
                        />
                        <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold font-headline">Welcome, {user.displayName || "User"}!</h1>
                        <p className="text-muted-foreground">Here's a quick look at your recent activity.</p>
                    </div>
                </div>
                 <div className="flex gap-2">
                    <Link href="/profile" passHref>
                        <Button variant="outline"><User className="mr-2 h-4 w-4"/> View Profile</Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileCheck className="h-6 w-6 text-primary"/>
                        Your 10 Recent Posts
                    </CardTitle>
                     <CardDescription>
                        A quick summary of the latest events you've created.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     {isLoading ? (
                        <div className="py-12 text-center rounded-lg border-2 border-dashed">
                            <p>Loading your events...</p>
                        </div>
                     ) : recentEvents.length > 0 ? (
                        <div className="space-y-4">
                        {recentEvents.map((event) => (
                          <EventListItem key={event.id} event={event} />
                        ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center rounded-lg border-2 border-dashed">
                        <p className="text-lg font-semibold">No events created yet</p>
                        <p className="text-muted-foreground">
                            Click "Create Event" to get started.
                        </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
