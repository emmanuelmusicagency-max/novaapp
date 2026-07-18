import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signAccessToken, verifyAccessToken, type SessionPayload } from "@/lib/auth";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "novabank_session";

/** Sets the httpOnly session cookie after a successful login/registration. */
export async function createSession(payload: SessionPayload) {
  const token = await signAccessToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

/** Clears the session cookie on logout. */
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/** Reads and verifies the current session from the request cookies, or null. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return await verifyAccessToken(token);
  } catch {
    return null;
  }
}

/** Server Component guard: redirects to /login if there is no valid session. */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

/** Server Component guard: redirects non-admins away from /admin routes. */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await requireSession();
  if (session.role !== "ADMIN") redirect("/dashboard");
  return session;
}
