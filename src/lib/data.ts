import type { Event } from '@/lib/types';

export const DUMMY_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Indie Music Fest',
    description:
      'Join us for a weekend of incredible live music from the best indie bands around the world. Food trucks, art installations, and good vibes guaranteed. The event runs for two full days, so grab your tickets now!',
    date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    location: 'Mumbai, Maharashtra',
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
      'Explore the cutting edge of contemporary art. This exhibition features works from over 50 emerging artists. A must-see for art lovers and collectors. The showcase is open for a month, with special curator talks on weekends.',
    date: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString(),
    location: 'Delhi, NCT',
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
    location: 'Bangalore, Karnataka',
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
    location: 'Hyderabad, Telangana',
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
    location: 'Chennai, Tamil Nadu',
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
    location: 'Pune, Maharashtra',
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
    location: 'Kolkata, West Bengal',
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
      'A celebration of literature and reading. Discover new authors, find rare editions, and enjoy talks from your favorite writers. A haven for book lovers of all ages, running for 10 days.',
    date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
    location: 'Jaipur, Rajasthan',
    imageUrl: 'https://picsum.photos/seed/8/600/400',
    imageHint: 'book fair',
    organizer: {
      name: 'Readers Guild',
      avatarUrl: 'https://picsum.photos/seed/108/40/40',
    },
    category: 'Literature',
  },
  {
    id: '9',
    title: 'Himalayan Trekking Expedition',
    description:
      'Embark on a breathtaking trekking adventure in the Himalayas. This guided tour is perfect for experienced trekkers looking for a challenge. All equipment and meals provided.',
    date: new Date(new Date().setDate(new Date().getDate() + 40)).toISOString(),
    location: 'Shimla, Himachal Pradesh',
    imageUrl: 'https://picsum.photos/seed/9/600/400',
    imageHint: 'mountain trek',
    organizer: {
      name: 'Mountain Escapes',
      avatarUrl: 'https://picsum.photos/seed/109/40/40',
    },
    category: 'Adventure',
  },
  {
    id: '10',
    title: 'Classical Dance Festival',
    description:
      'Experience the rich cultural heritage of India through classical dance. Featuring performances of Bharatanatyam, Kathak, and Odissi by renowned artists.',
    date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
    location: 'Bhubaneswar, Odisha',
    imageUrl: 'https://picsum.photos/seed/10/600/400',
    imageHint: 'classical dance',
    organizer: {
      name: 'Nritya Academy',
      avatarUrl: 'https://picsum.photos/seed/110/40/40',
    },
    category: 'Art',
  },
  {
    id: '11',
    title: 'Startup Pitch Night',
    description:
      'Watch the next generation of entrepreneurs pitch their innovative ideas to a panel of investors. A great networking opportunity for startups and investors alike.',
    date: new Date(new Date().setDate(new Date().getDate() + 11)).toISOString(),
    location: 'Gurugram, Haryana',
    imageUrl: 'https://picsum.photos/seed/11/600/400',
    imageHint: 'business meeting',
    organizer: {
      name: 'Venture Catalysts',
      avatarUrl: 'https://picsum.photos/seed/111/40/40',
    },
    category: 'Tech',
  },
  {
    id: '12',
    title: 'Goa Beach Cleanup',
    description:
      'Join us in making a difference! Spend a morning with fellow volunteers cleaning up one of Goa\'s beautiful beaches. A rewarding experience for a great cause.',
    date: new Date(new Date().setDate(new Date().getDate() + 8)).toISOString(),
    location: 'Panaji, Goa',
    imageUrl: 'https://picsum.photos/seed/12/600/400',
    imageHint: 'beach cleanup',
    organizer: {
      name: 'Ocean Guardians',
      avatarUrl: 'https://picsum.photos/seed/112/40/40',
    },
    category: 'Community',
  },
  {
    id: '13',
    title: 'Street Food Tour',
    description:
      'Explore the vibrant street food scene of Ahmedabad. A guided tour to taste the most authentic and delicious local delicacies. Come with an empty stomach!',
    date: new Date(new Date().setDate(new Date().getDate() + 6)).toISOString(),
    location: 'Ahmedabad, Gujarat',
    imageUrl: 'https://picsum.photos/seed/13/600/400',
    imageHint: 'street food',
    organizer: {
      name: 'Foodie Trails',
      avatarUrl: 'https://picsum.photos/seed/113/40/40',
    },
    category: 'Food',
  },
  {
    id: '14',
    title: 'Photography Walk',
    description:
      'Capture the architectural beauty and bustling street life of old Lucknow. A guided walk for photography enthusiasts of all skill levels.',
    date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
    location: 'Lucknow, Uttar Pradesh',
    imageUrl: 'https://picsum.photos/seed/14/600/400',
    imageHint: 'city photography',
    organizer: {
      name: 'Shutterbugs United',
      avatarUrl: 'https://picsum.photos/seed/114/40/40',
    },
    category: 'Art',
  },
  {
    id: '15',
    title: 'Meditation and Mindfulness Retreat',
    description:
      'A weekend retreat to disconnect from the hustle and bustle. Guided meditation sessions, mindfulness practices, and serene natural surroundings to help you relax and rejuvenate.',
    date: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
    location: 'Rishikesh, Uttarakhand',
    imageUrl: 'https://picsum.photos/seed/15/600/400',
    imageHint: 'meditation retreat',
    organizer: {
      name: 'Inner Peace Foundation',
      avatarUrl: 'https://picsum.photos/seed/115/40/40',
    },
    category: 'Wellness',
  },
  {
    id: '16',
    title: 'Rock Climbing Workshop',
    description:
      'Learn the basics of rock climbing from certified instructors at this hands-on workshop. All safety equipment will be provided. Perfect for beginners and adrenaline junkies.',
    date: new Date(new Date().setDate(new Date().getDate() + 22)).toISOString(),
    location: 'Hampi, Karnataka',
    imageUrl: 'https://picsum.photos/seed/16/600/400',
    imageHint: 'rock climbing',
    organizer: {
      name: 'Climb On',
      avatarUrl: 'https://picsum.photos/seed/116/40/40',
    },
    category: 'Sports',
  },
  {
    id: '17',
    title: 'Sufi Music Night',
    description:
      'Experience an evening of soulful Sufi music under the stars. Featuring renowned qawwali singers in a magical setting.',
    date: new Date(new Date().setDate(new Date().getDate() + 19)).toISOString(),
    location: 'Ajmer, Rajasthan',
    imageUrl: 'https://picsum.photos/seed/17/600/400',
    imageHint: 'sufi music',
    organizer: {
      name: 'Ruhaniyat',
      avatarUrl: 'https://picsum.photos/seed/117/40/40',
    },
    category: 'Music',
  },
  {
    id: '18',
    title: 'AI and Machine Learning Bootcamp',
    description:
      'An intensive 3-day bootcamp covering the fundamentals of AI and Machine Learning. Hands-on coding sessions and projects. Certificate of completion provided.',
    date: new Date(new Date().setDate(new Date().getDate() + 28)).toISOString(),
    location: 'Indore, Madhya Pradesh',
    imageUrl: 'https://picsum.photos/seed/18/600/400',
    imageHint: 'coding bootcamp',
    organizer: {
      name: 'Data Minds',
      avatarUrl: 'https://picsum.photos/seed/118/40/40',
    },
    category: 'Tech',
  },
  {
    id: '19',
    title: 'Poetry Slam Competition',
    description:
      'A platform for poets to share their work and compete for the title of Slam Champion. An evening of powerful words and emotions.',
    date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    location: 'Chandigarh, Punjab',
    imageUrl: 'https://picsum.photos/seed/19/600/400',
    imageHint: 'poetry reading',
    organizer: {
      name: 'Word Weavers',
      avatarUrl: 'https://picsum.photos/seed/119/40/40',
    },
    category: 'Literature',
  },
  {
    id: '20',
    title: 'Backwaters Houseboat Cruise',
    description:
      'A relaxing day cruise through the serene backwaters of Kerala on a traditional houseboat. Includes authentic Keralan lunch.',
    date: new Date(new Date().setDate(new Date().getDate() + 24)).toISOString(),
    location: 'Alappuzha, Kerala',
    imageUrl: 'https://picsum.photos/seed/20/600/400',
    imageHint: 'houseboat cruise',
    organizer: {
      name: 'Kerala Escapes',
      avatarUrl: 'https://picsum.photos/seed/120/40/40',
    },
    category: 'Travel',
  },
];
