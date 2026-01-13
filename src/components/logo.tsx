const BeeIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
        <path d="M22 10.5c0-1.28-1.02-2.3-2.3-2.3h-1.09c-.28-2.3-2.22-4.1-4.51-4.1-2.04 0-3.79 1.4-4.32 3.25-.08.28-.18.55-.28.82-1.3-.8-2.9-1.07-4.5-1.07C2.45 6.1 1 8.01 1 10.5c0 2.25 1.54 4.14 3.75 4.86.3.92.79 1.77 1.43 2.5h-.18C3.81 17.86 2 20.06 2 22.5h2c0-1.85 1.28-3.41 3-3.92.51.35 1.05.65 1.63.89l-1.4 1.4H6.5c-.28 0-.5.22-.5.5s.22.5.5.5h3.79l1.4-1.4c.4.1.81.16 1.23.16s.82-.06 1.23-.16l1.4 1.4h3.79c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1.73l-1.4-1.4c.58-.24 1.12-.54 1.63-.89 1.72.51 3 2.07 3 3.92h2c0-2.44-1.81-4.64-4.01-4.98h-.18c.64-.73 1.13-1.58 1.43-2.5C20.46 14.64 22 12.75 22 10.5zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
    </svg>
);


export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`group flex items-center gap-3 text-foreground ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/50">
        <BeeIcon className="h-6 w-6 text-primary-foreground animate-[bee-fly_3s_ease-in-out_infinite]" />
      </div>
      <div>
        <span
          className="text-2xl font-bold font-headline transition-colors duration-300 group-hover:text-primary"
        >
          EventBee.com
        </span>
        <p className="text-xs text-muted-foreground -mt-1">
          Your Hive for Local Events
        </p>
      </div>
    </div>
  );
}
