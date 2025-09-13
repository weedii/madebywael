const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is required!');
  console.error('Please set MONGODB_URI in your .env file');
  process.exit(1);
}

// Sample data for initialization
const sampleData = {
  settings: {},

  blog: {},

  skills: {
    languages: [
      "JavaScript", "TypeScript", "Python", "Java", "Go"
    ],
    frameworksAndStack: [
      "React", "Next.js", "Node.js", "Spring Boot", "FastAPI", "Express.js"
    ],
    toolsAndServices: [
      "Docker", "Git/GitHub", "AWS", "MongoDB", "PostgreSQL", "Redis"
    ]
  },

  project: {},

  user: {
    email: process.env.ADMIN_EMAIL || 'admin@madebywael.com',
    password: process.env.ADMIN_PASSWORD || 'Admin123!',
    role: 'admin',
    fullName: process.env.ADMIN_NAME || 'Wael Abidi',
    publicEmail: 'abidiw293@gmail.com',
    phoneNumber: '+216 54052999',
    location: 'Tunis, Tunisia',
    profilePicture: '/me.jpg',
    bio: 'Full-stack developer passionate about creating beautiful and functional web applications.',
    githubUrl: 'https://github.com/weedii',
    linkedinUrl: 'https://linkedin.com/in/waelabidi',
    xUrl: 'https://x.com/weedi_xD'
  }
};

// Define schemas
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  coverImage: { type: String },
  tags: [{ type: String }],
  published: { type: Boolean, default: false },
  publishedAt: { type: Date }
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
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
}, { timestamps: true });

const siteSettingsSchema = new mongoose.Schema({
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
}, { timestamps: true });

const skillsSchema = new mongoose.Schema({
  languages: [{ type: String }],
  frameworksAndStack: [{ type: String }],
  toolsAndServices: [{ type: String }]
}, { timestamps: true });

const userSchema = new mongoose.Schema({
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
}, { timestamps: true });

// Create models
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const Project = mongoose.model('Project', projectSchema);
const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
const Skills = mongoose.model('Skills', skillsSchema);
const User = mongoose.model('User', userSchema);

async function initializeMongoDB() {
  try {
    console.log('🚀 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Initialize SiteSettings
    if (Object.keys(sampleData.settings).length > 0) {
      const existingSettings = await SiteSettings.findOne();
      if (!existingSettings) {
        await SiteSettings.create(sampleData.settings);
        console.log('✅ Created site settings');
      } else {
        console.log('⏭️  Site settings already exist');
      }
    } else {
      console.log('⏭️  Skipping site settings (empty data)');
    }

    // Initialize Skills
    if (Object.keys(sampleData.skills).length > 0) {
      const existingSkills = await Skills.findOne();
      if (!existingSkills) {
        await Skills.create(sampleData.skills);
        console.log('✅ Created skills data');
      } else {
        console.log('⏭️  Skills data already exists');
      }
    } else {
      console.log('⏭️  Skipping skills (empty data)');
    }

    // Initialize sample blog post
    if (Object.keys(sampleData.blog).length > 0 && sampleData.blog.slug) {
      const existingBlog = await BlogPost.findOne({ slug: sampleData.blog.slug });
      if (!existingBlog) {
        await BlogPost.create(sampleData.blog);
        console.log('✅ Created sample blog post');
      } else {
        console.log('⏭️  Sample blog post already exists');
      }
    } else {
      console.log('⏭️  Skipping blog post (empty data)');
    }

    // Initialize sample project
    if (Object.keys(sampleData.project).length > 0 && sampleData.project.slug) {
      const existingProject = await Project.findOne({ slug: sampleData.project.slug });
      if (!existingProject) {
        await Project.create(sampleData.project);
        console.log('✅ Created sample project');
      } else {
        console.log('⏭️  Sample project already exists');
      }
    } else {
      console.log('⏭️  Skipping project (empty data)');
    }

    // Initialize admin user
    const existingUser = await User.findOne({ email: sampleData.user.email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(sampleData.user.password, 12);
      await User.create({
        ...sampleData.user,
        password: hashedPassword
      });
      console.log('✅ Created admin user');
      console.log(`📧 Admin email: ${sampleData.user.email}`);
      console.log(`🔑 Admin password: ${sampleData.user.password}`);
    } else {
      console.log('⏭️  Admin user already exists');
    }

    console.log('\n🎉 MongoDB initialization completed successfully!');
    console.log('\n📝 Admin credentials:');
    console.log(`   Email: ${sampleData.user.email}`);
    console.log(`   Password: ${sampleData.user.password}`);
    console.log('\n💡 You can change these in your environment variables:');
    console.log('   ADMIN_EMAIL=your-email@example.com');
    console.log('   ADMIN_PASSWORD=your-secure-password');
    console.log('   ADMIN_NAME=Your Name');

  } catch (error) {
    console.error('❌ MongoDB initialization failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run initialization if called directly
if (require.main === module) {
  initializeMongoDB();
}

module.exports = { initializeMongoDB };
