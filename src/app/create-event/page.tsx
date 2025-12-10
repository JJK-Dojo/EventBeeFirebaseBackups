
'use client';

import { useState } from 'react';
import {
  Image as ImageIcon,
  Link as LinkIcon,
  MapPin,
  Youtube,
  Calendar,
  Tag,
  List,
  Clapperboard,
  Link2,
} from 'lucide-react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Combobox } from '@/components/ui/combobox';
import { MultiSelectCombobox } from '@/components/ui/multi-select-combobox';

const categories = [
    { value: 'music', label: 'Music' },
    { value: 'art', label: 'Art' },
    { value: 'food', label: 'Food' },
    { value: 'tech', label: 'Tech' },
    { value: 'sports', label: 'Sports' },
    { value: 'community', label: 'Community' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'literature', label: 'Literature' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'travel', label: 'Travel' },
  ];

const eventTags = [
    { value: 'live music', label: 'Live Music' },
    { value: 'concert', label: 'Concert' },
    { value: 'exhibition', label: 'Exhibition' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'conference', label: 'Conference' },
    { value: 'festival', label: 'Festival' },
    { value: 'marathon', label: 'Marathon' },
    { value: 'meetup', label: 'Meetup' },
    { value: 'hackathon', label: 'Hackathon' },
];


export default function CreateEventPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl">
                Create a New Event
              </CardTitle>
              <CardDescription>
                Fill out the form below to add your event to EventBee.com
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg font-semibold">Event Title</Label>
                  <Input id="title" placeholder="What's your event called?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us more about your event..."
                    rows={5}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-lg font-semibold flex items-center">
                            <List className="mr-2 h-5 w-5 text-primary"/>
                            Category
                        </Label>
                        <Combobox
                            items={categories}
                            placeholder="Select a category..."
                            searchPlaceholder="Search categories..."
                            noResultsText="No categories found."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-lg font-semibold flex items-center">
                            <Tag className="mr-2 h-5 w-5 text-primary"/>
                            Tags
                        </Label>
                        <MultiSelectCombobox
                            items={eventTags}
                            placeholder="Add relevant tags..."
                            searchPlaceholder="Search tags..."
                            noResultsText="No tags found."
                        />
                    </div>
                </div>


                <div className="space-y-4">
                  <Label className="text-lg font-semibold flex items-center">
                    <ImageIcon className="mr-2 h-5 w-5 text-primary" />
                    Event Image
                  </Label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border-2 border-dashed border-border">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Event preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-muted text-muted-foreground">
                          <ImageIcon className="h-8 w-8" />
                          <p className="text-xs">Preview</p>
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <Label htmlFor="image-upload" className="sr-only">Upload Image</Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="cursor-pointer file:cursor-pointer file:font-medium file:text-primary hover:file:text-primary/80"
                      />
                      <p className="mt-1 text-sm text-muted-foreground">
                        PNG, JPG, GIF up to 10MB. Recommended: 1200x628px.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="date" className="text-lg font-semibold flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-primary"/>
                            Date & Time
                        </Label>
                        <Input id="date" type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-lg font-semibold flex items-center">
                            <MapPin className="mr-2 h-5 w-5 text-primary"/>
                            Location
                        </Label>
                        <Input id="location" placeholder="e.g., 'Community Hall, Delhi'" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                        <LinkIcon className="mr-2 h-5 w-5 text-primary"/>
                        Optional Links
                    </h3>
                    <div className="space-y-2">
                        <Label htmlFor="youtube" className="flex items-center text-muted-foreground">
                            <Youtube className="mr-2 h-4 w-4"/>
                            YouTube Link
                        </Label>
                        <Input id="youtube" placeholder="https://www.youtube.com/watch?v=your-video" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="website" className="flex items-center text-muted-foreground">
                            <Link2 className="mr-2 h-4 w-4"/>
                            Reference/Website Link
                        </Label>
                        <Input id="website" placeholder="https://example.com" />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Clapperboard className="mr-2 h-5 w-5" />
                    Create Event
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
