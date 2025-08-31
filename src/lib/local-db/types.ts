// Local database types - same interfaces as the original models but without Mongoose Document

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  images: string[];
  technologies: string[];
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  published: boolean;
  publishedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
}

export interface SiteSettings {
  id: string;
  title: string;
  description: string;
  favicon?: string;
  themeColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  aboutPageContent?: string;
  resumeFile?: string;
  updatedAt: Date;
}

export interface Skills {
  id: string;
  languages: string[];
  frameworksAndStack: string[];
  toolsAndServices: string[];
  updatedAt: Date;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: "admin";
  // Profile information
  fullName: string;
  publicEmail?: string;
  phoneNumber?: string;
  location?: string;
  profilePicture: string;
  bio?: string;
  // Social links
  githubUrl?: string;
  linkedinUrl?: string;
  xUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Generic base interface for all entities
export interface BaseEntity {
  id: string;
  updatedAt: Date;
  createdAt?: Date;
}

// Query options for finding records
export interface QueryOptions<T> {
  where?: Partial<T>;
  limit?: number;
  offset?: number;
  sortBy?: keyof T;
  sortOrder?: "asc" | "desc";
}
