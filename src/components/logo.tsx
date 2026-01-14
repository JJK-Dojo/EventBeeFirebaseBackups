
'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

export default function Logo({ className }: { className?: string }) {
  
  const feastImages = PlaceHolderImages.filter(p => p.id.startsWith('feast_'));

  return (
    <div className={`group flex items-center gap-3 text-foreground ${className}`}>
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 h-full w-full">
            <Carousel 
                className="w-full h-full"
                plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
                opts={{ loop: true }}
            >
                <CarouselContent>
                    {feastImages.map((image) => (
                    <CarouselItem key={image.id}>
                        <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-golden">
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                className="object-cover filter grayscale"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
      </div>
    </div>
  );
}
