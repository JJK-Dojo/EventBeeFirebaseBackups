
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { testExtract } from '@/ai/flows/test-extract-flow';
import { LoaderCircle, Sparkles } from 'lucide-react';
import Header from '@/components/header';

// Function to convert an image to a JPEG data URI
const toJpegDataURL = (dataUrl: string, quality = 0.9): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error('Could not get canvas context'));
            }
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = (err) => reject(err);
        img.src = dataUrl;
    });
};


export default function TestAIPage() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);

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

  const handleTestExtraction = async () => {
    if (!imagePreview) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload an image to test extraction.',
      });
      return;
    }

    setIsExtracting(true);
    setAiResponse(null);
    try {
      const jpegDataUri = await toJpegDataURL(imagePreview);
      const result = await testExtract({ imageDataUri: jpegDataUri });
      setAiResponse(result);
      toast({
        title: 'Extraction Successful!',
        description: 'The AI model returned a response.',
      });
    } catch (error: any) {
      console.error('AI test extraction failed:', error);
      setAiResponse({ error: error.message || 'An unknown error occurred.' });
      toast({
        variant: 'destructive',
        title: 'AI Extraction Failed',
        description: 'Could not get a response from the AI model.',
      });
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl">
                Test AI Image Extraction
              </CardTitle>
              <CardDescription>
                Upload an image to test the `extractEventDetailsFromImage` AI flow. 
                This page will show the raw JSON response from the model.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Event Flyer/Poster</Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer file:cursor-pointer file:font-medium file:text-primary hover:file:text-primary/80"
                />
              </div>

              {imagePreview && (
                <div className="relative h-64 w-full overflow-hidden rounded-lg border-2 border-dashed border-border">
                  <img
                    src={imagePreview}
                    alt="Event preview"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              <Button
                onClick={handleTestExtraction}
                disabled={!imagePreview || isExtracting}
                className="w-full"
              >
                {isExtracting ? (
                  <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5" />
                )}
                Test Extraction
              </Button>

              {aiResponse && (
                <div className="space-y-2">
                  <Label>AI Raw Response</Label>
                  <pre className="mt-2 w-full whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">
                    {JSON.stringify(aiResponse, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
