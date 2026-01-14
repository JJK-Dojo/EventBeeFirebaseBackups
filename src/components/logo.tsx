'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function Logo({ className }: { className?: string }) {
  const allImages = PlaceHolderImages;

  return (
    <div className={`relative h-24 w-24 ${className}`}>
      <Carousel
        className="h-full w-full"
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
          align: 'start',
        }}
      >
        <CarouselContent>
          {allImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-golden">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover filter grayscale"
                  data-ai-hint={image.imageHint}
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
