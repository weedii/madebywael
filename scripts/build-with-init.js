const { execSync } = require('child_process');
const { initializeDataFiles, createAdminUser } = require('./init-local-db.js');

async function buildWithInit() {
  try {
    console.log('🚀 Starting build process with database initialization...\n');
    
    // Initialize database with empty data (option 1)
    console.log('🗃️  Initializing database with empty data...');
    await initializeDataFiles(false); // false = empty data
    await createAdminUser();
    
    console.log('\n📦 Building the application...');
    // Run Next.js build
    execSync('next build', { stdio: 'inherit' });
    
    console.log('\n🎉 Build completed successfully!');
    
  } catch (error) {
    console.error('❌ Build process failed:', error.message);
    process.exit(1);
  }
}

// Run the build process
buildWithInit();
