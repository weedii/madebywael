# Made by Wael - Portfolio Website

A dynamic personal website and portfolio built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, MongoDB, and Framer Motion. This project features a beautiful responsive design, blog capabilities, project showcase, and a full-featured admin dashboard for content management.

## Features

- **Responsive Design**: Beautiful and accessible design that works on all devices
- **Dark/Light Mode**: Toggle between dark and light theme
- **Dynamic Content**: Blog posts and projects stored in MongoDB
- **Admin Dashboard**: Full-featured admin area for content management
- **Authentication**: Secure login for admin access
- **Animations**: Smooth animations using Framer Motion
- **SEO-friendly**: Optimized for search engines
- **Accessibility**: Built with accessibility in mind

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS, shadcn/ui
- **Deployment**: Ready for deployment on Vercel

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- MongoDB database (local or Atlas)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Admin User (for initial setup)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
ADMIN_NAME=Admin
```

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/madebywael.git
   cd madebywael
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Database Setup

The application will automatically create the necessary collections in your MongoDB database when you first run it.

To create an initial admin user, run the seed script:

```bash
npm run seed
```

## Admin Dashboard

The admin dashboard is accessible at `/admin`. Use the admin credentials you set in the environment variables to log in.

### Admin Features

- **Dashboard**: Overview of content statistics
- **Blog Management**: Create, edit, and delete blog posts
- **Project Management**: Create, edit, and delete projects
- **Site Settings**: Manage site information, contact details, and personal info
- **User Profile**: Update your account information

## Project Structure

- `src/app`: Next.js 14 App Router pages
- `src/components`: React components
  - `common`: Shared components
  - `blog`: Blog-related components
  - `projects`: Project-related components
  - `admin`: Admin dashboard components
- `src/lib`: Utility functions and database connection
- `src/app/api`: API routes for data operations

## Customization

### Site Information

Update site information in the admin dashboard under Settings > Site Settings.

### Theme

The site uses a customized theme based on shadcn/ui. Colors and styles can be modified in:

- `tailwind.config.ts`: Tailwind configuration
- `src/app/globals.css`: Global styles
- `components.json`: shadcn/ui configuration

## Deployment

This project is designed to be deployed on Vercel:

1. Push your repository to GitHub
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Add the environment variables
5. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth.js](https://next-auth.js.org/)

## Contact

For questions or feedback, please reach out to me at [contact@madebywael.com](mailto:contact@madebywael.com)
