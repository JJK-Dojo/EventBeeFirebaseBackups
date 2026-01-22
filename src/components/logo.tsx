'use client';

import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <span className="text-3xl font-black glitter-text tracking-widest">
        WIME
      </span>
      <span className="font-headline text-xs font-semibold tracking-wider uppercase text-foreground/80 whitespace-nowrap">
        Where is My Event
      </span>
    </div>
  );
}
