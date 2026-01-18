'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png" // This will load the logo from the `public/logo.png` path
      alt="Eventide Logo"
      width={120}
      height={60}
      className={cn("h-auto", className)}
      priority // Preload the logo as it's important for the page
    />
  );
}
