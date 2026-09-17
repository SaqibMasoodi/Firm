export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  features?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  tags: string[];
  client: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export interface Stat {
  value: string;
  label: string;
  description: string;
  variant: "dark" | "green";
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}
