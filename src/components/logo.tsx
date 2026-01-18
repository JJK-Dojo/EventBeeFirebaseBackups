'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="https://picsum.photos/seed/eventide-logo/200/200"
      data-ai-hint="sunset logo"
      alt="Eventide Logo"
      width={200}
      height={200}
      priority
      className={cn(className)}
    />
  );
}
