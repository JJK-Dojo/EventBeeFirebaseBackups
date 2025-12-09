import Link from 'next/link';
import { DUMMY_EVENTS } from '@/lib/data';
import EventCard from '@/components/event-card';
import EventFilters from '@/components/event-filters';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Find Your Next Experience
            </h1>
            <p className="text-muted-foreground">
              Discover events happening around you.
            </p>
          </div>
          <EventFilters />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DUMMY_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
