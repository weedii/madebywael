import mongoose, { Schema, model, models, Document } from "mongoose";

// Blog post model
export interface BlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  publishedAt: Date;
  updatedAt: Date;
  createdAt: Date;
}

const blogSchema = new Schema<BlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

// Project model
export interface Project extends Document {
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
  publishedAt: Date;
  updatedAt: Date;
  createdAt: Date;
}

const projectSchema = new Schema<Project>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    images: [{ type: String }],
    technologies: [{ type: String }],
    featured: { type: Boolean, default: false },
    githubUrl: { type: String },
    liveUrl: { type: String },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

// Contact info model
export interface ContactInfo extends Document {
  email: string;
  phone?: string;
  location?: string;
  businessHours?: string;
  updatedAt: Date;
}

const contactInfoSchema = new Schema<ContactInfo>(
  {
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    businessHours: { type: String },
  },
  { timestamps: true }
);

// Personal info model
export interface PersonalInfo extends Document {
  name: string;
  bio: string;
  profilePicture?: string;
  skills: string[];
  experience: string;
  updatedAt: Date;
}

const personalInfoSchema = new Schema<PersonalInfo>(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    profilePicture: { type: String },
    skills: [{ type: String }],
    experience: { type: String },
  },
  { timestamps: true }
);

// Social links model
export interface SocialLinks extends Document {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  updatedAt: Date;
}

const socialLinksSchema = new Schema<SocialLinks>(
  {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  { timestamps: true }
);

// Site settings model
export interface SiteSettings extends Document {
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

const siteSettingsSchema = new Schema<SiteSettings>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    favicon: { type: String },
    themeColors: {
      primary: { type: String },
      secondary: { type: String },
      accent: { type: String },
    },
    aboutPageContent: { type: String },
    resumeFile: { type: String },
  },
  { timestamps: true }
);

// User model for admin authentication
export interface User extends Document {
  email: string;
  password: string;
  name: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "admin", enum: ["admin"] },
  },
  { timestamps: true }
);

// Initialize models
export const Blog = models.Blog || model<BlogPost>("Blog", blogSchema);
export const Project = models.Project || model<Project>("Project", projectSchema);
export const ContactInfo = models.ContactInfo || model<ContactInfo>("ContactInfo", contactInfoSchema);
export const PersonalInfo = models.PersonalInfo || model<PersonalInfo>("PersonalInfo", personalInfoSchema);
export const SocialLinks = models.SocialLinks || model<SocialLinks>("SocialLinks", socialLinksSchema);
export const SiteSettings = models.SiteSettings || model<SiteSettings>("SiteSettings", siteSettingsSchema);
export const User = models.User || model<User>("User", userSchema); 