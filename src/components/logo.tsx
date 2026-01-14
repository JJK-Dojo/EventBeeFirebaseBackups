
'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function Logo({ className }: { className?: string }) {
  
  const slideImages = PlaceHolderImages.filter(p => p.id.startsWith('slide_'));

  return (
    <div className={`relative h-24 w-24 ${className}`}>
      <Carousel
        key={slideImages.length}
        className="w-full h-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {slideImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-golden">
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
