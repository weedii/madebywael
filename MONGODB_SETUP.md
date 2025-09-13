# MongoDB Database Setup

This application now uses MongoDB as its database instead of local JSON files, making it suitable for production deployment on platforms like Vercel.

## Overview

The application uses MongoDB with Mongoose ODM for data persistence. All data is stored in MongoDB collections:

- `blogposts` - Blog posts
- `projects` - Portfolio projects  
- `sitesettings` - Site configuration
- `skills` - Technical skills data
- `users` - Admin users

## Getting Started

### 1. MongoDB Setup

You have several options for MongoDB hosting:

#### Option A: MongoDB Atlas (Recommended for Production)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string from the Atlas dashboard
4. It will look like: `mongodb+srv://username:password@cluster.mongodb.net/database`

#### Option B: Local MongoDB (Development)
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/madebywael`

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
# MongoDB Configuration (Required)
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/madebywael

# NextAuth Configuration (Required)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Admin User Configuration (Optional - has defaults)
ADMIN_EMAIL=admin@madebywael.com
ADMIN_PASSWORD=Admin123!
ADMIN_NAME=Wael Abidi
```

### 3. Initialize the Database

Run the initialization script to populate your MongoDB with sample data:

```bash
npm run init-db
# or
npm run setup
```

This will create:
- Default site settings
- Sample blog post
- Sample project
- Skills data
- Admin user account

### 4. Default Admin Credentials

The system creates a default admin user:

- **Email:** `admin@madebywael.com` (or your ADMIN_EMAIL)
- **Password:** `Admin123!` (or your ADMIN_PASSWORD)

## Database Schema

### Blog Posts
```typescript
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Projects
```typescript
interface Project {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
}
```

### Site Settings
```typescript
interface SiteSettings {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
}
```

### Skills
```typescript
interface Skills {
  _id: string;
  languages: string[];
  frameworksAndStack: string[];
  toolsAndServices: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Users
```typescript
interface User {
  _id: string;
  email: string;
  password: string; // hashed
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
  createdAt: Date;
  updatedAt: Date;
}
```

## API Usage

The database service provides a consistent API:

```typescript
import { blogDB, projectDB, userDB } from "@/lib/mongodb";

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

## Deployment

### Vercel Deployment

1. **Set Environment Variables in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add all the environment variables from your `.env.local`

2. **MongoDB Atlas Configuration:**
   - Ensure your MongoDB Atlas cluster allows connections from `0.0.0.0/0` (all IPs) for Vercel
   - Or add Vercel's IP ranges to your Atlas whitelist

3. **Deploy:**
   ```bash
   npm run build
   ```

### Other Platforms

The application will work on any platform that supports Node.js and can connect to MongoDB:

- **Railway:** Set environment variables in project settings
- **Heroku:** Use `heroku config:set` to set environment variables
- **DigitalOcean App Platform:** Configure environment variables in app spec
- **AWS/GCP/Azure:** Set environment variables in your deployment configuration

## Migration from Local Database

The migration from local JSON files to MongoDB is complete:

1. ✅ Local database files removed
2. ✅ MongoDB connection and models created
3. ✅ All API routes updated to use MongoDB
4. ✅ Authentication updated to use MongoDB
5. ✅ Initialization script created for sample data
6. ✅ Package.json scripts updated

## Backup & Recovery

### Backup
```bash
# Using mongodump (requires MongoDB tools)
mongodump --uri="your-mongodb-uri" --out=backup-folder

# Or use MongoDB Atlas automated backups
```

### Restore
```bash
# Using mongorestore
mongorestore --uri="your-mongodb-uri" backup-folder
```

## Performance

MongoDB provides excellent performance for portfolio websites:

- **Reads:** < 10ms with proper indexing
- **Writes:** < 50ms 
- **Scalability:** Handles thousands of concurrent users
- **Storage:** Efficient document storage with compression

## Troubleshooting

### Connection Issues
- Verify MONGODB_URI is correct
- Check network connectivity
- Ensure MongoDB Atlas IP whitelist includes your deployment platform

### Authentication Issues
- Verify admin credentials in environment variables
- Check if user exists in database
- Ensure password is properly hashed

### Performance Issues
- Add indexes for frequently queried fields
- Use MongoDB Atlas performance advisor
- Monitor slow queries

Perfect for production deployment on Vercel and other platforms!
