
'use client';

import Header from '@/components/header';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Event } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { collection } from 'firebase/firestore';

const statusBadges: Record<Event['status'], React.ReactNode> = {
    published: <Badge variant="secondary" className="bg-green-100 text-green-800">Published</Badge>,
    draft: <Badge variant="outline">Draft</Badge>,
    pending: <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>,
    denied: <Badge variant="destructive">Denied</Badge>,
};


export default function DbViewPage() {
  const firestore = useFirestore();
  const eventsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'events');
  }, [firestore]);
  
  const { data: events, isLoading, error } = useCollection<Event>(eventsQuery);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl">
                <Database className="h-8 w-8 text-primary" />
                Firestore DB View: Events
              </CardTitle>
              <CardDescription>
                A real-time view of the documents in the `/events` collection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : error ? (
                <div className="text-center text-red-500">
                  <p>Error loading events: {error.message}</p>
                </div>
              ) : !events || events.length === 0 ? (
                <div className="py-24 text-center rounded-lg border-2 border-dashed">
                  <p className="text-lg font-semibold">No Events Found</p>
                  <p className="text-muted-foreground">The 'events' collection is empty.</p>
                </div>
              ) : (
                <Table>
                  <TableCaption>A list of all events in the database.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Event ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-mono text-xs">{event.id}</TableCell>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{format(new Date(event.date), 'PPp')}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{statusBadges[event.status]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
