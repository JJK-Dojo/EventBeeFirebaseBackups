'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, MapPin } from 'lucide-react';
import type { Event } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function FeaturedEventCard({ event, className }: { event: Event, className?: string }) {
  return (
    <Link href={`/events/${event.id}`} className={cn("group block h-full", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          data-ai-hint={event.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <Badge variant="secondary" className="mb-2 bg-white/20 text-white backdrop-blur-sm border-0">{event.category}</Badge>
          <h3 className="mb-2 font-headline text-3xl font-bold">
            {event.title}
          </h3>
          <div className="space-y-2 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{event.date ? format(new Date(event.date), 'EEE, MMM d, yyyy') : 'Date TBC'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
