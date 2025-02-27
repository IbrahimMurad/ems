import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// JWT token verification functions
function isTokenExpired(token: string): boolean {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(Buffer.from(base64, "base64").toString());
    return payload.exp * 1000 < Date.now();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return true;
  }
}

async function refreshAccessToken(
  refreshToken: string
): Promise<string | null> {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.access;
    }
    return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Skip middleware for login page and API routes
  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname.startsWith("/api/")
  ) {
    return response;
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // If no tokens, redirect to login
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if access token is expired
  if (isTokenExpired(accessToken as string)) {
    // Try to refresh the token
    const newAccessToken = await refreshAccessToken(refreshToken);

    if (!newAccessToken) {
      // If refresh failed, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Update the access token cookie
    response.cookies.set({
      name: "accessToken",
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Match all routes except _next, api, login, assets, etc.
    "/((?!_next/static|_next/image|favicon.ico|login|api).*)",
  ],
};
