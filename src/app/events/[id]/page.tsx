
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import {
  CalendarDays,
  MapPin,
  Navigation,
  Clock,
  LoaderCircle,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Header from '@/components/header';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Event } from '@/lib/types';
import { useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const firestore = useFirestore();
  const { toast } = useToast();
  const { user } = useUser();

  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareMethod, setShareMethod] = useState<'email' | 'whatsapp' | null>(
    null
  );
  const [recipient, setRecipient] = useState('');

  const eventDocRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'events', id);
  }, [firestore, id]);

  const { data: event, isLoading } = useDoc<Event>(eventDocRef);

  const handleShareClick = (method: 'email' | 'whatsapp') => {
    if (!event) return;
    setShareMethod(method);
    if (method === 'email' && user?.email) {
      setRecipient(user.email);
    } else {
      setRecipient(''); // Clear previous recipient
    }
    setIsShareDialogOpen(true);
  };

  const handleConfirmShare = () => {
    if (!event || !shareMethod || !recipient) return;

    if (shareMethod === 'email') {
      const subject = `Check out this event: ${event.title}`;
      const body = `
Hi,

I thought you might be interested in this event:

Event: ${event.title}
Date: ${event.date ? format(event.date, 'PPPP p') : 'TBA'}
Location: ${event.location}
Description: ${event.description}

You can view it here: ${window.location.href}
    `.trim();
      const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      toast({
        title: 'Opening Email Client',
        description: 'Your default email client should open shortly.',
      });
    } else if (shareMethod === 'whatsapp') {
      const text = `
Check out this event: *${event.title}*

*Date*: ${event.date ? format(event.date, 'PPPP p') : 'TBA'}
*Location*: ${event.location}

View more details here: ${window.location.href}
    `.trim();

      // Basic phone number cleaning
      const phone = recipient.replace(/[^0-9]/g, '');
      if (!phone) {
        toast({
          variant: 'destructive',
          title: 'Invalid Phone Number',
          description: 'Please enter a valid phone number.',
        });
        return;
      }
      const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
        text
      )}`;
      window.open(whatsappLink, '_blank');
      toast({
        title: 'Opening WhatsApp',
        description: 'A new tab will open to share the event details.',
      });
    }

    setIsShareDialogOpen(false);
    setRecipient('');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 text-center">
            <p>Event not found.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h1 className="mb-4 font-headline text-3xl font-bold tracking-tight md:text-4xl">
                {event.title}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative h-80 w-full cursor-pointer overflow-hidden rounded-lg shadow-lg md:h-[450px]">
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
                </div>
                <div>
                  <p className="text-lg text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
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
                          {event.date &&
                            format(event.date, 'EEEE, MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold">Time</p>
                        <p className="text-muted-foreground">
                          {event.date && format(event.date, 'h:mm a')}
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
                  </div>
                  <div className="mt-6 aspect-video w-full">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      Map Placeholder
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button size="lg" className="w-full">
                    <Navigation className="mr-2 h-5 w-5" />
                    Get Directions
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="lg"
                  className="w-full"
                  variant="outline"
                  onClick={() => handleShareClick('email')}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email
                </Button>
                <Button
                  size="lg"
                  className="w-full"
                  variant="outline"
                  onClick={() => handleShareClick('whatsapp')}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Share via {shareMethod === 'email' ? 'Email' : 'WhatsApp'}
            </DialogTitle>
            <DialogDescription>
              Enter the{' '}
              {shareMethod === 'email' ? 'email address' : 'phone number'} you
              want to send this event to.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">
                {shareMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={
                  shareMethod === 'email'
                    ? 'recipient@example.com'
                    : '+919876543210'
                }
                type={shareMethod === 'email' ? 'email' : 'tel'}
              />
              {shareMethod === 'email' && user?.email && (
                <p className="text-xs text-muted-foreground mt-2">
                  Your email: {user.email}. Change above to send to someone
                  else.
                </p>
              )}
               {shareMethod === 'whatsapp' && (
                <p className="text-xs text-muted-foreground mt-2">
                 Include the country code (e.g., +91 for India).
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsShareDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmShare}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
