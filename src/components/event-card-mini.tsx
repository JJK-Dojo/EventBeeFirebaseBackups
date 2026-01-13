
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, MapPin } from 'lucide-react';
import type { Event } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export default function EventCardMini({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`} className="group block">
        <Card className="flex items-center gap-4 p-3 transition-all hover:bg-muted hover:shadow-sm">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                data-ai-hint={event.imageHint}
                />
            </div>
            <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-foreground group-hover:text-primary">
                    {event.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />
                    <span className="truncate">{format(new Date(event.date), 'MMM d, yyyy')}</span>
                </div>
                 <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{event.location}</span>
                </div>
            </div>
        </Card>
    </Link>
  );
}
