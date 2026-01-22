'use client';

import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg bg-gradient-to-br from-blue-100 via-white to-yellow-100 p-2 shadow-sm flex items-center gap-2", className)}>
        {/* SVG Logo */}
        <div className="flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Where Is My Event Logo">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="hsl(var(--primary))"/>
            <path d="M9 11l1.5-3L12 11l1.5-3L15 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
        </div>
        
        {/* Text */}
        <div className="flex flex-col items-center leading-tight">
            <div className="text-lg font-bold glitter-text tracking-widest">WIME</div>
            <div className="text-[0.6rem] font-semibold text-primary">Where is My Event</div>
        </div>
    </div>
  );
}
