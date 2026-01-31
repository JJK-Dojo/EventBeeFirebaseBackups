'use client';

import Header from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText, ArrowRight, Map, Share2, Workflow, Layout, Download, Target, Cpu, Database, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FlowStep = ({ title, description }: { title: string; description: string; }) => (
    <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ArrowRight className="h-5 w-5" />
        </div>
        <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);

const WireframeBox = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => (
    <div className={className}>
        <p className="mb-2 text-center text-sm font-semibold text-muted-foreground">{title}</p>
        <div className="rounded-lg border-2 border-dashed border-border bg-muted/50 p-4">
            {children}
        </div>
    </div>
);

export default function DocsPage() {
  const handleDownloadClick = (format: string, sectionTitle: string) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
        newWindow.document.write(`
            <html>
                <head>
                    <title>Download Document</title>
                    <style>
                        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f0f0; color: #333; }
                        .container { text-align: center; padding: 2rem; background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                        h1 { font-size: 1.5rem; }
                        p { color: #666; }
                        .badge { display: inline-block; padding: 0.25rem 0.75rem; background-color: #e0e0e0; border-radius: 1rem; font-size: 0.8rem; font-weight: bold; margin-top: 1rem; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>PDF Generation Not Available</h1>
                        <p>Direct PDF generation is currently under development.</p>
                        <p>To save this document, please use your browser's built-in <strong>Print to PDF</strong> functionality.</p>
                        <div class="badge">Tip: Ctrl+P or Cmd+P</div>
                    </div>
                </body>
            </html>
        `);
        newWindow.document.close();
    } else {
        alert('Please allow pop-ups for this site to see this message.');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              EventBee Ecosystem Document
            </h1>
            <p className="text-lg text-muted-foreground">
              A comprehensive overview of the EventBee platform, its architecture, and its core concepts.
            </p>
          </div>

          <Accordion type="multiple" defaultValue={['vision', 'tech-stack']} className="w-full">
            
            <AccordionItem value="vision">
              <AccordionTrigger className="text-xl font-bold font-headline">
                <div className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary/80"/> Vision & Core Concepts
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-base">Project Vision</h3>
                  <p className="text-muted-foreground">
                    EventBee is a hyperlocal event discovery platform designed for students and young professionals. It aims to be the go-to hub for finding and sharing local happenings, from campus workshops to city music festivals. The platform emphasizes ease of use for both event seekers and organizers.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2 text-base">Core Data Entities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-muted/30">
                        <CardHeader>
                          <CardTitle className="text-lg">User</CardTitle>
                          <CardDescription>Represents an individual on the platform.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            <li>Stores profile info (name, email, photo).</li>
                            <li>Manages authentication credentials.</li>
                            <li>Assigned a role for permission control (basic, admin).</li>
                          </ul>
                        </CardContent>
                      </Card>
                       <Card className="bg-muted/30">
                        <CardHeader>
                          <CardTitle className="text-lg">Event</CardTitle>
                           <CardDescription>Represents an event listing.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            <li>Contains all event details (title, date, location).</li>
                            <li>Linked to a creator (User) via `userId`.</li>
                            <li>Has a `status` for the moderation workflow.</li>
                          </ul>
                        </CardContent>
                      </Card>
                  </div>
                </div>
                 <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PDF', 'Vision & Core Concepts')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PDF
                    </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tech-stack">
              <AccordionTrigger className="text-xl font-bold font-headline">
                <div className="flex items-center gap-2">
                    <Cpu className="h-6 w-6 text-primary/80"/> Technical Stack
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  <li><b>Frontend Framework:</b> <span className="font-semibold text-foreground">Next.js (React)</span> with the App Router for server-centric rendering and performance.</li>
                  <li><b>Styling:</b> <span className="font-semibold text-foreground">Tailwind CSS</span> for utility-first styling, with <span className="font-semibold text-foreground">ShadCN UI</span> for pre-built, accessible components.</li>
                  <li><b>Backend & Database:</b> <span className="font-semibold text-foreground">Firebase</span> is used for all backend services.
                    <ul className="list-['-_'] space-y-1 pl-5 mt-1">
                      <li><b>Authentication:</b> Manages user sign-up and login (Email/Password, Google).</li>
                      <li><b>Firestore:</b> A NoSQL database for storing all user and event data.</li>
                    </ul>
                  </li>
                  <li><b>Generative AI:</b> <span className="font-semibold text-foreground">Genkit</span> (with Google's Gemini models) powers AI features like extracting event details from uploaded images.</li>
                   <li><b>Deployment:</b> Hosted on <span className="font-semibold text-foreground">Firebase App Hosting</span> for seamless integration and scalability.</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PDF', 'Technical Stack')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PDF
                    </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="phase2">
              <AccordionTrigger className="text-xl font-bold font-headline">
                <div className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary/80"/> Phase 2: The Extended Ecosystem
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-4">
                <p className="text-muted-foreground">
                  Phase 2 is about evolving EventBee from a simple discovery tool into a comprehensive, interactive community platform. The focus is on deepening user engagement, providing value to event organizers, and creating monetization pathways.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Ticketing, Sponsors & Monetization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li><b>Integrated Ticketing:</b> Allow organizers to sell tickets directly on EventBee, taking a small commission.</li>
                          <li><b>Featured Events:</b> Offer paid "featured" slots on the homepage and at the top of search results.</li>
                          <li><b>Sponsor Showcase:</b> Allow organizers to feature event sponsors (local shops, cafes) on the event page.</li>
                          <li><b>Promoted Placements:</b> Offer sponsored listings for local businesses on relevant pages.</li>
                        </ul>
                      </CardContent>
                    </Card>
                     <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Community & Social Features</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li><b>Event Reviews & Ratings:</b> Let users rate and review events they've attended.</li>
                          <li><b>Commenting System:</b> Allow discussion on event pages.</li>
                          <li><b>"I'm Going" Feature:</b> Let users see which of their friends are attending an event.</li>
                          <li><b>User Groups:</b> Enable users to create groups based on interests (e.g., "Pune Board Gamers").</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Advanced Organizer Tools</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li><b>Organizer Dashboard:</b> Provide detailed analytics on event page views, audience demographics, and ticket sales.</li>
                          <li><b>QR Code Check-in:</b> Generate QR codes for tickets to allow for easy attendee management at the venue.</li>
                          <li><b>Direct Messaging:</b> Enable secure communication between organizers and attendees.</li>
                        </ul>
                      </CardContent>
                    </Card>
                     <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Gamification & Engagement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li><b>Expand Points System:</b> Award points for creating events, writing reviews, and attending events (via check-in).</li>
                          <li><b>Leaderboards:</b> Feature top organizers and most active "EventBees" in each city.</li>
                          <li><b>Badges & Achievements:</b> Unlock digital badges for milestones (e.g., "First Event," "Social Butterfly," "Super Host").</li>
                        </ul>
                      </CardContent>
                    </Card>
                </div>
                 <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PDF', 'Phase 2 Ecosystem')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PDF
                    </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="user-flow">
              <AccordionTrigger className="text-xl font-bold font-headline">
                 <div className="flex items-center gap-2">
                    <Workflow className="h-6 w-6 text-primary/80"/> User Flows & Roles
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <div className="space-y-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-3">User Roles & Permissions</h3>
                        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                            <li><b>Guest (Unauthenticated)</b>: Can view the landing page and event detail pages. Must log in or sign up to interact further.</li>
                            <li><b>User (Authenticated)</b>: Can create, edit, and manage their own events. Can access their dashboard and profile.</li>
                            <li><b>Admin (Authenticated)</b>: Has all user permissions, plus access to the admin review panel, user management, and other developer pages.</li>
                        </ul>
                    </div>
                    <Separator/>
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Core Flow: Event Creation & Moderation</h3>
                        <div className="space-y-4">
                            <FlowStep title="Sign Up / Log In" description="User creates an account or logs in." />
                            <FlowStep title="Navigate to Create Event" description="User clicks the 'Create Event' button in the header." />
                            <FlowStep title="Fill Form" description="User provides event details like title, date, location, and uploads an image." />
                            <FlowStep title="Save Event" description="User saves the event. If visibility is 'Public', status becomes 'pending'; if 'Private', status is 'draft'." />
                            <FlowStep title="Admin Review" description="If 'pending', an admin views the event in the '/admin' panel." />
                            <FlowStep title="Approval / Denial" description="Admin approves (status -> 'published') or denies (status -> 'denied') the event." />
                            <FlowStep title="Event is Live" description="If approved, the event appears on the 'Find Events' page and landing page." />
                             <FlowStep title="User Revision" description="If denied, the user can edit and resubmit their event from their profile page." />
                        </div>
                    </div>
                     <Separator/>
                     <div>
                        <h3 className="font-semibold text-lg mb-3">Guest Flow: Event Discovery</h3>
                        <div className="space-y-4">
                            <FlowStep title="Visit Landing Page" description="Guest arrives at the homepage and sees featured events." />
                            <FlowStep title="Find Events" description="Guest navigates to the '/find-events' page to search or filter." />
                            <FlowStep title="View Event" description="Guest clicks on an event to see its details." />
                            <FlowStep title="Action Prompt" description="To create an event or access a dashboard, the guest is prompted to log in or sign up." />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PDF', 'User Flow Charts')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PDF
                    </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

             <AccordionItem value="db-security">
              <AccordionTrigger className="text-xl font-bold font-headline">
                <div className="flex items-center gap-2">
                    <Database className="h-6 w-6 text-primary/80"/> Database & Security
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-base">Firestore Data Structure</h3>
                    <p className="text-muted-foreground mb-2">The database is structured to be simple, scalable, and secure.</p>
                     <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                        <li><b>/users/{'userId'}</b>: Stores public and private profile information for each user. Rules are configured so a user can only read and write their own document.</li>
                        <li><b>/events/{'eventId'}</b>: Stores all event documents. These are publicly readable so anyone can discover events. Write access (create, update, delete) is restricted to the user who created the event (`isOwner` check).</li>
                    </ul>
                  </div>
                  <Separator />
                   <div>
                    <h3 className="font-semibold mb-2 text-base">Security Rules Philosophy</h3>
                    <p className="text-muted-foreground mb-2">The rules are designed with a "secure by default" principle.</p>
                     <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                        <li><b className="text-foreground">Public Read, Private Write:</b> Event data is public for discovery, but all user data and all write operations are authenticated and authorized.</li>
                        <li><b className="text-foreground">Ownership Model:</b> A user can only modify content they own. This is enforced by comparing `request.auth.uid` with the `userId` field stored inside each event document.</li>
                        <li><b className="text-foreground">No `get()` in Rules:</b> The `userId` is denormalized and stored on each event to avoid slow and costly `get()` calls within security rules, making them faster and more secure.</li>
                    </ul>
                  </div>
                <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PDF', 'Database & Security')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PDF
                    </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="sitemap">
              <AccordionTrigger className="text-xl font-bold font-headline">
                <div className="flex items-center gap-2">
                    <Map className="h-6 w-6 text-primary/80"/> Sitemap
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <p className="mb-4 text-muted-foreground">
                    The sitemap outlines the primary pages and developer utilities of the application.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                    <li><b>/</b> - Public landing page showing upcoming and recent events.</li>
                    <li><b>/find-events</b> - Main discovery page with search and filtering.</li>
                    <li><b>/events/[id]</b> - Detail page for a single event.</li>
                    <li><b>/create-event</b> - Form for creating or editing an event.</li>
                    <li><b>/login</b> - User sign-in page.</li>
                    <li><b>/signup</b> - User registration page.</li>
                    <li><b>/dashboard</b> - Personalized homepage for authenticated users.</li>
                    <li><b>/profile</b> - User's personal page showing their events and stats.</li>
                    <li><b>/admin</b> - Admin panel for reviewing pending events.</li>
                    <li><b>/users</b> - Page for managing user roles.</li>
                    <li><b>/analytics</b> - Dashboard for viewing event statistics.</li>
                    <li><b>/docs</b> - This documentation page.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="wireframes">
              <AccordionTrigger className="text-xl font-bold font-headline">
                <div className="flex items-center gap-2">
                    <Layout className="h-6 w-6 text-primary/80"/> Wireframes
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-8">
                 <p className="text-muted-foreground">
                    Simplified wireframes representing the layout and key components of major pages. These are not a complete design but illustrate the core structure.
                </p>

                <Card>
                    <CardHeader>
                        <CardTitle>/find-events</CardTitle>
                        <CardDescription>Main event discovery page</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <WireframeBox title="Header Component">
                             <p className="text-center text-sm">Logo | Find Event Button | Create Event Button | User Menu</p>
                        </WireframeBox>
                        <WireframeBox title="Filter Component">
                             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <p className="text-center text-sm">[Search/Tag Input]</p>
                                <p className="text-center text-sm">[Category Dropdown]</p>
                                <p className="text-center text-sm">[State Dropdown]</p>
                                <p className="text-center text-sm">[District Dropdown]</p>
                             </div>
                        </WireframeBox>
                        <WireframeBox title="Event Grid">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="h-32 rounded-lg border bg-background flex items-center justify-center text-sm">Event Card</div>
                                <div className="h-32 rounded-lg border bg-background flex items-center justify-center text-sm">Event Card</div>
                                <div className="h-32 rounded-lg border bg-background flex items-center justify-center text-sm">Event Card</div>
                                <div className="h-32 rounded-lg border bg-background flex items-center justify-center text-sm">Event Card</div>
                            </div>
                        </WireframeBox>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>/create-event</CardTitle>
                        <CardDescription>Form for event submission</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <WireframeBox title="Event Title Input" className="h-full">
                                    <p className="text-center text-sm">[Input Field]</p>
                                </WireframeBox>
                            </div>
                             <div className="space-y-4">
                                <WireframeBox title="Date & Time Picker" >
                                    <p className="text-center text-sm">[Calendar Popover] [Time Inputs]</p>
                                </WireframeBox>
                                 <WireframeBox title="Location Fields">
                                     <p className="text-center text-sm">[State -> District -> Pincode Inputs]</p>
                                </WireframeBox>
                            </div>
                        </div>
                        <WireframeBox title="Image Upload & AI Extraction">
                            <p className="text-center text-sm">[Image Dropzone] [AI Extraction Button]</p>
                        </WireframeBox>
                         <WireframeBox title="Submit Button">
                             <p className="text-center text-sm">[Save Event Button]</p>
                        </WireframeBox>
                    </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  );
}
