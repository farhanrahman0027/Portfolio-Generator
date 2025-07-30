export interface Portfolio {
  id: string;
  template: 'modern' | 'classic';
  hero: {
    name: string;
    title: string;
    tagline: string;
    profileImage: string;
  };
  about: {
    bio: string;
    email: string;
    phone: string;
    location: string;
    socials: {
      linkedin?: string;
      github?: string;
      twitter?: string;
      website?: string;
    };
  };
  skills: string[];
  services: Array<{
    title: string;
    description: string;
  }>;
  portfolio: Array<{
    title: string;
    image: string;
    description: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string;
  }>;
  blog?: {
    title: string;
    summary: string;
  };
  contact: {
    message: string;
    email: string;
    phone: string;
  };
  createdAt: string;
}

export interface FormData extends Omit<Portfolio, 'id' | 'createdAt'> {}