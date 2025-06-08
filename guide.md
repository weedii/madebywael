# 🧠 Personal Website Plan (Software Engineer Portfolio)

**Website Name Options:** `madebywael` | `made-by-wael`

This document outlines the structure, design, and tech stack for a dynamic personal website built using **Next.js 14.2.29**, **Tailwind CSS**, **shadcn/ui**, **TypeScript**, and **MongoDB**, focused on personal branding, technical blogging, and content management.

**Project Location:** Build the project in the `madebywael` subfolder within the current directory.

**Development Environment:** You will be running all command line operations and terminal commands on Powershell

---

## 🚀 Purpose

- Showcase my personal brand as a software engineer
- Share blog posts (technical articles, thoughts, etc.)
- Highlight selected projects with dynamic content management
- Include a short bio and contact links
- **Admin Interface**: Full CRUD operations for managing all website content
- **Dynamic Content Management**: Add, edit, delete projects and blog posts through admin panel

---

## 🧱 Tech Stack

- **Frontend**: Next.js (with App Router and src directory) 14.2.29
- **Animations**: Framer Motion for smooth and engaging animations
- **Content**: MDX for writing blog posts + Dynamic content from MongoDB
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: MongoDB for dynamic content storage (blogs, projects, settings, personal info)
- **Authentication**: NextAuth.js for admin authentication
- **Hosting**: Vercel (with MongoDB Atlas for database)
- **API**: Next.js API routes for CRUD operations

---

## 🗂️ Folder Structure (Next.js)

```bash
/app
  ├── page.tsx              # Home page
  ├── blog
  │   ├── page.tsx          # Blog list page
  │   └── [slug]/page.tsx   # Individual blog post page
  ├── projects
  │   └── page.tsx          # Projects showcase
  ├── about
  │   └── page.tsx          # About me
  ├── contact
  │   └── page.tsx          # Contact page
  ├── admin
  │   ├── page.tsx          # Admin dashboard
  │   ├── login/page.tsx    # Admin authentication
  │   ├── blogs
  │   │   ├── page.tsx      # Blog management
  │   │   ├── create/page.tsx # Create new blog
  │   │   └── edit/[id]/page.tsx # Edit blog
  │   ├── projects
  │   │   ├── page.tsx      # Project management
  │   │   ├── create/page.tsx # Create new project
  │   │   └── edit/[id]/page.tsx # Edit project
  │   └── settings
  │       ├── page.tsx      # Site settings management
  │       ├── contact/page.tsx # Contact info management
  │       ├── personal/page.tsx # Personal info & bio
  │       └── social/page.tsx # Social media links
  └── api
      ├── auth/[...nextauth]/route.ts # NextAuth configuration
      ├── blogs
      │   ├── route.ts      # GET/POST blogs
      │   └── [id]/route.ts # GET/PUT/DELETE specific blog
      ├── projects
      │   ├── route.ts      # GET/POST projects
      │   └── [id]/route.ts # GET/PUT/DELETE specific project
      └── settings
          ├── contact/route.ts # GET/PUT contact information
          ├── personal/route.ts # GET/PUT personal info & bio
          ├── social/route.ts # GET/PUT social media links
          └── site/route.ts # GET/PUT general site settings

## 🧭 Navigation

The site will have a responsive top navigation bar with links:

- `Home` → `/`
- `Blog` → `/blog`
- `Projects` → `/projects`
- `About` → `/about`
- `Contact` → `/contact`
- `Admin` → `/admin` (protected route for content management)

**Admin Navigation** (within admin panel):
- Dashboard → `/admin`
- Manage Blogs → `/admin/blogs`
- Manage Projects → `/admin/projects`
- Site Settings → `/admin/settings`
  - Contact Info → `/admin/settings/contact`
  - Personal Info → `/admin/settings/personal`
  - Social Links → `/admin/settings/social`

---

## 🎨 Design Guidelines

### 🎯 **Primary Focus: Universal UX (All Ages)**
- **Simplicity First**: Clean, intuitive interface that anyone can navigate easily
- **Large, Clear Elements**: Buttons and links are easily clickable/tappable
- **Obvious Navigation**: Clear menu structure with descriptive labels
- **Consistent Patterns**: Same interaction patterns throughout the site
- **Error Prevention**: Clear feedback and confirmation for actions

### 🎨 **Visual Design**
- **Style**: Clean, minimal, modern with beautiful yet accessible aesthetics
- **Color mode**: Fully functional Light/Dark mode toggle (persistent across sessions)
- **Color Contrast**: High contrast ratios for text readability (WCAG compliance)
- **Fonts**: Large, readable typography (minimum 16px base size)
  - Clear font choices (Inter, Open Sans, or similar accessible fonts)
  - Proper line height and letter spacing
- **Spacing**: Generous white space and breathing room between elements
- **Visual Hierarchy**: Clear content structure with proper headings and spacing

### ✨ **Creative Animations & Interactions**
- **Smooth Framer Motion animations** including:
  - Subtle page transitions and route changes
  - Gentle scroll-triggered animations
  - Playful hover effects and micro-interactions
  - Loading states and skeleton screens
  - Stagger animations for lists/grids
  - Creative but non-distracting visual effects
- **Interactive Elements**:
  - Engaging hover states with clear feedback
  - Satisfying click animations
  - Progress indicators for longer actions

### 📱 **Accessibility & Responsiveness**
- **Fully responsive** on ALL screen sizes (mobile, tablet, desktop, 4K)
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader Friendly**: Proper ARIA labels and semantic HTML
- **Focus Indicators**: Clear focus states for keyboard users
- **Motion Preferences**: Respect user's motion preferences (reduced motion support)

---

## 🔧 Key Features Required

### 🎯 Core Features
- **Universal UX Design**: Easy navigation for users of all ages and tech levels
- **Dynamic Content Management**: Full CRUD operations for blogs and projects
- **Admin Authentication**: Secure login for content management
- **Fully Accessible Design**: WCAG compliant with keyboard and screen reader support
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Persistent theme switching with high contrast
- **Creative Animations**: Smooth, engaging Framer Motion animations that enhance UX

### 🛠️ Admin Interface Features
- **Dashboard**: Overview of content statistics and quick actions
- **Blog Management**:
  - Create, edit, delete blog posts
  - Rich text editor with MDX support
  - Image upload and management
  - SEO metadata management
- **Project Management**:
  - Create, edit, delete projects
  - Image gallery for project screenshots
  - Technology tags and categorization
  - Project links (GitHub, live demo, etc.)
- **Site Settings Management**:
  - **Contact Information**: Email, phone number, location, business hours
  - **Personal Information**: Bio, skills, experience, profile picture
  - **Social Media Links**: GitHub, LinkedIn, Twitter(X now), Instagram, etc.
  - **Site Configuration**: Site title ("madebywael" branding), description, favicon, theme colors
  - **About Page Content**: Dynamic about section content
  - **Resume/CV Management**: Upload and manage resume files
- **Content Preview**: Preview changes before publishing
- **Bulk Operations**: Delete multiple items at once
- **Real-time Updates**: Changes reflect immediately on the live site

### 🔒 Security Features
- Protected admin routes with authentication
- Input validation and sanitization
- CSRF protection
- Rate limiting for API endpoints

---

## ✅ Next Steps

1. Use the existing empty Next.js project in the `madebywael` subfolder (App Router + Tailwind CSS + TypeScript + src directory already configured)
2. Install required dependencies (Framer Motion, MDX, NextAuth, MongoDB, shadcn/ui, etc..)
3. Set up MongoDB database with collections for blogs, projects, and site settings
4. Implement NextAuth.js for admin authentication
5. Create API routes for CRUD operations (blogs, projects, settings)
6. Start implementing the design and pages for all the app
7. Build admin interface with full content management
8. Set up MDX blog system with dynamic content
9. Implement Framer Motion animations
10. Design beautiful, responsive layout
```
