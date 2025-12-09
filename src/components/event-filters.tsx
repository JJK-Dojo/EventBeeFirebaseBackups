'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search } from 'lucide-react';
import { Combobox } from '@/components/ui/combobox';

const locations = [
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'ahmedabad', label: 'Ahmedabad' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'kolkata', label: 'Kolkata' },
  { value: 'surat', label: 'Surat' },
  { value: 'pune', label: 'Pune' },
  { value: 'jaipur', label: 'Jaipur' },
  { value: 'lucknow', label: 'Lucknow' },
  { value: 'kanpur', label: 'Kanpur' },
  { value: 'nagpur', label: 'Nagpur' },
  { value: 'indore', label: 'Indore' },
  { value: 'thane', label: 'Thane' },
  { value: 'bhopal', label: 'Bhopal' },
  { value: 'visakhapatnam', label: 'Visakhapatnam' },
  { value: 'pimpri-chinchwad', label: 'Pimpri-Chinchwad' },
  { value: 'patna', label: 'Patna' },
  { value: 'vadodara', label: 'Vadodara' },
  { value: 'ghaziabad', label: 'Ghaziabad' },
  { value: 'ludhiana', label: 'Ludhiana' },
  { value: 'agra', label: 'Agra' },
  { value: 'nashik', label: 'Nashik' },
  { value: 'faridabad', label: 'Faridabad' },
  { value: 'meerut', label: 'Meerut' },
  { value: 'rajkot', label: 'Rajkot' },
  { value: 'kalyan-dombivali', label: 'Kalyan-Dombivali' },
  { value: 'vasai-virar', label: 'Vasai-Virar' },
  { value: 'varanasi', label: 'Varanasi' },
  { value: 'srinagar', label: 'Srinagar' },
  { value: 'aurangabad', label: 'Aurangabad' },
  { value: 'dhanbad', label: 'Dhanbad' },
  { value: 'amritsar', label: 'Amritsar' },
  { value: 'navi mumbai', label: 'Navi Mumbai' },
  { value: 'allahabad', label: 'Allahabad' },
  { value: 'ranchi', label: 'Ranchi' },
  { value: 'howrah', label: 'Howrah' },
  { value: 'coimbatore', label: 'Coimbatore' },
  { value: 'jabalpur', label: 'Jabalpur' },
  { value: 'gwalior', label: 'Gwalior' },
  { value: 'vijayawada', label: 'Vijayawada' },
  { value: 'jodhpur', label: 'Jodhpur' },
  { value: 'madurai', label: 'Madurai' },
  { value: 'raipur', label: 'Raipur' },
  { value: 'kota', label: 'Kota' },
  { value: 'guwahati', label: 'Guwahati' },
  { value: 'chandigarh', label: 'Chandigarh' },
  { value: 'solapur', label: 'Solapur' },
  { value: 'hubli-dharwad', label: 'Hubli-Dharwad' },
  { value: 'bareilly', label: 'Bareilly' },
];

export default function EventFilters() {
  const [distance, setDistance] = useState(25);

  return (
    <Card className="mb-8 shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3 lg:grid-cols-5">
          <div className="md:col-span-1 lg:col-span-2">
            <Label htmlFor="search" className="mb-2 block text-sm font-medium">What are you looking for?</Label>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="search" placeholder="Search for events, venues, or organizers..." className="pl-10"/>
            </div>
          </div>
           <div className="md:col-span-1 lg:col-span-1">
            <Label htmlFor="location" className="mb-2 block text-sm font-medium">Location</Label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10 h-5 w-5 text-muted-foreground" />
              <Combobox
                  items={locations}
                  placeholder="Select location"
                  searchPlaceholder="Search location..."
                  noResultsText="No location found."
                  className="pl-10"
                />
            </div>
          </div>
          <div className="grid gap-2 lg:col-span-1">
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
          <Button className="w-full lg:col-span-1" size="lg">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
