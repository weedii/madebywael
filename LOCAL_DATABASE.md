# Local File-Based Database System

This application now uses a local file-based database system instead of MongoDB, making it simpler to deploy and maintain.

## Overview

The local database system stores data in JSON files in the `data/` directory. Each data type has its own file:

- `blogs.json` - Blog posts
- `projects.json` - Portfolio projects
- `contact.json` - Contact information
- `personal.json` - Personal information and bio
- `social.json` - Social media links
- `settings.json` - Site settings and configuration
- `users.json` - Admin users

## Getting Started

### 1. Initialize the Database

Run the initialization script to set up default data:

```bash
npm run init-db
# or
npm run setup
```

This will create the `data/` directory and populate it with sample data.

### 2. Default Admin Credentials

The system creates a default admin user with these credentials:

- **Email:** `admin@madebywael.com`
- **Password:** `Admin123!`

You can customize these by setting environment variables:

```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
ADMIN_NAME=Your Name
```

## Database API

The local database provides a simple API for CRUD operations:

```typescript
import { blogDB, projectDB, userDB } from "@/lib/local-db";

// Create a new blog post
const newBlog = await blogDB.create({
  title: "My New Post",
  slug: "my-new-post",
  content: "Post content...",
  excerpt: "Brief description",
  tags: ["javascript", "react"],
  published: true,
});

// Find a blog by ID
const blog = await blogDB.findById("some-id");

// Find blogs with filters
const publishedBlogs = await blogDB.find({
  where: { published: true },
  sortBy: "createdAt",
  sortOrder: "desc",
  limit: 10,
});

// Update a blog
const updated = await blogDB.update("some-id", {
  title: "Updated Title",
  content: "Updated content...",
});

// Delete a blog
await blogDB.delete("some-id");
```

## Data Structure

Each record includes these standard fields:

- `id` - Unique identifier
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Blog Posts

```typescript
interface BlogPost {
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
```

### Projects

```typescript
interface Project {
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
```

## Features

### ✅ Advantages

- **No external database required** - Everything runs locally
- **Simple deployment** - Just copy files, no database setup
- **Version control friendly** - Data changes can be tracked
- **Fast performance** - In-memory caching with file persistence
- **Atomic operations** - File system provides atomicity
- **Automatic backups** - Creates backups on each write
- **Type safety** - Full TypeScript support

### 🔧 Technical Details

- **Caching:** Data is loaded into memory and cached until file changes
- **Concurrency:** File locking prevents data corruption
- **Backups:** Automatic backups are created before each write (keeps last 5)
- **Error Recovery:** Graceful handling of file system errors
- **Validation:** Unique constraints for slugs and emails

## File Structure

```
data/
├── blogs.json
├── projects.json
├── contact.json
├── personal.json
├── social.json
├── settings.json
├── users.json
└── *.backup-* (automatic backups)

src/lib/local-db/
├── index.ts      # Main LocalDB class and exports
├── types.ts      # TypeScript interfaces
└── utils.ts      # Helper functions
```

## Environment Variables

```env
# Admin credentials (optional - has defaults)
ADMIN_EMAIL=admin@madebywael.com
ADMIN_PASSWORD=Admin123!
ADMIN_NAME=Admin User

# NextAuth (required)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## Migration from MongoDB

The system automatically handles the transition from MongoDB:

1. ✅ Old MongoDB connection files removed
2. ✅ MongoDB dependencies uninstalled
3. ✅ Authentication updated to use local files
4. ✅ Same TypeScript interfaces maintained
5. ✅ Default data populated

## Deployment

Since the database is file-based:

1. **Vercel/Netlify:** Works out of the box (data resets on each deploy)
2. **VPS/Dedicated Server:** Persistent data storage
3. **Docker:** Mount `data/` directory as volume
4. **Local Development:** Data persists between restarts

## Backup & Recovery

### Manual Backup

```bash
# Backup data directory
cp -r data data-backup-$(date +%Y%m%d)

# Restore from backup
cp -r data-backup-20231201 data
```

### Automatic Backups

The system automatically creates `.backup-*` files before each write operation.

## Performance

Expected performance for typical portfolio use:

- **Reads:** < 1ms (cached)
- **Writes:** < 10ms (includes backup)
- **Storage:** ~1KB per blog post, ~2KB per project
- **Memory:** ~1MB for 100 blog posts + 50 projects

Perfect for personal portfolios and small websites!
