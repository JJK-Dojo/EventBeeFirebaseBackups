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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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

const locations = [
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'kolkata', label: 'Kolkata' },
  { value: 'pune', label: 'Pune' },
  { value: 'jaipur', label: 'Jaipur' },
  { value: 'ahmedabad', label: 'Ahmedabad' },
  { value: 'lucknow', label: 'Lucknow' },
];

type PostOffice = {
  Name: string;
  District: string;
  State: string;
  Pincode: string;
};

export default function EventFilters() {
  const [location, setLocation] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pincodeData, setPincodeData] = useState<PostOffice[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.length > 2) {
      const isPincode = /^\d{6}$/.test(value);
      const endpoint = isPincode
        ? `https://api.postalpincode.in/pincode/${value}`
        : `https://api.postalpincode.in/postoffice/${value}`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data && data[0].Status === 'Success') {
          setPincodeData(data[0].PostOffice);
          setIsPopoverOpen(true);
        } else {
          setPincodeData([]);
          setIsPopoverOpen(false);
        }
      } catch (error) {
        console.error('Failed to fetch location data:', error);
        setPincodeData([]);
        setIsPopoverOpen(false);
      }
    } else {
      setPincodeData([]);
      setIsPopoverOpen(false);
    }
  };
  
  const handleLocationSelect = (postOffice: PostOffice) => {
    setLocation(`${postOffice.District}, ${postOffice.State}`);
    setSearchInput(postOffice.Pincode);
    setIsPopoverOpen(false);
  };


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
            <Label>Location</Label>
            <Combobox 
                items={locations}
                placeholder="Select location..."
                searchPlaceholder="Search locations..."
                noResultsText="No locations found."
                value={location}
                onValueChange={setLocation}
            />
          </div>

          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="pincode">Pincode or Location Name</Label>
                <Input 
                  id="pincode" 
                  placeholder="e.g. 400001 or Mumbai" 
                  value={searchInput}
                  onChange={handleSearchChange}
                />
              </div>
            </PopoverTrigger>
            {pincodeData.length > 0 && (
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
                <ul className="max-h-60 overflow-y-auto">
                  {pincodeData.map((po, index) => (
                    <li 
                      key={index} 
                      className="cursor-pointer p-2 hover:bg-muted"
                      onClick={() => handleLocationSelect(po)}
                    >
                      <p className="font-semibold">{po.Name}, {po.Pincode}</p>
                      <p className="text-sm text-muted-foreground">{po.District}, {po.State}</p>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            )}
          </Popover>

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
