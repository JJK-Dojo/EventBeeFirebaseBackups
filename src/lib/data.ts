import type { Event } from '@/lib/types';

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


export const DUMMY_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Mumbai Tech Innovators Meetup',
        description: 'Join us for a day of insightful talks and networking with the brightest minds in tech. This meetup will feature sessions on AI, blockchain, and the future of web development. Light refreshments will be served.',
        date: getFutureDate(5),
        createdAt: getPastDate(1),
        location: 'BKC, Mumbai, 400051',
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx0ZWNoJTIwY29uZmVyZW5jZXxlbnwwfHx8fDE3NjUxODc0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        imageHint: 'tech conference',
        organizer: {
            name: 'Guest User',
            avatarUrl: 'https://picsum.photos/seed/9/40/40'
        },
        category: 'Tech',
        status: 'published',
        editCount: 0,
    },
    {
        id: '2',
        title: 'Delhi Street Food Festival',
        description: 'A vibrant celebration of Delhi\'s culinary heritage. Explore dozens of stalls offering everything from classic chaat to modern fusion dishes. A must-visit for all food lovers!',
        date: getFutureDate(12),
        createdAt: getPastDate(2),
        location: 'Connaught Place, New Delhi, 110001',
        imageUrl: 'https://images.unsplash.com/photo-1551883738-19ffa3dc4c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxmb29kJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzY1MjQ2MzcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        imageHint: 'food festival',
        organizer: {
            name: 'Guest User',
            avatarUrl: 'https://picsum.photos/seed/9/40/40'
        },
        category: 'Food',
        status: 'published',
        editCount: 0,
    },
    {
        id: '3',
        title: 'Indie Music Night Bangalore',
        description: 'Discover your new favorite band at our monthly Indie Music Night. Featuring a lineup of talented local artists in an intimate setting. Get your tickets now!',
        date: getFutureDate(8),
        createdAt: getPastDate(3),
        location: 'Indiranagar, Bengaluru, 560038',
        imageUrl: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtdXNpYyUyMGNvbmNlcnR8ZW58MHx8fHwxNzY1MjM1OTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        imageHint: 'music concert',
        organizer: {
            name: 'Guest User',
            avatarUrl: 'https://picsum.photos/seed/9/40/40'
        },
        category: 'Music',
        status: 'published',
        editCount: 0,
    },
    {
        id: '4',
        title: 'Pune Art & Craft Workshop',
        description: 'Unleash your creativity! This hands-on workshop will guide you through the basics of pottery and painting. All materials provided. Suitable for all skill levels.',
        date: getFutureDate(20),
        createdAt: getPastDate(0), // Posted today
        location: 'Koregaon Park, Pune, 411001',
        imageUrl: 'https://images.unsplash.com/photo-1569783721854-33a99b4c0bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxhcnQlMjBnYWxsZXJ5fGVufDB8fHx8fDE3NjUyNzAyNjNnww&ixlib=rb-4.1.0&q=80&w=1080',
        imageHint: 'art workshop',
        organizer: {
            name: 'Guest User',
            avatarUrl: 'https://picsum.photos/seed/9/40/40'
        },
        category: 'Art',
        status: 'pending',
        editCount: 0,
    },
    {
        id: '5',
        title: 'Morning Yoga Session by the Beach',
        description: 'Start your day with a refreshing yoga session overlooking the sea. A perfect way to connect with nature and find your inner peace. Please bring your own mat.',
        date: getFutureDate(3),
        createdAt: getPastDate(5),
        location: 'Juhu Beach, Mumbai, 400049',
        imageUrl: 'https://images.unsplash.com/photo-1661308411865-4fce7576bef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx5b2dhJTIwd29ya3Nob3B8ZW58MHx8fHwxNzY1MzAwODAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        imageHint: 'yoga session',
        organizer: {
            name: 'Guest User',
            avatarUrl: 'https://picsum.photos/seed/9/40/40'
        },
        category: 'Wellness',
        status: 'denied',
        editCount: 1,
        feedback: 'The event image is low quality. Please upload a higher resolution picture.'
    },
    {
        id: '6',
        title: 'Kolkata Book Fair - Planning',
        description: 'Initial draft for the annual Kolkata Book Fair event page. Details about stalls and author sessions to be added later.',
        date: getFutureDate(45),
        createdAt: getPastDate(10),
        location: 'Salt Lake, Kolkata, 700091',
        imageUrl: 'https://images.unsplash.com/photo-1547126298-f0ae8a42c489?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxib29rJTIwZmFpcnxlbnwwfHx8fDE3NjUyMjk0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        imageHint: 'book fair',
        organizer: {
            name: 'Guest User',
            avatarUrl: 'https://picsum.photos/seed/9/40/40'
        },
        category: 'Literature',
        status: 'draft',
        editCount: 0,
    },
    {
        id: '7',
        title: 'Jaipur Heritage Marathon',
        description: 'Run through the historic Pink City! The route covers major landmarks and offers a unique running experience. Registrations opening soon.',
        date: getFutureDate(30),
        createdAt: getPastDate(4),
        location: 'Jaipur City, Jaipur, 302004',
        imageUrl: 'https://images.unsplash.com/photo-1570004119777-2b1786b0e5bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtYXJhdGhvbiUyMHJ1bnxlbnwwfHx8fDE3NjUyNTkwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        imageHint: 'marathon run',
        organizer: {
            name: 'Guest User',
            avatarUrl: 'https://picsum.photos/seed/9/40/40'
        },
        category: 'Sports',
        status: 'pending',
        editCount: 0,
    },
];
