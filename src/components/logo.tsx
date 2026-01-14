'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function Logo({ className }: { className?: string }) {
  
  const logoImages = PlaceHolderImages;

  if (!logoImages || logoImages.length === 0) {
    // Fallback in case the image is not found
    return (
        <div className={`relative h-24 w-24 ${className}`}>
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-golden bg-muted" />
        </div>
    );
  }

  return (
    <div className={`relative h-24 w-24 ${className}`}>
        <Carousel
        className="w-full h-full"
        opts={{
            loop: true,
            align: 'start',
        }}
        >
        <CarouselContent className="-ml-1 h-full">
            {logoImages.map((p) => (
            <CarouselItem key={p.id} className="pl-1 basis-full">
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-golden">
                    <Image
                    src={p.imageUrl}
                    alt={p.description}
                    fill
                    className="object-cover filter grayscale"
                    data-ai-hint={p.imageHint}
                    unoptimized
                    />
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        </Carousel>
    </div>
  );
}
