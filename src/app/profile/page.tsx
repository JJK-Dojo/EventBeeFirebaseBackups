
import Image from 'next/image';
import {
  User,
  Calendar,
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DUMMY_EVENTS } from '@/lib/data';
import { format } from 'date-fns';

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


const userEvents = DUMMY_EVENTS.slice(0, 5).map((event, i) => ({
  ...event,
  views: Math.floor(Math.random() * 5000) + 200,
  comments: Math.floor(Math.random() * 100) + 10,
  bees: Math.floor(Math.random() * 50) + 5,
}));

const totalBees = userEvents.reduce((acc, event) => acc + event.bees, 0) + 500;

export default function ProfilePage() {
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
              <div className="mb-6 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold font-headline">
                  My Events
                </h2>
                <Badge variant="outline">Last 100 days</Badge>
              </div>

              {userEvents.length > 0 ? (
                <div className="space-y-6">
                  {userEvents.map((event) => (
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
                          <Badge variant="secondary" className="mb-2">{event.category}</Badge>
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
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-lg font-semibold">No events created yet</p>
                  <p className="text-muted-foreground">
                    Create your first event to see it here.
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
