# Made by Wael - Portfolio Website

A modern personal website and portfolio built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and a **local file-based database system**. This project features a beautiful responsive design, blog capabilities, project showcase, and a full-featured admin dashboard for content management.

## Features

- **Responsive Design**: Beautiful and accessible design that works on all devices
- **Dark/Light Mode**: Toggle between dark and light theme
- **Local Database**: File-based storage system (no external database required)
- **Admin Dashboard**: Full-featured admin area for content management
- **Authentication**: Secure login for admin access
- **Animations**: Smooth animations using Framer Motion
- **SEO-friendly**: Optimized for search engines
- **Accessibility**: Built with accessibility in mind
- **Zero Setup**: No database configuration needed

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Next.js API routes
- **Database**: Local file-based system (JSON files)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS, shadcn/ui
- **Deployment**: Ready for deployment on any platform

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- **No database setup required!** 🎉

### Quick Start (6 Steps)

1. **Clone the repository**

   ```bash
   git clone https://github.com/weedii/madebywael.git
   cd madebywael
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Admin User Configuration
   ADMIN_EMAIL=admin@madebywael.com
   ADMIN_PASSWORD=Admin123!
   ADMIN_NAME=Admin User

   # NextAuth (Required)
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Initialize the local database**

   ```bash
   npm run init-db
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser

That's it! The app is now running with a local file-based database.

### Local Database System

The app uses a **local file-based database** that stores data as JSON files in the `data/` directory:

```
data/
├── blogs.json      # Blog posts
├── projects.json   # Portfolio projects
├── contact.json    # Contact information
├── personal.json   # Personal info & bio
├── social.json     # Social media links
├── settings.json   # Site settings
├── users.json      # Admin users
└── *.backup-*      # Automatic backups
```

**Advantages:**

- ✅ Zero setup - no database server needed
- ✅ Works on any hosting platform
- ✅ Version control friendly
- ✅ Fast performance with caching
- ✅ Automatic backups
- ✅ TypeScript support

## Admin Dashboard

The admin dashboard is accessible at `/admin`.

### Default Login Credentials

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email:** `admin@madebywael.com`
- **Password:** `Admin123!`

### Admin Features

- **📊 Dashboard**: Overview of content statistics and recent activity
- **📝 Blog Management**: Create, edit, and delete blog posts with rich content editor
- **💼 Project Management**: Manage portfolio projects with image galleries and tech tags
- **⚙️ Site Settings**: Update personal info, contact details, social links, and site configuration
- **👤 User Management**: Admin account settings and user profiles
- **🔄 Real-time Updates**: Changes reflect immediately on the live site
- **💾 Automatic Backups**: All changes are automatically backed up

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router pages
│   ├── page.tsx           # Homepage
│   ├── blog/              # Blog system
│   ├── projects/          # Projects showcase
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── common/            # Shared layout components
│   ├── admin/             # Admin dashboard components
│   ├── auth/              # Authentication components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
│   ├── local-db/          # Local database system
│   │   ├── index.ts       # Main LocalDB class
│   │   ├── types.ts       # TypeScript interfaces
│   │   └── utils.ts       # Helper functions
│   └── utils.ts           # General utilities
└── types/                 # TypeScript type definitions

data/                      # Local database files
├── blogs.json            # Blog posts data
├── projects.json         # Projects data
├── contact.json          # Contact information
├── personal.json         # Personal info & bio
├── social.json           # Social media links
├── settings.json         # Site settings
└── users.json            # Admin users

scripts/                   # Setup scripts
├── init-local-db.js      # Database initialization
└── setup-admin.js        # Admin user setup
```

## Customization

### Site Information

Update site information in the admin dashboard under Settings > Site Settings.

### Theme

The site uses a customized theme based on shadcn/ui. Colors and styles can be modified in:

- `tailwind.config.ts`: Tailwind configuration
- `src/app/globals.css`: Global styles
- `components.json`: shadcn/ui configuration

## Deployment

This project works on **any hosting platform** since it doesn't require a database server:

### Vercel (Recommended)

1. Push your repository to GitHub
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Add environment variables (only `NEXTAUTH_SECRET` is required)
5. Deploy

### Other Platforms

- **Netlify**: Works out of the box
- **VPS/Dedicated Server**: Perfect for persistent data storage
- **Docker**: Mount `data/` directory as volume for persistence

### Important Notes

- **Vercel/Netlify**: Data resets on each deployment (stateless)
- **VPS/Docker**: Data persists between deployments
- **Local Development**: Data always persists

### Environment Variables for Production

```env
NEXTAUTH_SECRET=your-production-secret-key
NEXTAUTH_URL=https://your-domain.com
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
ADMIN_NAME=Your Name
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Database API Usage

For developers who want to understand the local database system:

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

// Find published blogs
const publishedBlogs = await blogDB.find({
  where: { published: true },
  sortBy: "createdAt",
  sortOrder: "desc",
  limit: 10,
});

// Update a blog
const updated = await blogDB.update("blog-id", {
  title: "Updated Title",
  content: "Updated content...",
});

// Delete a blog
await blogDB.delete("blog-id");
```

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [NextAuth.js](https://next-auth.js.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Contact

For questions or feedback, please reach out to me at [contact@madebywael.com](mailto:contact@madebywael.com)
