import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "dev-secret-change-me"
);
const JWT_REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret-change-me"
);

export interface SessionPayload {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
  [key: string]: unknown;
}

/** Hashes a plaintext password with bcrypt (10 salt rounds). */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/** Compares a plaintext password against a stored bcrypt hash. */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/** Signs a short-lived access token for an authenticated session. */
export async function signAccessToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN ?? "15m")
    .sign(JWT_SECRET);
}

/** Signs a long-lived refresh token used to mint new access tokens. */
export async function signRefreshToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_REFRESH_EXPIRES_IN ?? "30d")
    .sign(JWT_REFRESH_SECRET);
}

/** Verifies and decodes an access token, throwing if invalid/expired. */
export async function verifyAccessToken(token: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload as unknown as SessionPayload;
}

/** Verifies and decodes a refresh token, throwing if invalid/expired. */
export async function verifyRefreshToken(token: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
  return payload as unknown as SessionPayload;
}

/** Generates a numeric one-time password of the given length (default 6). */
export function generateOtp(length = 6): string {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
}

/** Generates a URL-safe token for email verification / password reset links. */
export function generateSecureToken(): string {
  return nanoid(48);
}

/** Returns an expiry Date `minutes` from now. */
export function minutesFromNow(minutes: number): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}
