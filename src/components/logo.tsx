const BeeIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      <g transform="translate(5, 5) scale(0.9)">
        {/* Body */}
        <ellipse cx="50" cy="60" rx="25" ry="20" fill="hsl(var(--accent))" stroke="black" strokeWidth="2.5" />
        
        {/* Stripes (Curved) */}
        <path d="M60 50 C 55 60, 55 70, 60 80" stroke="black" strokeWidth="4" fill="none" />
        <path d="M50 46.5 C 45 60, 45 70, 50 83.5" stroke="black" strokeWidth="4" fill="none" />
        <path d="M40 50 C 35 60, 35 70, 40 80" stroke="black" strokeWidth="4" fill="none" />
        
        {/* Head */}
        <circle cx="30" cy="55" r="15" fill="hsl(var(--accent))" stroke="black" strokeWidth="2.5" />
        
        {/* Closed Eye (Wink) */}
        <path d="M28 52 Q 32 56, 36 52" stroke="black" strokeWidth="2" fill="none" />
        
        {/* Smile */}
        <path d="M22 62 Q 25 66, 28 64" stroke="black" strokeWidth="2" fill="none" />
        
        {/* Stinger */}
        <path d="M75 60 L 85 60" stroke="black" strokeWidth="3" strokeLinecap="round" />

        {/* Wings */}
        <path
          d="M40 30 C 50 10, 20 10, 30 30"
          fill="rgba(255,255,255,0.8)"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M45 32 C 55 15, 30 15, 35 32"
          fill="rgba(255,255,255,0.7)"
          stroke="black"
          strokeWidth="2"
        />
      </g>
    </svg>
);


export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`group flex items-center gap-3 text-foreground ${className}`}>
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/50 border-4 border-accent">
        <BeeIcon className="h-16 w-16 text-accent animate-[bee-fly_8s_ease-in-out_infinite]" />
      </div>
       <div className="bg-accent p-2 rounded-md border-2 border-dashed border-black">
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
