const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

// Data directory path
const DATA_DIR = path.join(process.cwd(), 'data');

// Generate unique ID
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Add timestamps to entity
function addTimestamps(entity) {
  const now = new Date();
  return {
    id: entity.id || generateId(),
    ...entity,
    updatedAt: now,
    createdAt: now,
  };
}

// Default data for each collection
const defaultData = {
  contact: [
    addTimestamps({
      email: "contact@madebywael.com",
      phone: "+1 (555) 123-4567",
      location: "Your City, Country",
      businessHours: "Monday - Friday, 9 AM - 6 PM EST",
    })
  ],
  
  personal: [
    addTimestamps({
      name: "Wael",
      bio: "Full-stack developer passionate about creating beautiful and functional web applications. I love working with modern technologies and solving complex problems.",
      profilePicture: "/images/profile.jpg",
      skills: [
        "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
        "Python", "MongoDB", "PostgreSQL", "Tailwind CSS", "Git"
      ],
      experience: "5+ years of experience in web development, specializing in React and Node.js applications."
    })
  ],
  
  social: [
    addTimestamps({
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      x: "https://x.com/yourusername",
      instagram: "https://instagram.com/yourusername"
    })
  ],
  
  settings: [
    addTimestamps({
      title: "Made by Wael - Portfolio",
      description: "Personal portfolio and blog of Wael, a passionate full-stack developer.",
      favicon: "/favicon.ico",
      themeColors: {
        primary: "#3b82f6",
        secondary: "#64748b", 
        accent: "#06b6d4"
      },
      aboutPageContent: "Welcome to my portfolio! I'm a passionate developer who loves creating innovative solutions and beautiful user experiences.",
      resumeFile: "/files/resume.pdf"
    })
  ],
  
  blogs: [
    addTimestamps({
      title: "Welcome to My Blog",
      slug: "welcome-to-my-blog",
      content: "# Welcome to My Blog\n\nThis is my first blog post! I'm excited to share my thoughts and experiences about web development, technology, and more.\n\n## What to Expect\n\n- Technical tutorials and tips\n- Project showcases\n- Industry insights\n- Personal experiences\n\nStay tuned for more content!",
      excerpt: "Welcome to my blog where I share insights about web development and technology.",
      coverImage: "/images/blog/welcome-cover.jpg",
      tags: ["welcome", "introduction", "blog"],
      published: true,
      publishedAt: new Date()
    })
  ],
  
  skills: [
    addTimestamps({
      languages: [
        "JavaScript", "TypeScript", "Python", "Java", "Go"
      ],
      frameworksAndStack: [
        "React", "Next.js", "Node.js", "Spring Boot", "FastAPI", "Express.js"
      ],
      toolsAndServices: [
        "Docker", "Git/GitHub", "AWS", "MongoDB", "PostgreSQL", "Redis"
      ]
    })
  ],
  
  projects: [
    addTimestamps({
      title: "Portfolio Website",
      slug: "portfolio-website",
      description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS.",
      content: "# Portfolio Website\n\nThis portfolio website showcases my work and provides information about my skills and experience.\n\n## Technologies Used\n\n- Next.js 14\n- TypeScript\n- Tailwind CSS\n- Local file-based storage\n- NextAuth.js for authentication\n\n## Features\n\n- Responsive design\n- Dark/Light theme toggle\n- Blog system\n- Project showcase\n- Contact information\n- Admin panel for content management",
      coverImage: "/images/projects/portfolio-cover.jpg",
      images: [
        "/images/projects/portfolio-1.jpg",
        "/images/projects/portfolio-2.jpg"
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      featured: true,
      githubUrl: "https://github.com/yourusername/portfolio",
      liveUrl: "https://madebywael.com",
      published: true,
      publishedAt: new Date()
    })
  ]
};

// Initialize data files
async function initializeDataFiles() {
  try {
    console.log('🚀 Initializing local database...');
    
    // Ensure data directory exists
    try {
      await fs.access(DATA_DIR);
      console.log('✅ Data directory exists');
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
      console.log('📁 Created data directory');
    }
    
    // Initialize each collection
    for (const [collection, data] of Object.entries(defaultData)) {
      const filePath = path.join(DATA_DIR, `${collection}.json`);
      
      try {
        // Check if file exists and has content
        const stats = await fs.stat(filePath);
        const existingData = JSON.parse(await fs.readFile(filePath, 'utf8'));
        
        if (Array.isArray(existingData) && existingData.length > 0) {
          console.log(`⏭️  Skipping ${collection}.json (already has data)`);
          continue;
        }
      } catch (error) {
        // File doesn't exist or is invalid, we'll create it
      }
      
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ Initialized ${collection}.json with ${data.length} records`);
    }
    
    console.log('🎉 Local database initialization complete!');
    console.log('\n📝 Default admin credentials:');
    console.log('   Email: admin@madebywael.com');
    console.log('   Password: Admin123!');
    console.log('\n💡 You can change these in your environment variables:');
    console.log('   ADMIN_EMAIL=your-email@example.com');
    console.log('   ADMIN_PASSWORD=your-secure-password');
    
  } catch (error) {
    console.error('❌ Failed to initialize local database:', error);
    process.exit(1);
  }
}

// Create an admin user if none exists
async function createAdminUser() {
  try {
    const usersFilePath = path.join(DATA_DIR, 'users.json');
    let users = [];
    
    try {
      const existingData = await fs.readFile(usersFilePath, 'utf8');
      users = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist, start with empty array
    }
    
    // Check if admin user already exists
    const adminExists = users.some(user => user.email === 'admin@madebywael.com');
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin123!', 12);
      const adminUser = addTimestamps({
        email: 'admin@madebywael.com',
        password: hashedPassword,
        role: 'admin',
        fullName: 'Wael Abidi',
        publicEmail: 'abidiw293@gmail.com',
        phoneNumber: '+216 54052999',
        location: 'Tunis, Tunisia',
        profilePicture: '/me.jpg',
        bio: 'Full-stack developer passionate about creating beautiful and functional web applications.',
        githubUrl: 'https://github.com/weedii',
        linkedinUrl: 'https://linkedin.com/in/waelabidi',
        xUrl: 'https://x.com/weedi_xD'
      });
      
      users.push(adminUser);
      await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
      console.log('👤 Created default admin user');
    } else {
      console.log('⏭️  Admin user already exists');
    }
    
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
  }
}

// Run initialization
async function main() {
  await initializeDataFiles();
  await createAdminUser();
}

if (require.main === module) {
  main();
}

module.exports = { initializeDataFiles, createAdminUser };
