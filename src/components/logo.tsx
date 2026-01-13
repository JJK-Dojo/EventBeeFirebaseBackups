const BeeIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      <g transform="translate(50 50) scale(0.7) translate(-50 -50)">
        <g transform="scale(-1, 1) translate(-100, 0)">
        {/* Body */}
        <ellipse cx="50" cy="60" rx="25" ry="20" fill="hsl(var(--accent))" stroke="black" strokeWidth="2.5" />
        
        {/* Stripes (Curved) */}
        <path d="M60 50 C 55 60, 55 70, 60 80" stroke="black" strokeWidth="4" fill="none" />
        <path d="M50 46.5 C 45 60, 45 70, 50 83.5" stroke="black" strokeWidth="4" fill="none" />
        <path d="M40 50 C 35 60, 35 70, 40 80" stroke="black" strokeWidth="4" fill="none" />
        
        {/* Head */}
        <circle cx="70" cy="55" r="15" fill="hsl(var(--accent))" stroke="black" strokeWidth="2.5" />
        
        {/* Closed Eye (Wink) */}
        <path d="M68 52 Q 72 56, 76 52" stroke="black" strokeWidth="2" fill="none" />

        {/* Smile */}
        <path d="M62 62 Q 67 70, 72 62" stroke="black" strokeWidth="2" fill="none" />
        
        {/* Stinger */}
        <path d="M25 60 L 15 60" stroke="black" strokeWidth="3" strokeLinecap="round" />

        {/* Wings */}
        <path
          d="M60 30 C 50 10, 80 10, 70 30"
          fill="rgba(255,255,255,0.8)"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M55 32 C 45 15, 70 15, 65 32"
          fill="rgba(255,255,255,0.7)"
          stroke="black"
          strokeWidth="2"
        />
        </g>
      </g>
    </svg>
);


export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`group flex items-center gap-3 text-foreground ${className}`}>
      <div className="relative h-24 w-24">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))] filter"
        >
            <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="hsl(var(--primary))" 
            />
        </svg>
        <BeeIcon className="h-full w-full text-accent animate-[bee-fly_8s_ease-in-out_infinite] relative" />
      </div>
       <div className="bg-accent p-2 rounded-md border-2 border-dotted border-black">
        <span
          className="text-2xl font-bold font-headline transition-colors duration-300 text-black"
        >
          EventBee
        </span>
        <p className="text-xs -mt-1 text-black">
          Your Hive for Local Events
        </p>
      </div>
    </div>
  );
}
