const BeeIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      >
      <defs>
        <polygon id="hexagon" points="50 1, 95 25, 95 75, 50 99, 5 75, 5 25" />
      </defs>
      
      <use href="#hexagon" fill="hsl(var(--primary))" />
      <g transform="translate(18, 22) scale(0.65)">
        <path fill="black" d="M50,30 C40,20 30,30 30,40 C30,60 40,70 50,75 C60,70 70,60 70,40 C70,30 60,20 50,30 Z" />
        <path fill="black" stroke="black" stroke-width="8" stroke-linecap="round" d="M40 55 l20 0" />
        <path fill="black" stroke="black" stroke-width="8" stroke-linecap="round" d="M35 65 l30 0" />
        <path fill="none" stroke="white" stroke-width="6" stroke-linecap="round" d="M60 35 C 70 25, 80 25, 80 35" />
        <path fill="none" stroke="white" stroke-width="6" stroke-linecap="round" d="M40 35 C 30 25, 20 25, 20 35" />
        <path fill="black" stroke="black" stroke-width="4" stroke-linecap="round" d="M42 30 A 10 10, 0, 0, 1, 32 25" />
        <path fill="black" stroke="black" stroke-width="4" stroke-linecap="round" d="M58 30 A 10 10, 0, 0, 0, 68 25" />
        <circle cx="45" cy="45" r="2" fill="white" />
      </g>
    </svg>
);


export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`group flex items-center gap-3 text-foreground ${className}`}>
      <div className="flex h-24 w-24 items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/50">
        <BeeIcon className="h-24 w-24" />
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
