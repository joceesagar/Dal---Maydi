import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Only apply to admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin-token")?.value;

    // If no token and not on login page, redirect to login
    if (!token && !request.nextUrl.pathname.includes("/admin/login")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // If token exists and on login page, redirect to admin dashboard
    if (token && request.nextUrl.pathname.includes("/admin/login")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
