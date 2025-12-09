'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search } from 'lucide-react';
import { Combobox } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

const categories = [
  { value: 'music', label: 'Music' },
  { value: 'art', label: 'Art' },
  { value: 'food', label: 'Food' },
  { value: 'tech', label: 'Tech' },
  { value: 'sports', label: 'Sports' },
  { value: 'community', label: 'Community' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'literature', label: 'Literature' },
];

export default function EventFilters() {
  const [location, setLocation] = useState('');

  return (
    <Card className="mb-8">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="search">Search events</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name or keyword"
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="location"
                placeholder="e.g. Mumbai"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" placeholder="e.g. 400001" />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full lg:w-auto">
                <MapPin className="mr-2 h-5 w-5" /> Select on Map
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Select Location on Map</DialogTitle>
                <DialogDescription>
                  Click on the map to select a location, or search for a place.
                  The selected location will appear in the filter.
                </DialogDescription>
              </DialogHeader>
              <div className="h-[400px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                Google Map Placeholder
              </div>
              <DialogFooter>
                <Button onClick={() => setLocation('New York, NY')}>
                  Select this location
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button className="w-full lg:w-auto">
            <Search className="mr-2 h-5 w-5" />
            Find Events
          </Button>
        </div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
            <Label>Category</Label>
            <Combobox 
                items={categories} 
                placeholder="Select category..."
                searchPlaceholder="Search categories..."
                noResultsText="No categories found."
            />
        </div>
      </CardContent>
    </Card>
  );
}
