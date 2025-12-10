export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  imageHint: string;
  organizer: {
    name: string;
    avatarUrl: string;
  };
  category: string;
  status: 'published' | 'draft';
};
