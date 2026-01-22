
'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/header';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Sheet, Plus, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';


const initialDetails = [
    { id: 1, page: '/admin', pageLogic: 'Displays events with "pending" status for admin approval or denial. Admins can provide feedback for denials.', buttonsAndLinks: 'Approve, Deny', buttonLogic: 'Approve: Updates event status to "published". Deny: Opens a dialog to enter feedback and updates status to "denied".', currentUse: 'Core admin functionality for content moderation.', futureAdditions: 'Bulk actions (approve/deny all), filtering by user, direct link to user profile.', remarks: 'Security rules must ensure only admins can access this page and perform updates.' },
    { id: 2, page: '/analytics', pageLogic: 'Visualizes event data using charts. Shows events by category, status, top locations, and tag popularity.', buttonsAndLinks: 'None', buttonLogic: 'N/A', currentUse: 'Provides insights into event trends. Currently uses dummy data.', futureAdditions: 'Connect to live Firestore data, add date range filters, show user engagement metrics.', remarks: 'Chart components from Recharts are used.' },
    { id: 3, page: '/contact-us', pageLogic: 'A standard contact form that collects user name, email, subject, and message.', buttonsAndLinks: 'Send Message', buttonLogic: 'On submit, displays a toast notification. In a real app, it would trigger an email or save the message.', currentUse: 'Static contact page.', futureAdditions: 'Integrate with an email service or save messages to Firestore.', remarks: '' },
    { id: 4, page: '/create-event', pageLogic: 'A comprehensive form for users to create or edit events. Includes fields for title, description, date/time, location (with pincode lookup), category, tags, and image upload. Features AI extraction from an image.', buttonsAndLinks: 'Save Event, AI Extraction', buttonLogic: 'Save: Creates/updates the event document in Firestore. Status is "pending" if public, "draft" if private. AI Extraction: Uses Genkit to extract details from an uploaded event poster.', currentUse: 'Primary feature for user-generated content.', futureAdditions: 'Support for multiple images, video links, recurring events.', remarks: 'Complex component with heavy client-side logic and API calls.' },
    { id: 5, page: '/dashboard', pageLogic: 'A personalized landing page for logged-in users. Displays user info and a list of their 10 most recent event posts.', buttonsAndLinks: 'View Profile, Edit Event', buttonLogic: 'View Profile: Navigates to the user\'s full profile page. Edit: Navigates to the create-event page with the event data pre-filled.', currentUse: 'User-centric landing page.', futureAdditions: 'Show notifications, quick stats, or a personalized event feed.', remarks: 'Relies on `useUser` and a custom hook `useUserEvents` to fetch data.' },
    { id: 6, page: '/db-view', pageLogic: 'Provides a raw, real-time view of the `/events` collection in Firestore.', buttonsAndLinks: 'None', buttonLogic: 'N/A', currentUse: 'A developer utility for debugging and verifying database content.', futureAdditions: 'Allow viewing other collections, add query/filter capabilities.', remarks: 'Demonstrates a simple `useCollection` implementation.' },
    { id: 7, page: '/events/[id]', pageLogic: 'Displays the full details for a single event, fetched by its ID from Firestore.', buttonsAndLinks: 'Get Directions', buttonLogic: 'Currently a placeholder. Would open a map application with the event location.', currentUse: 'Public-facing event detail view.', futureAdditions: 'Add to calendar, share buttons, comment section, related events.', remarks: 'Uses dynamic routing in Next.js.' },
    { id: 8, page: '/find-events', pageLogic: 'The main discovery page. Allows users to search, filter (by category, state, district, tags), and sort published events.', buttonsAndLinks: 'Find Events', buttonLogic: 'Applies the selected filters and search query to the list of events displayed.', currentUse: 'Core feature for event discovery.', futureAdditions: 'Map view, save searches, more advanced sorting options.', remarks: 'Filtering logic is handled client-side in this implementation.' },
    { id: 9, page: '/login', pageLogic: 'Handles user authentication via email/password or Google Sign-In.', buttonsAndLinks: 'Sign in with Google, Sign in with Email', buttonLogic: 'Uses Firebase Authentication hooks (`useSignInWithEmailAndPassword`, `useSignInWithGoogle`) to log the user in. Redirects to dashboard on success.', currentUse: 'Entry point for authenticated users.', futureAdditions: 'Forgot password functionality, sign-in with other providers (e.g., Phone).', remarks: 'Includes a fallback for already logged-in users.' },
    { id: 10, page: '/profile', pageLogic: 'Shows a detailed view of a user\'s activity, including their total points and all their created events, sorted by status (Published, Pending, Denied, Drafts). Allows sorting of the lists.', buttonsAndLinks: 'Sort Combobox, Edit Event', buttonLogic: 'Sort: Re-sorts the event lists based on the selected criteria. Edit: Navigates to the create-event page for denied/draft events.', currentUse: 'User-specific content management page.', futureAdditions: 'Allow user to edit their profile information, manage account settings.', remarks: 'Complex client-side sorting and filtering logic.' },
    { id: 11, page: '/share', pageLogic: 'Generates a QR code and a shareable link for the application\'s root URL.', buttonsAndLinks: 'Copy Link', buttonLogic: 'Copies the application URL to the clipboard and shows a toast.', currentUse: 'Simple utility page for sharing.', futureAdditions: 'Allow sharing links to specific events.', remarks: 'Uses `react-qr-code` library.' },
    { id: 12, page: '/signup', pageLogic: 'Allows new users to create an account using email/password or Google. Collects first name, last name, and optional social links.', buttonsAndLinks: 'Sign up with Google, Create account', buttonLogic: 'Uses Firebase Authentication hooks (`useSignUp`, `useSignInWithGoogle`) to create a new user and their profile document in Firestore.', currentUse: 'New user registration.', futureAdditions: 'Email verification, more detailed profile setup.', remarks: '' },
    { id: 13, page: '/test-ai', pageLogic: 'A developer utility page to test the AI extraction flow. User can upload an image and see the raw JSON output from the AI.', buttonsAndLinks: 'Extract Details', buttonLogic: 'Calls the `extractEventDetails` server action and displays the result or error.', currentUse: 'Debugging and testing the Genkit AI flow.', futureAdditions: 'Allow testing of other AI flows.', remarks: 'Crucial for isolating and debugging AI-related issues.' },
    { id: 14, page: '/test-ui', pageLogic: 'A showroom for all major UI components used in the application, such as cards, buttons, inputs, and filters.', buttonsAndLinks: 'N/A', buttonLogic: 'N/A', currentUse: 'A visual regression testing and component gallery page for developers.', futureAdditions: 'Add more complex component compositions.', remarks: 'Useful for ensuring design consistency.' },
];

export default function SitePlannerPage() {
  const [details, setDetails] = useState(initialDetails);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ page: '', pageLogic: '', buttonsAndLinks: '', buttonLogic: '', currentUse: '', futureAdditions: '', remarks: '' });
  const { toast } = useToast();

  const handleInputChange = (id: number, field: keyof typeof initialDetails[0], value: string) => {
    setDetails(details.map(detail => 
      detail.id === id ? { ...detail, [field]: value } : detail
    ));
  };
  
  const handleSaveNewRow = () => {
    if (!newRowData.page.trim()) {
        toast({
            variant: "destructive",
            title: "Page is required",
            description: "Please provide a page/path before saving.",
        });
        return;
    }
    const newId = details.length > 0 ? Math.max(...details.map(d => d.id)) + 1 : 1;
    setDetails([...details, { ...newRowData, id: newId }]);
    setNewRowData({ page: '', pageLogic: '', buttonsAndLinks: '', buttonLogic: '', currentUse: '', futureAdditions: '', remarks: '' });
    setIsDialogOpen(false);
  };

  const handleDeleteRow = (id: number) => {
    setDetails(details.filter(detail => detail.id !== id));
  };

  const handleExport = () => {
    const headers = ['Page', 'Page Logic', 'Buttons and Links', 'Button Logic', 'Current Use', 'Future Additions', 'Remarks'];
    const rows = details.map(d => 
        [
            `"${d.page.replace(/"/g, '""')}"`,
            `"${d.pageLogic.replace(/"/g, '""')}"`,
            `"${d.buttonsAndLinks.replace(/"/g, '""')}"`,
            `"${d.buttonLogic.replace(/"/g, '""')}"`,
            `"${d.currentUse.replace(/"/g, '""')}"`,
            `"${d.futureAdditions.replace(/"/g, '""')}"`,
            `"${d.remarks.replace(/"/g, '""')}"`,
        ].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'site-details.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl">
                <Sheet className="h-8 w-8 text-primary" />
                Site Details Planner
              </CardTitle>
              <CardDescription>
                A detailed breakdown of each page's logic, functionality, and purpose.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Application page details.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Page</TableHead>
                    <TableHead className="min-w-[300px]">Page Logic</TableHead>
                    <TableHead className="min-w-[200px]">Buttons & Links</TableHead>
                    <TableHead className="min-w-[300px]">Button Logic</TableHead>
                    <TableHead className="min-w-[250px]">Current Use</TableHead>
                    <TableHead className="min-w-[250px]">Future Additions</TableHead>
                    <TableHead className="min-w-[250px]">Remarks</TableHead>
                    <TableHead className="w-[50px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell>
                        <Input 
                            value={detail.page}
                            onChange={(e) => handleInputChange(detail.id, 'page', e.target.value)}
                            className="border-none bg-transparent p-0 focus-visible:ring-0 h-auto"
                        />
                      </TableCell>
                      {[ 'pageLogic', 'buttonsAndLinks', 'buttonLogic', 'currentUse', 'futureAdditions', 'remarks' ].map(field => (
                        <TableCell key={field}>
                          <Textarea
                            value={detail[field as keyof typeof detail] as string}
                            onChange={(e) => handleInputChange(detail.id, field as keyof typeof detail, e.target.value)}
                            className="border-none bg-transparent p-0 focus-visible:ring-0 h-auto"
                            rows={4}
                          />
                        </TableCell>
                      ))}
                      <TableCell className="text-right align-top">
                         <Button variant="ghost" size="icon" onClick={() => handleDeleteRow(detail.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                         </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="justify-between border-t pt-6">
                <Button variant="outline" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Download as CSV
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Row
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                      <DialogHeader>
                          <DialogTitle>Add New Page Detail</DialogTitle>
                          <DialogDescription>
                              Fill in the details for the new page you want to document.
                          </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                           <div className="space-y-2">
                              <Label htmlFor="page-path">Page Path</Label>
                              <Input id="page-path" value={newRowData.page} onChange={(e) => setNewRowData({...newRowData, page: e.target.value})} placeholder="/example-page" />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="page-logic">Page Logic</Label>
                              <Textarea id="page-logic" value={newRowData.pageLogic} onChange={(e) => setNewRowData({...newRowData, pageLogic: e.target.value})} placeholder="Describe the core logic..." />
                          </div>
                           <div className="space-y-2">
                              <Label htmlFor="buttons-links">Buttons & Links</Label>
                              <Textarea id="buttons-links" value={newRowData.buttonsAndLinks} onChange={(e) => setNewRowData({...newRowData, buttonsAndLinks: e.target.value})} placeholder="List all interactive elements..." />
                          </div>
                           <div className="space-y-2">
                              <Label htmlFor="button-logic">Button Logic</Label>
                              <Textarea id="button-logic" value={newRowData.buttonLogic} onChange={(e) => setNewRowData({...newRowData, buttonLogic: e.target.value})} placeholder="Explain what each button does..." />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="current-use">Current Use</Label>
                              <Textarea id="current-use" value={newRowData.currentUse} onChange={(e) => setNewRowData({...newRowData, currentUse: e.target.value})} placeholder="What is its current state?" />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="future-additions">Future Additions</Label>
                              <Textarea id="future-additions" value={newRowData.futureAdditions} onChange={(e) => setNewRowData({...newRowData, futureAdditions: e.target.value})} placeholder="What features could be added?" />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                              <Label htmlFor="remarks">Remarks</Label>
                              <Textarea id="remarks" value={newRowData.remarks} onChange={(e) => setNewRowData({...newRowData, remarks: e.target.value})} placeholder="Any other notes..." />
                          </div>
                      </div>
                      <DialogFooter>
                          <Button onClick={handleSaveNewRow}>Save Row</Button>
                      </DialogFooter>
                  </DialogContent>
                </Dialog>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
