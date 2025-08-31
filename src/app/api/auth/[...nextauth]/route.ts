import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userDB } from "@/lib/local-db";
import bcrypt from "bcryptjs";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Please define the NEXTAUTH_SECRET environment variable");
}

// Default admin credentials from environment variables
const defaultAdminEmail = process.env.ADMIN_EMAIL;
const defaultAdminPassword = process.env.ADMIN_PASSWORD;
const defaultAdminName = process.env.ADMIN_NAME;

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
          // FIRST: Check if using default admin credentials
          if (
            credentials.email === defaultAdminEmail &&
            credentials.password === defaultAdminPassword
          ) {
            console.log("✅ Default admin login successful");
            return {
              id: "default-admin-id",
              email: defaultAdminEmail,
              name: defaultAdminName,
              role: "admin",
            };
          }

          // SECOND: Check local file-based user storage
          console.log(
            "🔄 Attempting local file authentication for:",
            credentials.email
          );

          const user = await userDB.findOne({ email: credentials.email });

          if (!user) {
            console.log(
              "❌ User not found in local storage:",
              credentials.email
            );
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log("❌ Invalid password for user:", credentials.email);
            return null;
          }

          console.log("✅ Local file user login successful:", user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: user.role,
          };
        } catch (error) {
          console.error(
            "⚠️ Local file authentication failed:",
            (error as Error).message
          );

          // Fallback: If local file auth fails but using default admin credentials
          if (
            credentials.email === defaultAdminEmail &&
            credentials.password === defaultAdminPassword
          ) {
            console.log("✅ Fallback to default admin login");
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
