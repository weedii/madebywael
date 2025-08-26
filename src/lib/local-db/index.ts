import { BaseEntity, QueryOptions } from "./types";
import {
  ensureDataDir,
  getDataFilePath,
  readJsonFile,
  writeJsonFile,
  createBackup,
  addTimestamps,
  matchesQuery,
  sortItems,
} from "./utils";

// Local database class for CRUD operations
export class LocalDB<T extends BaseEntity> {
  private collection: string;
  private filePath: string;
  private cache: T[] | null = null;
  private lastModified: number = 0;

  constructor(collection: string) {
    this.collection = collection;
    this.filePath = getDataFilePath(collection);
  }

  // Initialize and ensure data directory exists
  private async init(): Promise<void> {
    await ensureDataDir();
  }

  // Load data from file with caching
  private async loadData(): Promise<T[]> {
    await this.init();

    try {
      const stats = await import("fs").then((fs) =>
        fs.promises.stat(this.filePath)
      );
      const fileModified = stats.mtime.getTime();

      // Use cache if file hasn't been modified
      if (this.cache && fileModified <= this.lastModified) {
        return this.cache;
      }

      this.cache = await readJsonFile<T>(this.filePath);
      this.lastModified = fileModified;
      return this.cache;
    } catch (error) {
      // File doesn't exist yet, return empty array
      this.cache = [];
      this.lastModified = Date.now();
      return this.cache;
    }
  }

  // Save data to file
  private async saveData(data: T[]): Promise<void> {
    await this.init();

    // Create backup before writing
    try {
      await createBackup(this.filePath);
    } catch (error) {
      console.warn(`Backup creation failed for ${this.collection}:`, error);
    }

    await writeJsonFile(this.filePath, data);
    this.cache = data;
    this.lastModified = Date.now();
  }

  // Create a new record
  async create(entity: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const data = await this.loadData();
    const newEntity = addTimestamps(entity) as T;

    // Check for unique constraints (slug, email)
    if ("slug" in newEntity) {
      const existingBySlug = data.find(
        (item) =>
          "slug" in item && (item as any).slug === (newEntity as any).slug
      );
      if (existingBySlug) {
        throw new Error(
          `Record with slug '${(newEntity as any).slug}' already exists`
        );
      }
    }

    if ("email" in newEntity) {
      const existingByEmail = data.find(
        (item) =>
          "email" in item && (item as any).email === (newEntity as any).email
      );
      if (existingByEmail) {
        throw new Error(
          `Record with email '${(newEntity as any).email}' already exists`
        );
      }
    }

    data.push(newEntity);
    await this.saveData(data);
    return newEntity;
  }

  // Find record by ID
  async findById(id: string): Promise<T | null> {
    const data = await this.loadData();
    return data.find((item) => item.id === id) || null;
  }

  // Find records with query options
  async find(options: QueryOptions<T> = {}): Promise<T[]> {
    const data = await this.loadData();
    let results = data;

    // Apply where filter
    if (options.where) {
      results = results.filter((item) => matchesQuery(item, options.where!));
    }

    // Apply sorting
    if (options.sortBy) {
      results = sortItems(results, options.sortBy, options.sortOrder);
    }

    // Apply pagination
    if (options.offset) {
      results = results.slice(options.offset);
    }

    if (options.limit) {
      results = results.slice(0, options.limit);
    }

    return results;
  }

  // Find all records
  async findAll(): Promise<T[]> {
    return this.loadData();
  }

  // Find one record
  async findOne(where: Partial<T>): Promise<T | null> {
    const results = await this.find({ where, limit: 1 });
    return results[0] || null;
  }

  // Update record by ID
  async update(
    id: string,
    updates: Partial<Omit<T, "id" | "createdAt">>
  ): Promise<T | null> {
    const data = await this.loadData();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    // Check for unique constraints on update
    if ("slug" in updates && updates.slug) {
      const existingBySlug = data.find(
        (item) =>
          "slug" in item &&
          (item as any).slug === updates.slug &&
          item.id !== id
      );
      if (existingBySlug) {
        throw new Error(`Record with slug '${updates.slug}' already exists`);
      }
    }

    if ("email" in updates && updates.email) {
      const existingByEmail = data.find(
        (item) =>
          "email" in item &&
          (item as any).email === updates.email &&
          item.id !== id
      );
      if (existingByEmail) {
        throw new Error(`Record with email '${updates.email}' already exists`);
      }
    }

    const updatedEntity = addTimestamps(
      {
        ...data[index],
        ...updates,
      },
      true
    ) as T;

    data[index] = updatedEntity;
    await this.saveData(data);
    return updatedEntity;
  }

  // Delete record by ID
  async delete(id: string): Promise<boolean> {
    const data = await this.loadData();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    data.splice(index, 1);
    await this.saveData(data);
    return true;
  }

  // Delete multiple records
  async deleteMany(where: Partial<T>): Promise<number> {
    const data = await this.loadData();
    const toDelete = data.filter((item) => matchesQuery(item, where));
    const toKeep = data.filter((item) => !matchesQuery(item, where));

    if (toDelete.length === 0) {
      return 0;
    }

    await this.saveData(toKeep);
    return toDelete.length;
  }

  // Count records
  async count(where?: Partial<T>): Promise<number> {
    const data = await this.loadData();

    if (!where) {
      return data.length;
    }

    return data.filter((item) => matchesQuery(item, where)).length;
  }

  // Clear cache (useful for testing or force refresh)
  clearCache(): void {
    this.cache = null;
    this.lastModified = 0;
  }
}

// Export specific database instances
export * from "./types";

// Database instances for each collection
export const blogDB = new LocalDB<import("./types").BlogPost>("blogs");
export const projectDB = new LocalDB<import("./types").Project>("projects");
export const contactDB = new LocalDB<import("./types").ContactInfo>("contact");
export const personalDB = new LocalDB<import("./types").PersonalInfo>(
  "personal"
);
export const socialDB = new LocalDB<import("./types").SocialLinks>("social");
export const settingsDB = new LocalDB<import("./types").SiteSettings>(
  "settings"
);
export const userDB = new LocalDB<import("./types").User>("users");
