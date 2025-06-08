import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db/connection";
import { User } from "@/lib/db/models";
import bcrypt from "bcryptjs";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Please define the NEXTAUTH_SECRET environment variable");
}

// Default admin credentials from environment variables
const defaultAdminEmail = process.env.ADMIN_EMAIL || "admin@madebywael.com";
const defaultAdminPassword = process.env.ADMIN_PASSWORD || "Admin123!";
const defaultAdminName = process.env.ADMIN_NAME || "Admin User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Check if using default admin credentials
          if (credentials.email === defaultAdminEmail && 
              credentials.password === defaultAdminPassword) {
            // Return the default admin user
            return {
              id: "default-admin-id",
              email: defaultAdminEmail,
              name: defaultAdminName,
              role: "admin",
            };
          }

          // If not default admin, check database
          await connectToDatabase();
          
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            return null;
          }
          
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          
          if (!isPasswordValid) {
            return null;
          }
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          
          // If database connection fails but using default admin credentials
          if (credentials.email === defaultAdminEmail && 
              credentials.password === defaultAdminPassword) {
            // Return the default admin user even if DB is down
            return {
              id: "default-admin-id",
              email: defaultAdminEmail,
              name: defaultAdminName,
              role: "admin",
            };
          }
          
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }; 