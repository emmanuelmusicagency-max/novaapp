import { NextResponse, type NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "novabank_session";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
  "/verify-email",
  "/two-factor",
];

const PROTECTED_PREFIXES = ["/dashboard", "/wallet", "/invest", "/transactions", "/notifications", "/settings", "/admin"];

/**
 * Runs on every request. Redirects unauthenticated users away from
 * protected app/admin routes, and redirects authenticated users away from
 * the auth screens (login/register/etc) back into the app.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let isAuthenticated = false;
  let isAdmin = false;

  if (token) {
    try {
      const payload = await verifyAccessToken(token);
      isAuthenticated = true;
      isAdmin = payload.role === "ADMIN";
    } catch {
      isAuthenticated = false;
    }
  }

  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && isAuthenticated && !isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/wallet/:path*",
    "/invest/:path*",
    "/transactions/:path*",
    "/notifications/:path*",
    "/settings/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-otp",
    "/verify-email",
    "/two-factor",
  ],
};
