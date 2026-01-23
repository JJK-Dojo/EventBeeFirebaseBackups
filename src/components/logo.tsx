'use client';

import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg bg-gradient-to-br from-blue-100 via-white to-yellow-100 p-2 shadow-sm flex items-center gap-2", className)}>
        {/* SVG Logo */}
        <div className="flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Here Is Your Event Logo">
                <path d="M8 2V5" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V5" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.5 9.09H20.5" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round"/>
                <path d="M11.995 13.7H12.005" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.294 13.7H8.304" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.294 16.7H8.304" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        
        {/* Text */}
        <div className="flex flex-col items-center leading-tight">
            <div className="text-lg font-bold glitter-text tracking-widest">HIYE</div>
            <div className="text-[0.6rem] font-semibold text-primary">Here Is Your Event</div>
        </div>
    </div>
  );
}
