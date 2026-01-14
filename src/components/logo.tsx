
'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

const BeeIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      <g transform="translate(50 50) scale(0.3) translate(-50 -50)">
        <g transform="scale(-1, 1) translate(-100, 0)">
        {/* Body */}
        <ellipse cx="50" cy="60" rx="25" ry="20" fill="hsl(var(--accent))" stroke="black" strokeWidth="2.5" />
        
        {/* Curved Stripes */}
        <path d="M40 50 C 45 60, 45 70, 40 80" stroke="black" strokeWidth="4" fill="none" />
        <path d="M50 46.5 C 55 60, 55 70, 50 83.5" stroke="black" strokeWidth="4" fill="none" />
        <path d="M60 50 C 65 60, 65 70, 60 80" stroke="black" strokeWidth="4" fill="none" />

        {/* Head */}
        <circle cx="70" cy="55" r="15" fill="hsl(var(--accent))" stroke="black" strokeWidth="2.5" />
        
        {/* Wider Smile */}
        <path d="M62 65 Q 70 72, 78 65" stroke="black" strokeWidth="2.5" fill="none" />

        {/* Closed Eye (Wink) */}
        <path d="M68 52 Q 72 56, 76 52" stroke="black" strokeWidth="2" fill="none" />

        {/* Stinger */}
        <path d="M25 60 L 15 60" stroke="black" strokeWidth="3" strokeLinecap="round" />

        {/* Wings */}
        <path
          d="M60 30 C 50 10, 80 10, 70 30"
          fill="rgba(255,255,255,0.8)"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M55 32 C 45 15, 70 15, 65 32"
          fill="rgba(255,255,255,0.7)"
          stroke="black"
          strokeWidth="2"
        />
        </g>
      </g>
    </svg>
);


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
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
        <BeeIcon className="h-full w-full text-accent animate-[bee-fly_8s_ease-in-out_infinite] relative" />
      </div>
      <div className="relative p-2 rounded-md">
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full"
        >
          {/* Honeycomb watermark */}
          <defs>
            <pattern
              id="honeycomb-text"
              width="14"
              height="24.25"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(0.5)"
            >
              <path
                d="M-7,24.25 l7,-12.12 M21,0 l7,12.12 M-7,24.25 l-7,12.12 M21,48.5 l-7,-12.12 M7,12.12 l14,0 M-14,36.37 l14,0"
                stroke="hsl(var(--golden))"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#honeycomb-text)"
            rx="6"
            ry="6"
          />
          <rect
            width="100%"
            height="100%"
            fill="transparent"
            stroke="hsl(var(--golden))"
            strokeWidth="2"
            rx="6"
ry="6"
          />
        </svg>
        <div className="relative z-10 bg-transparent text-center px-4">
            <span className="text-2xl font-bold font-headline tracking-wider glitter-text">
            EventBee
            </span>
            <p className="text-xs -mt-1 text-black">
            Your Hive for Local Events
            </p>
        </div>
      </div>
    </div>
  );
}
