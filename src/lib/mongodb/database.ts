import connectDB from './connection';
import { BlogPost, Project, SiteSettings, Skills, User, IBlogPost, IProject, ISiteSettings, ISkills, IUser } from './models';
import { Document, FilterQuery, UpdateQuery } from 'mongoose';

// Generic database service class
export class MongoDBService<T extends Document> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  // Ensure database connection
  private async ensureConnection() {
    await connectDB();
  }

  // Create a new document
  async create(data: Partial<T>): Promise<T> {
    await this.ensureConnection();
    const document = new this.model(data);
    return await document.save();
  }

  // Find document by ID
  async findById(id: string): Promise<T | null> {
    await this.ensureConnection();
    return await this.model.findById(id);
  }

  // Find documents with query options
  async find(options: {
    where?: FilterQuery<T>;
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<T[]> {
    await this.ensureConnection();
    
    let query = this.model.find(options.where || {});
    
    // Apply sorting
    if (options.sortBy) {
      const sortOrder = options.sortOrder === 'desc' ? -1 : 1;
      query = query.sort({ [options.sortBy]: sortOrder });
    }
    
    // Apply pagination
    if (options.offset) {
      query = query.skip(options.offset);
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    return await query.exec();
  }

  // Find all documents
  async findAll(): Promise<T[]> {
    await this.ensureConnection();
    return await this.model.find({});
  }

  // Find one document
  async findOne(where: FilterQuery<T>): Promise<T | null> {
    await this.ensureConnection();
    return await this.model.findOne(where);
  }

  // Update document by ID
  async update(id: string, updates: UpdateQuery<T>): Promise<T | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(id, updates, { new: true });
  }

  // Delete document by ID
  async delete(id: string): Promise<boolean> {
    await this.ensureConnection();
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }

  // Delete multiple documents
  async deleteMany(where: FilterQuery<T>): Promise<number> {
    await this.ensureConnection();
    const result = await this.model.deleteMany(where);
    return result.deletedCount || 0;
  }

  // Count documents
  async count(where?: FilterQuery<T>): Promise<number> {
    await this.ensureConnection();
    return await this.model.countDocuments(where || {});
  }
}

// Export specific database instances
export const blogDB = new MongoDBService<IBlogPost>(BlogPost);
export const projectDB = new MongoDBService<IProject>(Project);
export const settingsDB = new MongoDBService<ISiteSettings>(SiteSettings);
export const skillsDB = new MongoDBService<ISkills>(Skills);
export const userDB = new MongoDBService<IUser>(User);

// Export types for compatibility
export type {
  IBlogPost as BlogPost,
  IProject as Project,
  ISiteSettings as SiteSettings,
  ISkills as Skills,
  IUser as User
};
