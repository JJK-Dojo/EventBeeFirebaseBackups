'use client';

import { useState } from 'react';
import Header from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Sheet, Plus, Trash2, Download, Pencil } from 'lucide-react';
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

type ButtonDetail = {
  id: string;
  name: string;
  link: string;
  logic: string;
  remarks: string;
};

type Detail = {
  id: number;
  page: string;
  pageLogic: string;
  buttons: ButtonDetail[];
  currentUse: string;
  futureAdditions: string;
  remarks: string;
};

const initialDetails: Detail[] = [
  {
    id: 1,
    page: '/admin',
    pageLogic:
      'Displays events with "pending" status for admin approval or denial. Admins can provide feedback for denials.',
    buttons: [
      {
        id: 'admin-approve',
        name: 'Approve',
        link: 'N/A',
        logic: 'Updates event status to "published".',
        remarks: 'Triggers a Firestore update.',
      },
      {
        id: 'admin-deny',
        name: 'Deny',
        link: 'N/A',
        logic:
          'Opens a dialog to enter feedback and updates status to "denied".',
        remarks: 'Feedback is a required field in the dialog.',
      },
    ],
    currentUse: 'Core admin functionality for content moderation.',
    futureAdditions:
      'Bulk actions (approve/deny all), filtering by user, direct link to user profile.',
    remarks:
      'Security rules must ensure only admins can access this page and perform updates.',
  },
  {
    id: 2,
    page: '/analytics',
    pageLogic:
      'Visualizes event data using charts. Shows events by category, status, top locations, and tag popularity.',
    buttons: [],
    currentUse: 'Provides insights into event trends. Currently uses dummy data.',
    futureAdditions:
      'Connect to live Firestore data, add date range filters, show user engagement metrics.',
    remarks: 'Chart components from Recharts are used.',
  },
  {
    id: 3,
    page: '/contact-us',
    pageLogic:
      'A standard contact form that collects user name, email, subject, and message.',
    buttons: [
      {
        id: 'contact-send',
        name: 'Send Message',
        link: 'N/A',
        logic:
          'On submit, displays a toast notification. In a real app, it would trigger an email or save the message.',
        remarks: 'Currently just a console.log and toast.',
      },
    ],
    currentUse: 'Static contact page.',
    futureAdditions:
      'Integrate with an email service or save messages to Firestore.',
    remarks: '',
  },
  {
    id: 4,
    page: '/create-event',
    pageLogic:
      'A comprehensive form for users to create or edit events. Includes fields for title, description, date/time, location (with pincode lookup), category, tags, and image upload. Features AI extraction from an image.',
    buttons: [
      {
        id: 'create-save',
        name: 'Save Event',
        link: 'N/A',
        logic:
          'Creates/updates the event document in Firestore. Status is "pending" if public, "draft" if private.',
        remarks: '',
      },
      {
        id: 'create-ai',
        name: 'AI Extraction',
        link: 'N/A',
        logic: 'Uses Genkit to extract details from an uploaded event poster.',
        remarks: '',
      },
    ],
    currentUse: 'Primary feature for user-generated content.',
    futureAdditions:
      'Support for multiple images, video links, recurring events.',
    remarks: 'Complex component with heavy client-side logic and API calls.',
  },
  {
    id: 5,
    page: '/dashboard',
    pageLogic:
      'A personalized landing page for logged-in users. Displays user info and a list of their 10 most recent event posts.',
    buttons: [
      {
        id: 'dash-profile',
        name: 'View Profile',
        link: '/profile',
        logic: "Navigates to the user's full profile page.",
        remarks: '',
      },
      {
        id: 'dash-edit',
        name: 'Edit Event',
        link: '/create-event?edit={id}',
        logic:
          'Navigates to the create-event page with the event data pre-filled.',
        remarks: '',
      },
    ],
    currentUse: 'User-centric landing page.',
    futureAdditions:
      'Show notifications, quick stats, or a personalized event feed.',
    remarks:
      'Relies on `useUser` and a custom hook `useUserEvents` to fetch data.',
  },
  {
    id: 6,
    page: '/db-view',
    pageLogic:
      'Provides a raw, real-time view of the `/events` collection in Firestore.',
    buttons: [],
    currentUse: 'A developer utility for debugging and verifying database content.',
    futureAdditions:
      'Allow viewing other collections, add query/filter capabilities.',
    remarks: 'Demonstrates a simple `useCollection` implementation.',
  },
  {
    id: 7,
    page: '/events/[id]',
    pageLogic:
      'Displays the full details for a single event, fetched by its ID from Firestore.',
    buttons: [
      {
        id: 'event-directions',
        name: 'Get Directions',
        link: 'External Map App',
        logic:
          'Currently a placeholder. Would open a map application with the event location.',
        remarks: '',
      },
    ],
    currentUse: 'Public-facing event detail view.',
    futureAdditions:
      'Add to calendar, share buttons, comment section, related events.',
    remarks: 'Uses dynamic routing in Next.js.',
  },
  {
    id: 8,
    page: '/find-events',
    pageLogic:
      'The main discovery page. Allows users to search, filter (by category, state, district, tags), and sort published events.',
    buttons: [
      {
        id: 'find-submit',
        name: 'Find Events',
        link: 'N/A',
        logic:
          'Applies the selected filters and search query to the list of events displayed.',
        remarks: '',
      },
    ],
    currentUse: 'Core feature for event discovery.',
    futureAdditions: 'Map view, save searches, more advanced sorting options.',
    remarks: 'Filtering logic is handled client-side in this implementation.',
  },
  {
    id: 9,
    page: '/login',
    pageLogic:
      'Handles user authentication via email/password or Google Sign-In.',
    buttons: [
      {
        id: 'login-google',
        name: 'Sign in with Google',
        link: 'N/A',
        logic: 'Uses Firebase Authentication `useSignInWithGoogle` hook.',
        remarks: '',
      },
      {
        id: 'login-email',
        name: 'Sign in with Email',
        link: 'N/A',
        logic:
          'Uses Firebase Authentication `useSignInWithEmailAndPassword` hook.',
        remarks: '',
      },
    ],
    currentUse: 'Entry point for authenticated users.',
    futureAdditions:
      'Forgot password functionality, sign-in with other providers (e.g., Phone).',
    remarks: 'Includes a fallback for already logged-in users.',
  },
  {
    id: 10,
    page: '/profile',
    pageLogic:
      "Shows a detailed view of a user's activity, including their total points and all their created events, sorted by status (Published, Pending, Denied, Drafts). Allows sorting of the lists.",
    buttons: [
      {
        id: 'profile-sort',
        name: 'Sort Combobox',
        link: 'N/A',
        logic: 'Re-sorts the event lists based on the selected criteria.',
        remarks: '',
      },
      {
        id: 'profile-edit',
        name: 'Edit Event',
        link: '/create-event?edit={id}',
        logic: 'Navigates to the create-event page for denied/draft events.',
        remarks: '',
      },
    ],
    currentUse: 'User-specific content management page.',
    futureAdditions:
      'Allow user to edit their profile information, manage account settings.',
    remarks: 'Complex client-side sorting and filtering logic.',
  },
  {
    id: 11,
    page: '/share',
    pageLogic:
      "Generates a QR code and a shareable link for the application's root URL.",
    buttons: [
      {
        id: 'share-copy',
        name: 'Copy Link',
        link: 'N/A',
        logic: 'Copies the application URL to the clipboard and shows a toast.',
        remarks: '',
      },
    ],
    currentUse: 'Simple utility page for sharing.',
    futureAdditions: 'Allow sharing links to specific events.',
    remarks: 'Uses `react-qr-code` library.',
  },
  {
    id: 12,
    page: '/signup',
    pageLogic:
      'Allows new users to create an account using email/password or Google. Collects first name, last name, and optional social links.',
    buttons: [
      {
        id: 'signup-google',
        name: 'Sign up with Google',
        link: 'N/A',
        logic: 'Uses Firebase Authentication `useSignInWithGoogle` hook.',
        remarks: '',
      },
      {
        id: 'signup-email',
        name: 'Create account',
        link: 'N/A',
        logic: 'Uses Firebase Authentication `useSignUp` hook.',
        remarks: '',
      },
    ],
    currentUse: 'New user registration.',
    futureAdditions: 'Email verification, more detailed profile setup.',
    remarks: '',
  },
  {
    id: 13,
    page: '/test-ai',
    pageLogic:
      'A developer utility page to test the AI extraction flow. User can upload an image and see the raw JSON output from the AI.',
    buttons: [
      {
        id: 'testai-extract',
        name: 'Extract Details',
        link: 'N/A',
        logic:
          'Calls the `extractEventDetails` server action and displays the result or error.',
        remarks: '',
      },
    ],
    currentUse: 'Debugging and testing the Genkit AI flow.',
    futureAdditions: 'Allow testing of other AI flows.',
    remarks: 'Crucial for isolating and debugging AI-related issues.',
  },
  {
    id: 14,
    page: '/test-ui',
    pageLogic:
      'A showroom for all major UI components used in the application, such as cards, buttons, inputs, and filters.',
    buttons: [],
    currentUse:
      'A visual regression testing and component gallery page for developers.',
    futureAdditions: 'Add more complex component compositions.',
    remarks: 'Useful for ensuring design consistency.',
  },
];

const emptyDetail: Omit<Detail, 'id'> = {
  page: '',
  pageLogic: '',
  buttons: [],
  currentUse: '',
  futureAdditions: '',
  remarks: '',
};

export default function SitePlannerPage() {
  const [details, setDetails] = useState(initialDetails);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState(emptyDetail);
  const [currentRow, setCurrentRow] = useState<Detail | null>(null);
  const { toast } = useToast();

  const handleOpenEditDialog = (detail: Detail) => {
    setCurrentRow(JSON.parse(JSON.stringify(detail))); // Deep copy to avoid state mutation issues
    setIsEditDialogOpen(true);
  };

  const handleSaveNewRow = () => {
    if (!newRowData.page.trim()) {
      toast({
        variant: 'destructive',
        title: 'Page is required',
        description: 'Please provide a page/path before saving.',
      });
      return;
    }
    const newId = details.length > 0 ? Math.max(...details.map((d) => d.id)) + 1 : 1;
    setDetails([...details, { ...newRowData, id: newId }]);
    setNewRowData(emptyDetail);
    setIsAddDialogOpen(false);
  };

  const handleSaveEditedRow = () => {
    if (!currentRow) return;
    setDetails(details.map((d) => (d.id === currentRow.id ? currentRow : d)));
    setIsEditDialogOpen(false);
    setCurrentRow(null);
  };

  const handleDeleteRow = (id: number) => {
    setDetails(details.filter((detail) => detail.id !== id));
  };

  const handleExport = () => {
    const headers = [
      'Page',
      'Page Logic',
      'Buttons/Links (JSON)',
      'Current Use',
      'Future Additions',
      'Remarks',
    ];
    const rows = details.map((d) =>
      [
        `"${d.page.replace(/"/g, '""')}"`,
        `"${d.pageLogic.replace(/"/g, '""')}"`,
        `"${JSON.stringify(d.buttons).replace(/"/g, '""')}"`,
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

  const renderDetailForm = (
    data: Omit<Detail, 'id'>,
    setData: (data: any) => void
  ) => {
    const handleButtonChange = (
      index: number,
      field: keyof ButtonDetail,
      value: string
    ) => {
      const updatedButtons = [...data.buttons];
      updatedButtons[index] = { ...updatedButtons[index], [field]: value };
      setData({ ...data, buttons: updatedButtons });
    };

    const addNewButton = () => {
      const newButton: ButtonDetail = {
        id: crypto.randomUUID(),
        name: '',
        link: '',
        logic: '',
        remarks: '',
      };
      setData({ ...data, buttons: [...data.buttons, newButton] });
    };

    const deleteButton = (index: number) => {
      const newButtons = [...data.buttons];
      newButtons.splice(index, 1);
      setData({ ...data, buttons: newButtons });
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
        <div className="space-y-2">
          <Label htmlFor="page-path">Page Path</Label>
          <Input
            id="page-path"
            value={data.page}
            onChange={(e) => setData({ ...data, page: e.target.value })}
            placeholder="/example-page"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="current-use">Current Use</Label>
          <Textarea
            id="current-use"
            value={data.currentUse}
            onChange={(e) => setData({ ...data, currentUse: e.target.value })}
            placeholder="What is its current state?"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="page-logic">Page Logic</Label>
          <Textarea
            id="page-logic"
            value={data.pageLogic}
            onChange={(e) => setData({ ...data, pageLogic: e.target.value })}
            placeholder="Describe the core logic..."
            rows={4}
          />
        </div>

        <div className="md:col-span-2 space-y-4 rounded-lg border p-4">
          <h4 className="font-semibold text-lg">Button & Link Details</h4>
          {data.buttons.map((button, index) => (
            <div
              key={button.id || index}
              className="space-y-3 rounded-md border bg-muted/50 p-3 relative"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6"
                onClick={() => deleteButton(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Button/Link Name</Label>
                  <Input
                    value={button.name}
                    onChange={(e) =>
                      handleButtonChange(index, 'name', e.target.value)
                    }
                    placeholder="e.g., Save Changes"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Link/Href</Label>
                  <Input
                    value={button.link}
                    onChange={(e) =>
                      handleButtonChange(index, 'link', e.target.value)
                    }
                    placeholder="/target-page or N/A"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Logic</Label>
                <Textarea
                  value={button.logic}
                  onChange={(e) =>
                    handleButtonChange(index, 'logic', e.target.value)
                  }
                  placeholder="Describe what happens on click."
                  rows={2}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Remarks</Label>
                <Textarea
                  value={button.remarks}
                  onChange={(e) =>
                    handleButtonChange(index, 'remarks', e.target.value)
                  }
                  placeholder="Additional notes for this button."
                  rows={2}
                />
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addNewButton}>
            <Plus className="mr-2 h-4 w-4" /> Add Button/Link
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="future-additions">Future Additions</Label>
          <Textarea
            id="future-additions"
            value={data.futureAdditions}
            onChange={(e) =>
              setData({ ...data, futureAdditions: e.target.value })
            }
            placeholder="What features could be added?"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="remarks">Page Remarks</Label>
          <Textarea
            id="remarks"
            value={data.remarks}
            onChange={(e) => setData({ ...data, remarks: e.target.value })}
            placeholder="Any other notes for the page..."
          />
        </div>
      </div>
    );
  };
  
  const columnStyles = [
    { name: 'Actions', width: '100px' },
    { name: 'Page', width: '150px' },
    { name: 'Page Logic', width: '300px' },
    { name: 'Button/Link Details', width: '350px' },
    { name: 'Current Use', width: '250px' },
    { name: 'Future Additions', width: '250px' },
    { name: 'Remarks', width: '250px' },
  ];

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
                A detailed breakdown of each page's logic, functionality, and
                purpose. Each row scrolls horizontally.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                {/* Non-scrolling Header */}
                <div className="flex items-center border-b bg-muted/50 font-medium text-muted-foreground text-sm sticky top-0 z-10">
                  {columnStyles.map((col) => (
                    <div
                      key={col.name}
                      className="p-2 text-left"
                      style={{ flex: `0 0 ${col.width}` }}
                    >
                      {col.name}
                    </div>
                  ))}
                </div>

                {/* Scrolling Rows */}
                <div className="text-sm">
                  {details.map((detail) => (
                    <div key={detail.id} className="overflow-x-scroll border-b">
                      <div className="flex items-start">
                        {/* Actions */}
                        <div
                          className="p-2"
                          style={{ flex: `0 0 ${columnStyles[0].width}` }}
                        >
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenEditDialog(detail)}
                            >
                              <Pencil className="h-4 w-4 text-blue-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteRow(detail.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        {/* Page */}
                        <div
                          className="p-2 font-medium"
                          style={{ flex: `0 0 ${columnStyles[1].width}` }}
                        >
                          {detail.page}
                        </div>
                        {/* Page Logic */}
                        <div
                          className="p-2 whitespace-pre-wrap"
                          style={{ flex: `0 0 ${columnStyles[2].width}` }}
                        >
                          {detail.pageLogic}
                        </div>
                        {/* Button/Link Details */}
                        <div
                          className="p-2"
                          style={{ flex: `0 0 ${columnStyles[3].width}` }}
                        >
                          {detail.buttons.length > 0 ? (
                            <div className="space-y-2">
                              {detail.buttons.map((button, index) => (
                                <Card key={index} className="bg-muted/30">
                                  <CardContent className="p-3 text-xs space-y-1">
                                    <p>
                                      <strong className="font-semibold text-foreground">
                                        Name:
                                      </strong>{' '}
                                      {button.name}
                                    </p>
                                    <p>
                                      <strong className="font-semibold text-foreground">
                                        Link:
                                      </strong>{' '}
                                      <span className="font-mono">
                                        {button.link}
                                      </span>
                                    </p>
                                    <p>
                                      <strong className="font-semibold text-foreground">
                                        Logic:
                                      </strong>{' '}
                                      {button.logic}
                                    </p>
                                    {button.remarks && (
                                      <p>
                                        <strong className="font-semibold text-foreground">
                                          Remarks:
                                        </strong>{' '}
                                        {button.remarks}
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              None
                            </span>
                          )}
                        </div>
                        {/* Current Use */}
                        <div
                          className="p-2 whitespace-pre-wrap"
                          style={{ flex: `0 0 ${columnStyles[4].width}` }}
                        >
                          {detail.currentUse}
                        </div>
                        {/* Future Additions */}
                        <div
                          className="p-2 whitespace-pre-wrap"
                          style={{ flex: `0 0 ${columnStyles[5].width}` }}
                        >
                          {detail.futureAdditions}
                        </div>
                        {/* Remarks */}
                        <div
                          className="p-2 whitespace-pre-wrap"
                          style={{ flex: `0 0 ${columnStyles[6].width}` }}
                        >
                          {detail.remarks}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t pt-6">
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Download as CSV
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
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
                  {renderDetailForm(newRowData, setNewRowData)}
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveNewRow}>Save Row</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Page Detail</DialogTitle>
            <DialogDescription>
              Update the details for the page: {currentRow?.page}
            </DialogDescription>
          </DialogHeader>
          {currentRow &&
            renderDetailForm(currentRow, (data) => setCurrentRow(data as Detail))}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEditedRow}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
