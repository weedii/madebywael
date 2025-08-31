import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for API routes
  if (path.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Define public paths that don't require authentication
  const isPublicPath = path === "/admin/login" || !path.startsWith("/admin");

  // Get the session token with proper configuration
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });

  console.log(
    "Middleware - Path:",
    path,
    "Token:",
    !!token,
    "Public:",
    isPublicPath
  );

  // Redirect logic
  if (isPublicPath && token && path === "/admin/login") {
    // If user is authenticated and trying to access login page, redirect to admin dashboard
    console.log("Redirecting authenticated user from login to admin");
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isPublicPath && !token) {
    // If user is not authenticated and trying to access protected route, redirect to login
    console.log("Redirecting unauthenticated user to login");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

// Configure paths that this middleware should run on
export const config = {
  matcher: ["/admin/:path*"],
};
