'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="https://picsum.photos/seed/eventide-logo-3/120/40"
      alt="Eventide Logo"
      width={120}
      height={40}
      priority
      className={cn(className)}
    />
  );
}
