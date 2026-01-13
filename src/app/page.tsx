
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

export default function RootPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
        <div className="text-center">
            <Logo />
            <p className="mt-4 text-lg text-muted-foreground">
                The main landing page has been moved.
            </p>
            <Link href="/eb-home" passHref>
                <Button className="mt-6">Go to EB-Home</Button>
            </Link>
        </div>
    </div>
  );
}
