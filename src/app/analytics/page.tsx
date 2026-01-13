
'use client';

import { useMemo } from 'react';
import Header from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart, PieChartIcon, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart as RechartsBarChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";
import type { Event } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { DUMMY_EVENTS } from '@/lib/data';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
  const events = DUMMY_EVENTS.filter(e => e.status === 'published');
  const isLoading = false;

  const eventsByCategory = useMemo(() => {
    if (!events) return [];
    const counts: { [key: string]: number } = {};
    events.forEach(event => {
      counts[event.category] = (counts[event.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [events]);

  const eventsByStatus = useMemo(() => {
    if (!events) return [];
    const counts: { [key: string]: number } = {};
    DUMMY_EVENTS.forEach(event => { // Use all dummy events for status chart
      counts[event.status] = (counts[event.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [events]);

  const eventsByState = useMemo(() => {
    if (!events) return [];
    const counts: { [key: string]: number } = {};
    events.forEach(event => {
        const parts = event.location.split(', ');
        if (parts.length > 1) {
            const state = parts[1]; // This is not a state but works for demo
            counts[state] = (counts[state] || 0) + 1;
        } else {
            const city = parts[0];
            counts[city] = (counts[city] || 0) + 1;
        }
    });
    return Object.entries(counts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
  }, [events]);

  const tagsPopularity = useMemo(() => {
    if (!events) return [];
    const counts: { [key: string]: number } = {};
    events.forEach(event => {
        (event.tags || []).forEach(tag => {
            counts[tag] = (counts[tag] || 0) + 1;
        });
    });
    return Object.entries(counts)
        .map(([name, value]) => ({ name, value }))
        .sort((a,b) => b.value - a.value)
        .slice(0, 10);
  }, [events]);


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-primary"/>
              Analytics Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights into event trends and user engagement on published events.
            </p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[400px] w-full" />
                    </CardContent>
                </Card>
            </div>
          ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-6 w-6 text-primary"/>
                    Events by Category
                </CardTitle>
                <CardDescription>
                    Distribution of events across different categories.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={eventsByCategory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="hsl(var(--primary))" name="Events" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-6 w-6 text-primary"/>
                    Events by Status
                </CardTitle>
                 <CardDescription>
                    The current status of all submitted events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={eventsByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {eventsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                     <Tooltip />
                     <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-6 w-6 text-primary"/>
                    Top 10 Event Locations
                </CardTitle>
                <CardDescription>
                    Locations with the highest number of events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsBarChart layout="vertical" data={eventsByState}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="hsl(var(--accent))" name="Events" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

             <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-6 w-6 text-primary"/>
                    Top 10 Tag Popularity
                </CardTitle>
                <CardDescription>
                    Most popular tags used for events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={tagsPopularity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" name="Tag Count" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

          </div>
          )}
        </div>
      </main>
    </div>
  );
}
