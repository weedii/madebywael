// Main export file for MongoDB database
export { blogDB, projectDB, settingsDB, skillsDB, userDB } from './database';
export type { BlogPost, Project, SiteSettings, Skills, User } from './database';
export { default as connectDB } from './connection';
