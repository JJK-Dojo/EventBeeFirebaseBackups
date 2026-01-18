'use client';

import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className)}
      width="120"
      height="60"
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Eventide Logo"
    >
      {/* Icon Group */}
      <g transform="translate(35, 2)">
        {/* Sun */}
        <defs>
          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        <path d="M25 15 C 25 23.28, 19.28 29, 12.5 29 C 5.72 29, 0 23.28, 0 15" fill="url(#sunGradient)"/>

        {/* Sun Rays */}
        <g transform="translate(12.5, 15)" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round">
            <line y1="-10" y2="-13" />
            <line x1="7.07" y1="-7.07" x2="9.19" y2="-9.19" />
            <line x1="10" x2="13" />
            <line x1="7.07" y1="7.07" x2="9.19" y2="9.19" />
            <line x1="-7.07" y1="-7.07" x2="-9.19" y2="-9.19" />
            <line x1="-10" x2="-13" />
            <line x1="-7.07" y1="7.07" x2="-9.19" y2="9.19" />
             <line x1="-5" y1="8.66" x2="-7" y2="10.39" />
             <line x1="5" y1="8.66" x2="7" y2="10.39" />
        </g>

        {/* Water */}
        <g transform="translate(-10, 26)" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <path d="M0 0 C 5 -3, 10 -3, 15 0 S 25 3, 30 0 S 40 -3, 45 0 S 55 3, 60 0" />
            <path d="M-2 5 C 3 2, 8 2, 13 5 S 23 8, 28 5 S 38 2, 43 5 S 53 8, 58 5" />
        </g>
      </g>
      
      {/* Text */}
      <text
        x="50%"
        y="55"
        textAnchor="middle"
        fontFamily="var(--font-lobster), cursive"
        fontSize="22"
        fill="#F59E0B"
      >
        Eventide
      </text>
    </svg>
  );
}
