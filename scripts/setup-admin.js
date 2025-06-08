require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Check if required environment variables are set
const requiredEnvVars = ['MONGODB_URI', 'ADMIN_EMAIL', 'ADMIN_PASSWORD', 'ADMIN_NAME'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`Error: Missing environment variables: ${missingVars.join(', ')}`);
  console.error('Please check your .env.local file and ensure all required variables are set.');
  process.exit(1);
}

// Define User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "admin", enum: ["admin"] },
}, { timestamps: true });

// Create or connect to the database
async function setupAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Connected to MongoDB successfully');

    // Create User model
    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Check if admin user already exists
    const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingUser) {
      console.log(`Admin user with email ${process.env.ADMIN_EMAIL} already exists.`);
      console.log('If you want to update the user, first delete it from the database.');
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      
      // Create new admin user
      const newUser = new User({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        name: process.env.ADMIN_NAME,
        role: 'admin'
      });
      
      await newUser.save();
      console.log(`Admin user created successfully with email: ${process.env.ADMIN_EMAIL}`);
      console.log('You can now log in with these credentials in the admin panel.');
    }
  } catch (error) {
    console.error('Error setting up admin user:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the script
setupAdmin(); 