
import Link from 'next/link';
import { DUMMY_EVENTS } from '@/lib/data';
import EventCard from '@/components/event-card';
import EventFilters from '@/components/event-filters';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function TestUIPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 space-y-2">
            <h1 className="text-4xl font-bold font-headline text-primary">
              UI Showcase Page
            </h1>
            <p className="text-lg text-muted-foreground">
              A place to test and preview the look and feel of UI components.
            </p>
          </div>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold font-headline">
              Event Card
            </h2>
            <p className="mb-4 text-muted-foreground">This is how an event is displayed in a list.</p>
            <div className="max-w-sm">
                <EventCard event={DUMMY_EVENTS[0]} />
            </div>
          </section>

          <Separator className="my-8" />
          
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold font-headline">
              Event Filters
            </h2>
             <p className="mb-4 text-muted-foreground">This is the main component for searching and filtering events.</p>
            <EventFilters onFilter={() => {}} />
          </section>

          <Separator className="my-8" />

          <section>
            <h2 className="mb-4 text-2xl font-bold font-headline">
              Basic UI Elements
            </h2>
             <p className="mb-4 text-muted-foreground">These are some of the base components from the design system.</p>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Buttons</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Inputs & Labels</CardTitle>
                    </CardHeader>
                    <CardContent className="max-w-sm space-y-4">
                         <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="test-input">Text Input</Label>
                            <Input id="test-input" placeholder="Type something..." />
                        </div>
                         <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="test-date">Date Input</Label>
                            <Input id="test-date" type="date" />
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Badges</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Badge>Default Badge</Badge>
                        <Badge variant="secondary">Secondary Badge</Badge>
                        <Badge variant="destructive">Destructive Badge</Badge>
                        <Badge variant="outline">Outline Badge</Badge>
                    </CardContent>
                </Card>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
