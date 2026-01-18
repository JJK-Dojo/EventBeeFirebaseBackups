'use client';

import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  // Using a standard img tag for simplicity and to avoid Next/Image issues.
  // The user should place their logo.png in the /public directory.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Eventide Logo"
      className={cn("h-12 w-28 object-contain", className)}
    />
  );
}
