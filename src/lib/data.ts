import type { Event } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const now = new Date();
const getFutureDate = (days: number) => {
    const future = new Date(now);
    future.setDate(now.getDate() + days);
    return future.toISOString();
}

const getPastDate = (days: number) => {
    const past = new Date(now);
    past.setDate(now.getDate() - days);
    return past.toISOString();
}

const findImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        return {
            imageUrl: 'https://picsum.photos/seed/1/600/400',
            imageHint: 'placeholder'
        }
    }
    return { imageUrl: img.imageUrl, imageHint: img.imageHint };
}

export const DUMMY_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Indie Music Fest',
        description: 'A weekend of the best indie bands from around the country. Multiple stages, food trucks, and good vibes.',
        date: getFutureDate(10),
        createdAt: getPastDate(2),
        location: 'Mumbai, 400001',
        ...findImage('event_music_concert'),
        organizer: {
            name: 'MusicNXT',
            avatarUrl: 'https://picsum.photos/seed/10/40/40',
        },
        category: 'Music',
        status: 'published',
        editCount: 0,
    },
    {
        id: '2',
        title: 'Modern Art Showcase',
        description: 'Explore the works of emerging artists in this stunning gallery exhibition. Opening night includes wine and cheese.',
        date: getFutureDate(25),
        createdAt: getPastDate(5),
        location: 'Delhi, 110001',
        ...findImage('event_art_exhibition'),
        organizer: {
            name: 'ArtHouse Collective',
            avatarUrl: 'https://picsum.photos/seed/11/40/40',
        },
        category: 'Art',
        status: 'published',
        editCount: 0,
    },
     {
        id: '3',
        title: 'Startup Pitch Night',
        description: 'Watch the next generation of entrepreneurs pitch their ideas to a panel of venture capitalists.',
        date: getFutureDate(7),
        createdAt: getPastDate(1),
        location: 'Bengaluru, 560001',
        ...findImage('event_tech_conference'),
        organizer: {
            name: 'InnovateHub',
            avatarUrl: 'https://picsum.photos/seed/12/40/40',
        },
        category: 'Tech',
        status: 'pending',
        editCount: 0,
    },
    {
        id: '4',
        title: 'City Marathon 2024',
        description: 'Join thousands of runners in the annual city marathon. A scenic route through the heart of the city.',
        date: getFutureDate(45),
        createdAt: getPastDate(10),
        location: 'Chennai, 600001',
        ...findImage('event_community_run'),
        organizer: {
            name: 'Runners Club',
            avatarUrl: 'https://picsum.photos/seed/13/40/40',
        },
        category: 'Sports',
        status: 'draft',
        editCount: 0,
    },
    {
        id: '5',
        title: 'Gourmet Food Festival',
        description: 'A paradise for food lovers. Taste dishes from over 50 local and international chefs.',
        date: getFutureDate(18),
        createdAt: getPastDate(3),
        location: 'Kolkata, 700001',
        ...findImage('event_food_festival'),
        organizer: {
            name: 'FoodieFinds',
            avatarUrl: 'https://picsum.photos/seed/14/40/40',
        },
        category: 'Food',
        status: 'denied',
        feedback: 'Image is too low quality. Please upload a higher resolution poster.',
        editCount: 1,
    }
];
