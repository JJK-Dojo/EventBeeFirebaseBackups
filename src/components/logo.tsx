'use client';

import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className)}
      width="120"
      height="60"
      viewBox="0 0 120 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Eventide Logo"
    >
      <defs>
        <linearGradient id="eventide-bg" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop stopColor="#0B3C6A" />
          <stop offset="0.4" stopColor="#A33A53" />
          <stop offset="0.7" stopColor="#E95E4A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      <rect width="120" height="60" fill="url(#eventide-bg)" />

      {/* Icon Group */}
      <g transform="translate(47.5, 12)" fill="hsl(var(--golden))">
        {/* Sun */}
        <path d="M12.5 14C18.299 14 23 9.299 23 3.5L23 14L2 14L2 3.5C2 9.299 6.701 14 12.5 14Z" transform="translate(0 -2)"/>
        
        {/* Rays */}
        <g stroke="hsl(var(--golden))" strokeWidth="1.5" strokeLinecap="round">
          <line x1="12.5" y1="0" x2="12.5" y2="-4" /> {/* Top */}
          <line x1="21.5" y1="4" x2="24" y2="2" /> {/* Top-Right */}
          <line x1="3.5" y1="4" x2="1" y2="2" /> {/* Top-Left */}
          <line x1="25" y1="12" x2="29" y2="12" /> {/* Right */}
          <line x1="0" y1="12" x2="-4" y2="12" /> {/* Left */}
        </g>
        
        {/* Water */}
        <g stroke="hsl(var(--golden))" strokeWidth="1.5" fill="none" strokeLinecap="round" transform="translate(-1, 16)">
          <path d="M0 0 Q 7.5 4, 15 0 T 30 0" />
          <path d="M0 4 Q 7.5 8, 15 4 T 30 4" />
        </g>
      </g>
      
      {/* Text */}
      <text
        x="50%"
        y="52"
        textAnchor="middle"
        fontFamily="var(--font-headline), cursive"
        fontSize="18"
        fill="hsl(var(--golden))"
        fontWeight="bold"
      >
        Eventide
      </text>
    </svg>
  );
}
