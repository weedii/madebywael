import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = 
    path === "/admin/login" ||
    !path.startsWith("/admin");

  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect logic
  if (isPublicPath && token && path === "/admin/login") {
    // If user is authenticated and trying to access login page, redirect to admin dashboard
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isPublicPath && !token) {
    // If user is not authenticated and trying to access protected route, redirect to login
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

// Configure paths that this middleware should run on
export const config = {
  matcher: ["/admin/:path*"],
}; 