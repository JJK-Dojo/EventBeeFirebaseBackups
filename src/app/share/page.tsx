
'use client';

import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import Header from '@/components/header';
import Logo from '@/components/logo';

export default function SharePage() {
  const { toast } = useToast();
  const [url, setUrl] = useState('');

  useEffect(() => {
    // Ensure this code runs only on the client
    setUrl(window.location.origin);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied!',
      description: 'The application link has been copied to your clipboard.',
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
                <Logo />
            </div>
            <CardTitle className="font-headline text-2xl md:text-3xl">
              Share This App
            </CardTitle>
            <CardDescription>
              Scan the QR code or copy the link to share.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center p-4 bg-white rounded-lg">
              {url ? (
                <QRCode
                  value={url}
                  size={256}
                  bgColor={"#FFFFFF"}
                  fgColor={"#000000"}
                  level={"L"}
                />
              ) : (
                <div className="h-[256px] w-[256px] bg-gray-200 animate-pulse rounded-md" />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="share-link">Shareable Link</Label>
              <div className="flex items-center gap-2">
                <Input id="share-link" readOnly value={url} />
                <Button variant="outline" size="icon" onClick={handleCopy} disabled={!url}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy Link</span>
                </Button>
              </div>
            </div>
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
              Anyone with this link will be able to access the application.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
