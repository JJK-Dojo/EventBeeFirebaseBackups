import { MapPin } from 'lucide-react';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-foreground ${className}`}>
        <MapPin className="h-7 w-7 text-primary" />
        <span className="text-2xl font-bold font-headline">LocalLooms</span>
    </div>
  );
}
