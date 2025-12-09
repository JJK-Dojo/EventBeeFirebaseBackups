import { MapPin } from 'lucide-react';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-foreground ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-md">
        <MapPin className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
        <span
          className="text-2xl font-bold font-headline"
          style={{ color: 'hsl(var(--accent))' }}
        >
          LocalLooms
        </span>
        <p className="text-xs text-muted-foreground -mt-1">
          Discover Local Events
        </p>
      </div>
    </div>
  );
}
