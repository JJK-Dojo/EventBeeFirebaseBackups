const BeeIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      <g transform="rotate(-15 50 50) translate(0, 5)">
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

        {/* Body */}
        <ellipse cx="50" cy="60" rx="25" ry="20" fill="hsl(var(--accent))" stroke="black" strokeWidth="2.5" />

        {/* Stripes */}
        <path d="M35 52 Q 50 48, 65 52" stroke="black" strokeWidth="4" fill="none" />
        <path d="M30 60 Q 50 56, 70 60" stroke="black" strokeWidth="4" fill="none" />
        <path d="M35 68 Q 50 64, 65 68" stroke="black" strokeWidth="4" fill="none" />

        {/* Head */}
        <circle cx="70" cy="55" r="15" fill="hsl(var(--accent))" stroke="black" strokeWidth="2.5" />
        
        {/* Winking Eye */}
        <path d="M72 52 C 75 56, 78 52" stroke="black" strokeWidth="2" fill="none" />

        {/* Stinger */}
        <path d="M25 60 L 15 60" stroke="black" strokeWidth="3" strokeLinecap="round" />

        {/* Smile */}
        <path d="M78 62 Q 75 66, 72 64" stroke="black" strokeWidth="2" fill="none" />
      </g>
    </svg>
);


export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`group flex items-center gap-3 text-foreground ${className}`}>
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/50">
        <BeeIcon className="h-16 w-16 text-accent animate-[bee-fly_8s_ease-in-out_infinite]" />
      </div>
       <div className="bg-accent text-accent-foreground p-2 rounded-md">
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
