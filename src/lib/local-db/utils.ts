import { promises as fs } from "fs";
import path from "path";
import { BaseEntity } from "./types";

// Data directory path
export const DATA_DIR = path.join(process.cwd(), "data");

// Ensure data directory exists
export async function ensureDataDir(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get file path for a collection
export function getDataFilePath(collection: string): string {
  return path.join(DATA_DIR, `${collection}.json`);
}

// Read JSON file with error handling
export async function readJsonFile<T extends BaseEntity>(
  filePath: string
): Promise<T[]> {
  try {
    await fs.access(filePath);
    const data = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(data);

    // Ensure we always return an array
    if (!Array.isArray(parsed)) {
      console.warn(
        `Data file ${filePath} does not contain an array, initializing as empty array`
      );
      return [];
    }

    return parsed;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // File doesn't exist, return empty array
      return [];
    }
    throw new Error(
      `Failed to read data file ${filePath}: ${(error as Error).message}`
    );
  }
}

// Write JSON file with atomic operation
export async function writeJsonFile<T extends BaseEntity>(
  filePath: string,
  data: T[]
): Promise<void> {
  try {
    const tempPath = `${filePath}.tmp`;
    const jsonString = JSON.stringify(data, null, 2);

    // Write to temp file first
    await fs.writeFile(tempPath, jsonString, "utf8");

    // Atomically rename temp file to actual file
    await fs.rename(tempPath, filePath);
  } catch (error) {
    throw new Error(
      `Failed to write data file ${filePath}: ${(error as Error).message}`
    );
  }
}

// Create backup of data file
export async function createBackup(filePath: string): Promise<void> {
  try {
    const backupPath = `${filePath}.backup-${Date.now()}`;
    await fs.copyFile(filePath, backupPath);

    // Keep only the last 5 backups
    const dir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    const files = await fs.readdir(dir);

    const backupFiles = files
      .filter((file) => file.startsWith(`${fileName}.backup-`))
      .sort()
      .reverse();

    // Remove old backups beyond the 5 most recent
    for (const file of backupFiles.slice(5)) {
      await fs.unlink(path.join(dir, file));
    }
  } catch (error) {
    console.warn(`Failed to create backup for ${filePath}:`, error);
  }
}

// Add timestamps to entity
export function addTimestamps<T extends Partial<BaseEntity>>(
  entity: T,
  isUpdate = false
): T & BaseEntity {
  const now = new Date();
  const result = {
    ...entity,
    updatedAt: now,
  } as T & BaseEntity;

  if (!isUpdate) {
    result.createdAt = now;
    if (!result.id) {
      result.id = generateId();
    }
  }

  return result;
}

// Simple query matching
export function matchesQuery<T extends BaseEntity>(
  item: T,
  query: Partial<T>
): boolean {
  for (const [key, value] of Object.entries(query)) {
    const itemValue = (item as any)[key];

    if (value === undefined || value === null) {
      continue;
    }

    // Handle array contains for tags, technologies, etc.
    if (Array.isArray(itemValue) && typeof value === "string") {
      if (!itemValue.includes(value)) {
        return false;
      }
    }
    // Handle exact match
    else if (itemValue !== value) {
      return false;
    }
  }
  return true;
}

// Sort items
export function sortItems<T extends BaseEntity>(
  items: T[],
  sortBy?: keyof T,
  sortOrder: "asc" | "desc" = "desc"
): T[] {
  if (!sortBy) {
    return items;
  }

  return [...items].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    let comparison = 0;

    if (aVal < bVal) {
      comparison = -1;
    } else if (aVal > bVal) {
      comparison = 1;
    }

    return sortOrder === "desc" ? -comparison : comparison;
  });
}
