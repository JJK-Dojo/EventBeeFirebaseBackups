import type { Event } from '@/lib/types';

export const DUMMY_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Indie Music Fest',
    description:
      'Join us for a weekend of incredible live music from the best indie bands around the world. Food trucks, art installations, and good vibes guaranteed. The event runs for two full days, so grab your tickets now!',
    date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    location: 'Mumbai, India',
    imageUrl: 'https://picsum.photos/seed/1/600/400',
    imageHint: 'music concert',
    organizer: {
      name: 'Vibe Creators',
      avatarUrl: 'https://picsum.photos/seed/101/40/40',
    },
    category: 'Music',
  },
  {
    id: '2',
    title: 'Modern Art Showcase',
    description:
      "Explore the cutting edge of contemporary art. This exhibition features works from over 50 emerging artists. A must-see for art lovers and collectors. The showcase is open for a month, with special curator talks on weekends.",
    date: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString(),
    location: 'Delhi, India',
    imageUrl: 'https://picsum.photos/seed/2/600/400',
    imageHint: 'art gallery',
    organizer: {
      name: 'Canvas Collective',
      avatarUrl: 'https://picsum.photos/seed/102/40/40',
    },
    category: 'Art',
  },
  {
    id: '3',
    title: 'Global Food Festival',
    description:
      "Taste the world in one place! Our annual food festival brings together cuisines from every corner of the globe. A paradise for foodies, with cooking demos and live entertainment. Don't miss this delicious experience.",
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    location: 'Bangalore, India',
    imageUrl: 'https://picsum.photos/seed/3/600/400',
    imageHint: 'food festival',
    organizer: {
      name: 'Gourmet Gatherings',
      avatarUrl: 'https://picsum.photos/seed/103/40/40',
    },
    category: 'Food',
  },
  {
    id: '4',
    title: 'Future of Tech Summit',
    description:
      'A two-day conference on the future of technology. Hear from industry leaders on AI, blockchain, and more. Network with innovators and get a glimpse into tomorrow. Limited seats available.',
    date: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString(),
    location: 'Hyderabad, India',
    imageUrl: 'https://picsum.photos/seed/4/600/400',
    imageHint: 'tech conference',
    organizer: {
      name: 'Innovate Hub',
      avatarUrl: 'https://picsum.photos/seed/104/40/40',
    },
    category: 'Tech',
  },
  {
    id: '5',
    title: 'City Marathon 2024',
    description:
      'Join thousands of runners for the annual city marathon. A scenic route through the heart of the city. Open to all fitness levels, with 5K, 10K, and full marathon categories. Register now and be part of the excitement.',
    date: new Date(new Date().setDate(new Date().getDate() + 18)).toISOString(),
    location: 'Chennai, India',
    imageUrl: 'https://picsum.photos/seed/5/600/400',
    imageHint: 'marathon run',
    organizer: {
      name: 'RunFit',
      avatarUrl: 'https://picsum.photos/seed/105/40/40',
    },
    category: 'Sports',
  },
  {
    id: '6',
    title: 'Organic Farmers Market',
    description:
      'Get your weekly stock of fresh, organic produce directly from local farmers. Vegetables, fruits, honey, and more. Support local and eat healthy. Every Sunday for the next month.',
    date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    location: 'Pune, India',
    imageUrl: 'https://picsum.photos/seed/6/600/400',
    imageHint: 'farmers market',
    organizer: {
      name: 'Green Roots',
      avatarUrl: 'https://picsum.photos/seed/106/40/40',
    },
    category: 'Community',
  },
  {
    id: '7',
    title: 'Sunrise Yoga Workshop',
    description:
      'Start your day with a rejuvenating yoga session in the park. This workshop is suitable for all levels, focusing on mindfulness and breathing techniques. A perfect way to connect with nature and yourself.',
    date: new Date(new Date().setDate(new Date().getDate() + 9)).toISOString(),
    location: 'Kolkata, India',
    imageUrl: 'https://picsum.photos/seed/7/600/400',
    imageHint: 'yoga workshop',
    organizer: {
      name: 'Zen Space',
      avatarUrl: 'https://picsum.photos/seed/107/40/40',
    },
    category: 'Wellness',
  },
  {
    id: '8',
    title: 'Annual Book Fair',
    description:
      "A celebration of literature and reading. Discover new authors, find rare editions, and enjoy talks from your favorite writers. A haven for book lovers of all ages, running for 10 days.",
    date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
    location: 'Jaipur, India',
    imageUrl: 'https://picsum.photos/seed/8/600/400',
    imageHint: 'book fair',
    organizer: {
      name: 'Readers Guild',
      avatarUrl: 'https://picsum.photos/seed/108/40/40',
    },
    category: 'Literature',
  },
];
