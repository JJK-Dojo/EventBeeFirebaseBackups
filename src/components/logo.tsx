'use client';

import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src="https://i.postimg.cc/fTX70zjV/Vibrant-evening-them5.png"
      alt="Eventide Logo"
      className={cn("h-full w-full object-contain", className)}
    />
  );
}
