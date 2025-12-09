'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function EventFilters() {
  const [distance, setDistance] = useState(25);

  return (
    <Card className="mb-8 shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Label htmlFor="search" className="mb-2 block text-sm font-medium">What are you looking for?</Label>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="search" placeholder="Search for events, venues, or organizers..." className="pl-10"/>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="distance" className="flex justify-between">
                <span>Distance</span>
                <span className="text-primary font-medium">{distance} km</span>
            </Label>
            <Slider
              id="distance"
              min={1}
              max={100}
              step={1}
              value={[distance]}
              onValueChange={(value) => setDistance(value[0])}
            />
          </div>
          <Button className="w-full" size="lg">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
