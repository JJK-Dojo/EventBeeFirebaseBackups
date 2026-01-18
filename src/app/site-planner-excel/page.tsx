'use client';

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

const activities = [
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

const statusBadges: Record<string, React.ReactNode> = {
    'Completed': <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>,
    'In Progress': <Badge variant="outline" className="bg-yellow-100 text-yellow-800">In Progress</Badge>,
    'Not Started': <Badge variant="destructive">Not Started</Badge>,
};


export default function SitePlannerExcelPage() {
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id} className={activity.status === 'Completed' ? 'bg-muted/50' : ''}>
                      <TableCell>
                        <Checkbox checked={activity.status === 'Completed'} />
                      </TableCell>
                      <TableCell className={`font-medium ${activity.status === 'Completed' ? 'text-muted-foreground line-through' : ''}`}>
                        {activity.task}
                      </TableCell>
                      <TableCell>{activity.assignee}</TableCell>
                      <TableCell>{statusBadges[activity.status]}</TableCell>
                      <TableCell>{activity.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
