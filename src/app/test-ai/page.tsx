'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/header';
import { useToast } from '@/hooks/use-toast';
import { extractEventDetails } from '@/ai/flows/extract-event-details';
import { LoaderCircle, Sparkles, FlaskConical } from 'lucide-react';

// Function to convert an image file to a JPEG data URI
const toJpegDataURL = (file: File, quality = 0.9, maxWidth = 1024, maxHeight = 1024): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (!event.target?.result) {
                return reject(new Error('FileReader did not return a result.'));
            }
            const img = new window.Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return reject(new Error('Could not get canvas context'));
                }
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = (err) => reject(err);
            img.src = event.target.result as string;
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
    });
};


export default function TestAiPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleExtract = async () => {
    if (!imageFile) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please select an image file to test extraction.',
      });
      return;
    }

    setIsExtracting(true);
    setResult('');
    try {
        const jpegDataUrl = await toJpegDataURL(imageFile);
        const extractedData = await extractEventDetails({ imageDataUri: jpegDataUrl });
        setResult(JSON.stringify(extractedData, null, 2));
        toast({
            title: 'Extraction Successful!',
            description: 'The extracted data is shown below.',
        });
    } catch (error: any) {
        console.error("AI Extraction failed:", error);
        setResult(`Error: ${error.message}`);
        toast({
            variant: "destructive",
            title: "AI Extraction Error",
            description: error.message || "An unexpected error occurred.",
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
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl flex items-center gap-2">
                <FlaskConical className="h-8 w-8 text-primary"/>
                Test AI Extraction
              </CardTitle>
              <CardDescription>
                Upload an event poster to test the AI content extraction flow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Event Poster Image</Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              <Button onClick={handleExtract} disabled={isExtracting || !imageFile} className="w-full">
                {isExtracting ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Extract Details
              </Button>
              {result && (
                <div className="space-y-2">
                  <Label>Extraction Result (JSON)</Label>
                  <Textarea value={result} readOnly rows={15} className="font-mono text-xs bg-muted/50" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
