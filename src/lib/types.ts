
export type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  createdAt: Date; // Add createdAt field
  updatedAt?: Date;
  location: string;
  imageUrl: string;
  imageHint: string;
  organizer: {
    id: string;
    name:string;
    avatarUrl: string;
  };
  category: string;
  tags: string[];
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

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  firstName?: string;
  lastName?: string;
  createdAt?: string | Date;
  role?: 'admin' | 'advanced' | 'basic';
};
