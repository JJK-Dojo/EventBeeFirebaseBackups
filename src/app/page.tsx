
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="flex items-center gap-2 text-muted-foreground">
        <LoaderCircle className="h-6 w-6 animate-spin" />
        <p className="text-lg">Loading the admin approval page...</p>
      </div>
    </div>
  );
}
