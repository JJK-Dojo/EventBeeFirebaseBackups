'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  // The parent element must have position: relative and a defined size for `fill` to work.
  // object-contain will ensure the image aspect ratio is preserved.
  return (
    <div className={cn("relative h-10 w-24", className)}>
      <Image
        src="/logo.png"
        alt="Eventide Logo"
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  );
}
