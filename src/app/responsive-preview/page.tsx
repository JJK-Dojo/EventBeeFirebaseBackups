'use client';

import { useState } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'mobile' | 'desktop';

export default function ResponsivePreviewPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [url, setUrl] = useState('/'); // Start with the home page

  const iframeDimensions = {
    desktop: { width: '100%', height: '80vh' },
    mobile: { width: '375px', height: '667px' },
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl">
              <Monitor className="h-8 w-8 text-primary" />
              Responsive Preview
            </CardTitle>
            <CardDescription>
              Test the application's look and feel on different screen sizes. All links and actions are fully interactive.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2 rounded-md bg-muted p-2">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                onClick={() => setViewMode('desktop')}
                className="gap-2"
              >
                <Monitor className="h-5 w-5" />
                Desktop View
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                onClick={() => setViewMode('mobile')}
                className="gap-2"
              >
                <Smartphone className="h-5 w-5" />
                Mobile View
              </Button>
            </div>
            
            <div className={cn(
                "mx-auto flex justify-center transition-all duration-300 ease-in-out",
                viewMode === 'desktop' ? 'w-full' : 'max-w-max'
            )}>
              <div className="rounded-xl bg-gray-800 p-2 shadow-2xl transition-all duration-300 ease-in-out lg:p-4">
                  <iframe
                    src={url}
                    style={{
                      width: iframeDimensions[viewMode].width,
                      height: iframeDimensions[viewMode].height,
                    }}
                    className="rounded-md border-2 border-gray-600 bg-white"
                    title="Responsive Preview"
                  />
              </div>
            </div>

          </CardContent>
        </Card>
      </main>
    </div>
  );
}
