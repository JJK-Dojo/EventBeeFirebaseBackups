'use client';

import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center -space-y-1", className)}>
      <span className="font-headline text-xl font-semibold tracking-tighter whitespace-nowrap text-foreground">
        Where is My Event
      </span>
      <span className="text-3xl font-black glitter-text tracking-widest">
        WIME
      </span>
    </div>
  );
}
