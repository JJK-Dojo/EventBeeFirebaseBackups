'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search } from 'lucide-react';
import { Combobox } from '@/components/ui/combobox';
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

const states = [
    { value: 'Andaman & Nicobar Islands', label: 'Andaman & Nicobar Islands' },
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Dadra & Nagar Haveli and Daman & Diu', label: 'Dadra & Nagar Haveli and Daman & Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jammu & Kashmir', label: 'Jammu & Kashmir' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Ladakh', label: 'Ladakh' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Puducherry', label: 'Puducherry' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
];

type PostOffice = {
  Name: string;
  District: string;
  State: string;
  Pincode: string;
};

export default function EventFilters() {
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState<{ value: string; label: string }[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pincodeData, setPincodeData] = useState<PostOffice[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [mapLocation, setMapLocation] = useState('');

  useEffect(() => {
    if (selectedState) {
      // In a real app, you'd fetch districts for the selected state from an API.
      // For now, we'll just clear the district if the state changes.
      setSelectedDistrict('');
      setDistricts([]); 
      setMapLocation(selectedState);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      setMapLocation(`${selectedDistrict}, ${selectedState}`);
    }
  }, [selectedDistrict, selectedState]);


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
          const postOffices: PostOffice[] = data[0].PostOffice;
          setPincodeData(postOffices);
          setIsPopoverOpen(true);
          
          // You could also populate the districts from this data
          const uniqueDistricts = [...new Set(postOffices.map(po => po.District))];
          setDistricts(uniqueDistricts.map(d => ({ value: d, label: d })));

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
    setSelectedState(postOffice.State);
    setSelectedDistrict(postOffice.District);
    setSearchInput(`${postOffice.Name}, ${postOffice.Pincode}`);
    setMapLocation(`${postOffice.Name}, ${postOffice.District}, ${postOffice.State}`);
    setIsPopoverOpen(false);
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2">
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

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Category</Label>
                    <Combobox 
                        items={categories} 
                        placeholder="Select category..."
                        searchPlaceholder="Search categories..."
                        noResultsText="No categories found."
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2">
              <div className="grid w-full items-center gap-1.5">
                <Label>State</Label>
                <Combobox 
                    items={states}
                    placeholder="Select state..."
                    searchPlaceholder="Search states..."
                    noResultsText="No states found."
                    value={selectedState}
                    onValueChange={setSelectedState}
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label>District</Label>
                <Combobox 
                    items={districts}
                    placeholder="Select district..."
                    searchPlaceholder="Search districts..."
                    noResultsText="Select a state first or search by pincode."
                    value={selectedDistrict}
                    onValueChange={setSelectedDistrict}
                />
              </div>
            </div>

            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="pincode">Pincode or Location Name</Label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                        id="pincode" 
                        placeholder="e.g. 400001 or Mumbai" 
                        value={searchInput}
                        onChange={handleSearchChange}
                        className="pl-10"
                        />
                    </div>
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

            <Button className="w-full sm:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Find Events
            </Button>
          </div>
          <div className="flex h-full min-h-[300px] w-full items-center justify-center rounded-lg bg-muted text-muted-foreground lg:min-h-[400px]">
            {mapLocation ? (
              <div className="text-center p-4">
                <p className="font-semibold">Showing map for:</p>
                <p className="text-lg text-primary">{mapLocation}</p>
              </div>
            ) : (
              'Google Map Placeholder'
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
