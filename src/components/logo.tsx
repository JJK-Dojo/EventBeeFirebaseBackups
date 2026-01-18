'use client';

import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-2 text-foreground', className)}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[0.9em] w-[0.9em]"
      >
        <path
          d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeMiterlimit="10"
        />
        <path
          d="M21.9999 16C21.9999 19.3137 19.3136 22 15.9999 22C12.6862 22 9.99991 19.3137 9.99991 16C9.99991 12.6863 12.6862 10 15.9999 10C17.6568 10 19.1862 10.6321 20.2426 11.6885"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-headline font-bold">
        Eventide
      </span>
    </div>
  );
}
