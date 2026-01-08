export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  createdAt: string; // Add createdAt field
  location: string;
  imageUrl: string;
  imageHint: string;
  organizer: {
    name:string;
    avatarUrl: string;
  };
  category: string;
  status: 'published' | 'draft' | 'pending' | 'denied';
  editCount: number;
  feedback?: string;
};

// Add this to your types file if it's not already there
export type PostOffice = {
  Name: string;
  District: string;
  State: string;
  Pincode: string;
};
