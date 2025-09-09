import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// In production, store these in environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Simple credential check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set a simple token cookie (in production, use JWT)
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin-token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
