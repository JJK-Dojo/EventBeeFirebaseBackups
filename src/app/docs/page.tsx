
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
import { FileText, ArrowRight, Map, Share2, Workflow, Layout, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const handleDownloadClick = (format: string) => {
    toast({
      title: `Export to ${format}`,
      description: 'This feature is not yet available.',
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              Application Design Documents
            </h1>
            <p className="text-lg text-muted-foreground">
              A centralized reference for the architecture, flows, and design of the Eventide platform.
            </p>
          </div>

          <Accordion type="multiple" defaultValue={['sitemap', 'info-arch']} className="w-full">
            
            <AccordionItem value="sitemap">
              <AccordionTrigger className="text-xl font-bold font-headline">
                <div className="flex items-center gap-2">
                    <Map className="h-6 w-6 text-primary/80"/> Sitemap
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <p className="mb-4 text-muted-foreground">
                    The sitemap outlines the primary pages of the application.
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
                    <li><b>/admin</b> - Admin panel for reviewing pending events. (Admin only)</li>
                    <li><b>/users</b> - Page for managing user roles. (Admin only)</li>
                    <li><b>/analytics</b> - Dashboard for viewing event statistics.</li>
                    <li><b>/docs</b> - This documentation page.</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PDF')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('DOC')}>
                        <Download className="mr-2 h-4 w-4" /> Download as DOC
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PPT')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PPT
                    </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="info-arch">
              <AccordionTrigger className="text-xl font-bold font-headline">
                <div className="flex items-center gap-2">
                    <Share2 className="h-6 w-6 text-primary/80"/> Information Architecture
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <p className="mb-4 text-muted-foreground">
                    The information architecture is designed around three core user roles and two main data entities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-2">User Roles</h3>
                        <ul className="list-disc space-y-1 pl-5">
                            <li><b>Guest (Unauthenticated)</b>: Can view the landing page and event detail pages. Must log in or sign up to interact further.</li>
                            <li><b>User (Authenticated)</b>: Can create, edit, and manage their own events. Can access their dashboard and profile.</li>
                            <li><b>Admin (Authenticated)</b>: Has all user permissions, plus access to the admin review panel and user management page.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Core Data Entities</h3>
                         <ul className="list-disc space-y-1 pl-5">
                            <li><b>Users</b>: Stores user profile information, including their role (basic, advanced, admin).</li>
                            <li><b>Events</b>: Stores all data for events, including a `userId` to link to the creator and a `status` for the moderation workflow.</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PDF')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('DOC')}>
                        <Download className="mr-2 h-4 w-4" /> Download as DOC
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PPT')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PPT
                    </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="user-flow">
              <AccordionTrigger className="text-xl font-bold font-headline">
                 <div className="flex items-center gap-2">
                    <Workflow className="h-6 w-6 text-primary/80"/> User Flow Charts
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <div className="space-y-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Core User Flow: Event Creation</h3>
                        <div className="space-y-4">
                            <FlowStep title="Sign Up / Log In" description="User creates an account or logs in." />
                            <FlowStep title="Navigate to Create Event" description="User clicks the 'Create Event' button in the header." />
                            <FlowStep title="Fill Form" description="User provides event details like title, date, location, and uploads an image." />
                            <FlowStep title="Save Event" description="User saves the event, either as a 'draft' (private) or submits for 'review' (public)." />
                            <FlowStep title="Admin Review" description="If submitted, an admin views the event in the '/admin' panel." />
                            <FlowStep title="Approval / Denial" description="Admin approves (status -> 'published') or denies (status -> 'denied') the event." />
                            <FlowStep title="Event is Live" description="If approved, the event appears on the 'Find Events' page and landing page." />
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
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PDF')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('DOC')}>
                        <Download className="mr-2 h-4 w-4" /> Download as DOC
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PPT')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PPT
                    </Button>
                </div>
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
                    Simplified wireframes representing the layout and key components of major pages.
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
                <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PDF')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('DOC')}>
                        <Download className="mr-2 h-4 w-4" /> Download as DOC
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadClick('PPT')}>
                        <Download className="mr-2 h-4 w-4" /> Download as PPT
                    </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </main>
    </div>
  );
}
