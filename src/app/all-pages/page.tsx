
'use client';

import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { List } from 'lucide-react';
import Link from 'next/link';

const pages = [
  { href: '/admin', title: 'Admin Panel', description: 'Review and approve user-submitted events.' },
  { href: '/analytics', title: 'Analytics Dashboard', description: 'View insights into event trends and engagement.' },
  { href: '/create-event', title: 'Create Event', description: 'A form for users to create and submit new events.' },
  { href: '/dashboard', title: 'User Dashboard', description: 'A landing page for authenticated users.' },
  { href: '/events/1', title: 'Event Detail Page', description: 'Displays the full details for a single event. (Example link)' },
  { href: '/find-events', title: 'Find Events', description: 'Search, filter, and discover all published events.' },
  { href: '/login', title: 'Login Page', description: 'Page for users to sign in to their account.' },
  { href: '/profile', title: 'User Profile', description: 'Shows a user\'s created events, drafts, and stats.' },
  { href: '/share', title: 'Share Page', description: 'Generates a QR code and link to share the application.' },
  { href: '/signup', title: 'Signup Page', description: 'Page for new users to create an account.' },
  { href: '/test-ai', title: 'AI Test Page', description: 'A utility page for testing AI image extraction.' },
  { href: '/test-ui', title: 'UI Showcase', description: 'A utility page for previewing UI components.' },
  { href: '/', title: 'Home (Redirect)', description: 'The root page, which currently redirects to the admin panel.' },
];

export default function AllPages() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl">
                <List className="h-8 w-8 text-primary" />
                Application Pages
              </CardTitle>
              <CardDescription>
                Here is a complete list of all the pages available in your portal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {pages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href}>
                      <div className="block rounded-lg border p-4 transition-all hover:bg-muted hover:shadow-md">
                        <p className="font-bold text-primary group-hover:underline">
                          {page.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {page.description}
                        </p>
                         <p className="text-xs font-mono text-muted-foreground/70 mt-1">
                          {page.href}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
