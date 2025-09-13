import mongoose, { Schema, Document, Model } from 'mongoose';

// Base interface for all documents
interface BaseDocument extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Blog Post Interface and Schema
export interface IBlogPost extends BaseDocument {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
}

const blogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  coverImage: { type: String },
  tags: [{ type: String }],
  published: { type: Boolean, default: false },
  publishedAt: { type: Date }
}, {
  timestamps: true
});

// Project Interface and Schema
export interface IProject extends BaseDocument {
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
}

const projectSchema = new Schema<IProject>({
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
  publishedAt: { type: Date }
}, {
  timestamps: true
});

// Site Settings Interface and Schema
export interface ISiteSettings extends BaseDocument {
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
}

const siteSettingsSchema = new Schema<ISiteSettings>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  favicon: { type: String },
  themeColors: {
    primary: { type: String },
    secondary: { type: String },
    accent: { type: String }
  },
  aboutPageContent: { type: String },
  resumeFile: { type: String }
}, {
  timestamps: true
});

// Skills Interface and Schema
export interface ISkills extends BaseDocument {
  languages: string[];
  frameworksAndStack: string[];
  toolsAndServices: string[];
}

const skillsSchema = new Schema<ISkills>({
  languages: [{ type: String }],
  frameworksAndStack: [{ type: String }],
  toolsAndServices: [{ type: String }]
}, {
  timestamps: true
});

// User Interface and Schema
export interface IUser extends BaseDocument {
  email: string;
  password: string;
  role: 'admin';
  fullName: string;
  publicEmail?: string;
  phoneNumber?: string;
  location?: string;
  profilePicture: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  xUrl?: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
  fullName: { type: String, required: true },
  publicEmail: { type: String },
  phoneNumber: { type: String },
  location: { type: String },
  profilePicture: { type: String, required: true },
  bio: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  xUrl: { type: String }
}, {
  timestamps: true
});

// Create and export models
export const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', blogPostSchema);
export const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);
export const SiteSettings: Model<ISiteSettings> = mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
export const Skills: Model<ISkills> = mongoose.models.Skills || mongoose.model<ISkills>('Skills', skillsSchema);
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
