
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import type { Event } from '@/lib/types';

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={event.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
           <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary">{event.category}</Badge>
           </div>
          <h3 className="mb-2 truncate font-headline text-xl font-bold group-hover:text-primary">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{format(new Date(event.date), 'EEE, MMM d')}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{event.location}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2 text-sm">
            <Image
              src={event.organizer.avatarUrl}
              alt={event.organizer.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="font-medium text-muted-foreground truncate">{event.organizer.name}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
