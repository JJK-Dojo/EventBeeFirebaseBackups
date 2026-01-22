'use client';

import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg bg-gradient-to-br from-blue-100 via-white to-yellow-100 p-2 shadow", className)}>
        <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-black glitter-text tracking-widest">
                WIME
            </span>
            <span className="font-headline text-xs font-semibold tracking-wider uppercase text-blue-700 whitespace-nowrap">
                Where is My Event
            </span>
        </div>
    </div>
  );
}
