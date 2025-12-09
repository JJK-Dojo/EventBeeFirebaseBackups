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
    // States
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'goa', label: 'Goa' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'west-bengal', label: 'West Bengal' },
    // Union Territories
    { value: 'andaman-nicobar', label: 'Andaman and Nicobar Islands' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'dadra-nagar-haveli-daman-diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'jammu-kashmir', label: 'Jammu and Kashmir' },
    { value: 'ladakh', label: 'Ladakh' },
    { value: 'lakshadweep', label: 'Lakshadweep' },
    { value: 'puducherry', label: 'Puducherry' },
    // Major Cities
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi-city', label: 'Delhi' }, // Renamed to avoid conflict
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
];

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
  const [distance, setDistance] = useState([50]);

  return (
    <Card className="mb-8">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="search">Search events</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="search" placeholder="Search by name or keyword" className="pl-10" />
            </div>
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label>Location</Label>
            <Combobox 
                items={locations} 
                placeholder="Select location..."
                searchPlaceholder="Search for a location..."
                noResultsText="No locations found."
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label>Category</Label>
            <Combobox 
                items={categories} 
                placeholder="Select category..."
                searchPlaceholder="Search categories..."
                noResultsText="No categories found."
            />
          </div>

          <Button className="w-full lg:w-auto">
            <Search className="mr-2 h-5 w-5" />
            Find Events
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
