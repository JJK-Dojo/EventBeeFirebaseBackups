'use client';

import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { List } from 'lucide-react';
import Link from 'next/link';

const pages = [
  { 
    href: '/admin', 
    title: 'Admin Panel', 
    description: 'Review and approve user-submitted events.',
    fields: ['Event Title', 'Status', 'Organizer', 'Date', 'Location', 'Description', 'Approval/Denial Feedback']
  },
  { 
    href: '/analytics', 
    title: 'Analytics Dashboard', 
    description: 'View insights into event trends and engagement.',
    fields: ['Events by Category Chart', 'Events by Status Chart', 'Top Locations Chart', 'Tag Popularity Chart']
  },
  { 
    href: '/contact-us', 
    title: 'Contact Us', 
    description: 'A page for users to send messages to the support team.',
    fields: ['Name', 'Email', 'Subject', 'Message', 'Submit Button']
  },
  { 
    href: '/create-event', 
    title: 'Create Event', 
    description: 'A form for users to create and submit new events.',
    fields: ['Title', 'Description', 'Date & Time', 'Location (Country, State, District, Pincode)', 'Category', 'Tags', 'Image Upload', 'Optional Links (Social Media)']
  },
  { 
    href: '/dashboard', 
    title: 'User Dashboard', 
    description: 'A landing page for authenticated users.',
    fields: ['User Avatar & Name', 'List of Recent Posts', 'Event Status', 'Post Date']
  },
  {
    href: '/db-view',
    title: 'DB View',
    description: 'A simple page to view the contents of the Firestore database.',
    fields: ['Event ID', 'Title', 'Date', 'Location', 'Status']
  },
  { 
    href: '/events/1', 
    title: 'Event Detail Page', 
    description: 'Displays the full details for a single event. (Example link)',
    fields: ['Event Image', 'Title', 'Description', 'Date', 'Time', 'Location', 'Organizer Name', 'Map']
  },
  { 
    href: '/find-events', 
    title: 'Find Events', 
    description: 'Search, filter, and discover all published events.',
    fields: ['Search by Tags/Keywords', 'Category Filter', 'Sort Options', 'Location Filters (State, District)', 'Event Cards Grid']
  },
  { 
    href: '/', 
    title: 'Home (Website Preview)', 
    description: 'The root page, which serves as the public-facing website preview.',
    fields: ['Event Filters', 'Event Card Grid']
  },
  { 
    href: '/login', 
    title: 'Login Page', 
    description: 'Page for users to sign in to their account.',
    fields: ['Sign in with Google', 'Phone Number Input', 'Sign in with Phone Button']
  },
  { 
    href: '/profile', 
    title: 'User Profile', 
    description: 'Shows a user\'s created events, drafts, and stats.',
    fields: ['User Avatar & Name', 'Total "Bees"', 'Sortable Lists (Published, Pending, Denied, Drafts)', 'Event Stats (Views, Comments, Bees)', 'Edit Button']
  },
  { 
    href: '/share', 
    title: 'Share Page', 
    description: 'Generates a QR code and link to share the application.',
    fields: ['QR Code', 'Shareable Link']
  },
  { 
    href: '/signup', 
    title: 'Signup Page', 
    description: 'Page for new users to create an account.',
    fields: ['Sign up with Google', 'First/Last Name', 'Email', 'Phone Number', 'Password', 'Optional Social Links']
  },
  { 
    href: '/site-planner-excel', 
    title: 'Site Planner', 
    description: 'An Excel-like sheet to track development activities.',
    fields: ['Task', 'Assignee', 'Status', 'Due Date']
  },
  { 
    href: '/test-ai', 
    title: 'AI Test Page', 
    description: 'A utility page for testing AI image extraction.',
    fields: ['Image Upload', 'Raw AI JSON Response']
  },
  { 
    href: '/test-ui', 
    title: 'UI Showcase', 
    description: 'A utility page for previewing UI components.',
    fields: ['Event Card Preview', 'Event Filters Preview', 'Buttons', 'Inputs', 'Badges']
  },
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
                Here is a complete list of all the pages available in your portal, along with their key fields.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {pages.sort((a, b) => a.title.localeCompare(b.title)).map((page) => (
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
                        {page.fields && (
                            <div className="mt-3">
                                <h4 className="text-xs font-semibold uppercase text-muted-foreground">Key Fields:</h4>
                                <p className="text-xs text-muted-foreground/80">
                                    {page.fields.join(' • ')}
                                </p>
                            </div>
                        )}
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
