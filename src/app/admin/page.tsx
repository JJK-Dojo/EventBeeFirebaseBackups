
'use client';

import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import {
  FileCheck,
  CheckCircle,
  XCircle,
  LoaderCircle,
} from 'lucide-react';
import Header from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import type { Event } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { doc, updateDoc, collection, query, where } from 'firebase/firestore';


const statusBadges: Record<Event['status'], React.ReactNode> = {
    published: <Badge variant="secondary" className="bg-green-100 text-green-800">Published</Badge>,
    draft: <Badge variant="outline">Draft</Badge>,
    pending: <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending Review</Badge>,
    denied: <Badge variant="destructive">Denied</Badge>,
};

function DenyEventDialog({ event, onDeny }: { event: Event; onDeny: (eventId: string, feedback: string) => void }) {
  const [feedback, setFeedback] = useState('');
  
  const handleDeny = () => {
    onDeny(event.id, feedback);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <XCircle className="mr-2 h-4 w-4" />
          Deny
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deny Event: {event.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="feedback">Feedback for Denial</Label>
            <Textarea
              id="feedback"
              placeholder="Provide a reason for denying this event..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDeny} disabled={!feedback}>
              Confirm Denial
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


function EventReviewCard({ event, onApprove, onDeny }: { event: Event; onApprove: (eventId: string) => void; onDeny: (eventId: string, feedback: string) => void; }) {
    return (
        <Card className="flex flex-col overflow-hidden md:flex-row">
            <div className="relative h-48 w-full flex-shrink-0 md:h-auto md:w-48">
            <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                data-ai-hint={event.imageHint}
            />
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        {statusBadges[event.status]}
                         <p className="text-xs text-muted-foreground">
                            Submitted by {event.organizer.name}
                        </p>
                    </div>
                    <h3 className="text-xl font-bold font-headline mt-2">
                        {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {event.date && `${format(event.date, 'EEE, MMM d, yyyy')} • ${event.location}`}
                    </p>
                    <p className="text-sm mt-2 line-clamp-3">
                        {event.description}
                    </p>
                </div>
                <Separator className="my-3" />
                <div className="flex flex-wrap items-center justify-end gap-3">
                    {event.status === 'pending' && (
                        <>
                            <Button size="sm" onClick={() => onApprove(event.id)}>
                               <CheckCircle className="mr-2 h-4 w-4" />
                               Approve
                            </Button>
                            <DenyEventDialog event={event} onDeny={onDeny} />
                        </>
                    )}
                     {event.status === 'published' && <p className="text-sm text-green-600 font-medium">Approved</p>}
                     {event.status === 'denied' && <p className="text-sm text-red-600 font-medium">Denied</p>}
                </div>
            </div>
        </Card>
    );
}

export default function AdminPage() {
    const { toast } = useToast();
    const firestore = useFirestore();

    const pendingEventsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'events'), where('status', '==', 'pending'));
    }, [firestore]);

    const { data: events, isLoading } = useCollection<Event>(pendingEventsQuery);

    const sortedEvents = useMemo(() => {
        if (!events) return [];
        return [...events].sort((a, b) => {
            if (a.createdAt && b.createdAt) {
                return a.createdAt.getTime() - b.createdAt.getTime();
            }
            return 0;
        });
    }, [events]);

    const handleApprove = (eventId: string) => {
        const eventToUpdate = events?.find(e => e.id === eventId);
        if (eventToUpdate && firestore) {
            const eventDocRef = doc(firestore, 'events', eventId);
            const updateData = { status: 'published' };
            
            updateDoc(eventDocRef, updateData)
                .then(() => {
                    toast({ title: "Event Approved", description: `"${eventToUpdate.title}" has been published.` });
                })
                .catch((serverError) => {
                    const permissionError = new FirestorePermissionError({
                        path: eventDocRef.path,
                        operation: 'update',
                        requestResourceData: updateData,
                    });
                    errorEmitter.emit('permission-error', permissionError);
                });
        }
    };

    const handleDeny = (eventId: string, feedback: string) => {
        const eventToUpdate = events?.find(e => e.id === eventId);
        if (eventToUpdate && firestore) {
            const eventDocRef = doc(firestore, 'events', eventId);
            const updateData = { status: 'denied', feedback };

            updateDoc(eventDocRef, updateData)
                 .then(() => {
                    toast({ variant: "destructive", title: "Event Denied", description: `"${eventToUpdate.title}" has been denied.` });
                })
                .catch((serverError) => {
                    const permissionError = new FirestorePermissionError({
                        path: eventDocRef.path,
                        operation: 'update',
                        requestResourceData: updateData,
                    });
                    errorEmitter.emit('permission-error', permissionError);
                });
        }
    };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl">
                        <FileCheck className="h-8 w-8 text-primary"/>
                        Admin Review Panel
                    </CardTitle>
                     <CardDescription>
                        Review and approve user-submitted events that are pending review.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     {isLoading ? (
                         <div className="py-24 text-center rounded-lg border-2 border-dashed flex flex-col items-center justify-center">
                            <LoaderCircle className="h-8 w-8 animate-spin text-primary mb-4" />
                            <p className="text-lg font-semibold">Loading Events for Review</p>
                            <p className="text-muted-foreground">
                                Please wait a moment...
                            </p>
                        </div>
                     ) : sortedEvents.length > 0 ? (
                        <div className="space-y-6">
                        {sortedEvents.map((event) => (
                          <EventReviewCard key={event.id} event={event} onApprove={handleApprove} onDeny={handleDeny} />
                        ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center rounded-lg border-2 border-dashed">
                        <p className="text-lg font-semibold">No Events to Review</p>
                        <p className="text-muted-foreground">
                           When users submit events for review, they will appear here.
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
