'use client';

import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-md bg-gradient-to-br from-blue-100 via-white to-yellow-100 p-1.5 shadow-sm", className)}>
        <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-black glitter-text tracking-wider">
                WIME
            </span>
            <span className="font-headline text-[0.6rem] font-semibold tracking-wide uppercase text-blue-700 whitespace-nowrap">
                Where is My Event
            </span>
        </div>
    </div>
  );
}
