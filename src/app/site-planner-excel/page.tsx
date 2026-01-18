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
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';

const initialActivities = [
    { id: 1, task: 'Finalize app branding and logo', assignee: 'Design Team', status: 'Completed', dueDate: '2024-07-10' },
    { id: 2, task: 'Develop user authentication flow (signup/login)', assignee: 'Frontend Dev', status: 'Completed', dueDate: '2024-07-15' },
    { id: 3, task: 'Implement Firestore database structure', assignee: 'Backend Dev', status: 'Completed', dueDate: '2024-07-18' },
    { id: 4, task: 'Create "Find Events" page with search and filters', assignee: 'Frontend Dev', status: 'In Progress', dueDate: '2024-07-22' },
    { id: 5, task: 'Build "Create Event" form with AI auto-fill', assignee: 'AI/Frontend Dev', status: 'In Progress', dueDate: '2024-07-25' },
    { id: 6, task: 'Design user profile and dashboard pages', assignee: 'UI/UX Designer', status: 'In Progress', dueDate: '2024-07-20' },
    { id: 7, task: 'Set up admin panel for event approval', assignee: 'Full Stack Dev', status: 'Not Started', dueDate: '2024-07-28' },
    { id: 8, task: 'Implement analytics dashboard with charts', assignee: 'Frontend Dev', status: 'Not Started', dueDate: '2024-08-01' },
    { id: 9, task: 'Write Firestore security rules', assignee: 'Backend Dev', status: 'In Progress', dueDate: '2024-07-24' },
    { id: 10, task: 'Deploy application to Firebase App Hosting', assignee: 'DevOps', status: 'Not Started', dueDate: '2024-08-05' },
    { id: 11, task: 'Test end-to-end user flows', assignee: 'QA Team', status: 'Not Started', dueDate: '2024-08-02' },
    { id: 12, task: 'Add "Contact Us" page', assignee: 'Frontend Dev', status: 'Completed', dueDate: '2024-07-19' },
    { id: 13, task: 'Add "Site Under Construction" watermark', assignee: 'Frontend Dev', status: 'Completed', dueDate: '2024-07-19' },
];

const statusOptions = [
    { value: 'Not Started', label: 'Not Started' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
];


export default function SitePlannerExcelPage() {
  const [activities, setActivities] = useState(initialActivities);

    const sortedActivities = useMemo(() => {
        const active = activities.filter(a => a.status !== 'Completed');
        const completed = activities.filter(a => a.status === 'Completed');

        completed.sort((a, b) => {
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
            return dateB - dateA;
        });

        return [...active, ...completed];
    }, [activities]);

    const handleInputChange = (id: number, field: string, value: string | boolean) => {
        setActivities(activities.map(activity => {
            if (activity.id === id) {
                return { ...activity, [field]: value };
            }
            return activity;
        }));
    };
    
    const handleStatusChange = (id: number, newStatus: string) => {
         setActivities(activities.map(activity => 
            activity.id === id ? { ...activity, status: newStatus } : activity
        ));
    };

    const handleAddRow = () => {
        const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;
        const newActivity = {
            id: newId,
            task: '',
            assignee: '',
            status: 'Not Started' as 'Not Started' | 'In Progress' | 'Completed',
            dueDate: '',
        };
        setActivities([newActivity, ...activities]);
    };

    const handleDeleteRow = (id: number) => {
        setActivities(activities.filter(activity => activity.id !== id));
    };

    const handleExport = () => {
        const headers = ['Task', 'Assignee', 'Status', 'Due Date'];
        const rows = sortedActivities.map(activity => 
            [
                `"${activity.task.replace(/"/g, '""')}"`,
                activity.assignee,
                activity.status,
                activity.dueDate
            ].join(',')
        );

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.href) {
            URL.revokeObjectURL(link.href);
        }
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'site-planner.csv');
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
                Site Planner
              </CardTitle>
              <CardDescription>
                A high-level activity planner to track the development of the EventBee portal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>EventBee development activity list.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Done</TableHead>
                    <TableHead>Activity / Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="w-[50px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedActivities.map((activity) => (
                    <TableRow key={activity.id} className={activity.status === 'Completed' ? 'bg-muted/50 text-muted-foreground' : ''}>
                      <TableCell>
                        <Checkbox 
                            checked={activity.status === 'Completed'} 
                            onCheckedChange={(checked) => handleStatusChange(activity.id, checked ? 'Completed' : 'In Progress')}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                            value={activity.task}
                            onChange={(e) => handleInputChange(activity.id, 'task', e.target.value)}
                            className="border-none bg-transparent p-0 focus-visible:ring-0"
                         />
                      </TableCell>
                      <TableCell>
                        <Input
                            value={activity.assignee}
                            onChange={(e) => handleInputChange(activity.id, 'assignee', e.target.value)}
                            className="border-none bg-transparent p-0 focus-visible:ring-0"
                         />
                      </TableCell>
                      <TableCell>
                        <Combobox
                            items={statusOptions}
                            value={activity.status}
                            onValueChange={(value) => handleStatusChange(activity.id, value)}
                        />
                      </TableCell>
                      <TableCell>
                         <Input
                            type="date"
                            value={activity.dueDate}
                            onChange={(e) => handleInputChange(activity.id, 'dueDate', e.target.value)}
                            className="border-none bg-transparent p-0 focus-visible:ring-0"
                         />
                      </TableCell>
                       <TableCell className="text-right">
                         <Button variant="ghost" size="icon" onClick={() => handleDeleteRow(activity.id)}>
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
                <Button onClick={handleAddRow}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Row
                </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
