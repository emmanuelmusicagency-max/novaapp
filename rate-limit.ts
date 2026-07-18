interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitEntry>();

/**
 * Simple fixed-window in-memory rate limiter, keyed by e.g. IP + route.
 * Suitable for a single-instance deployment; a production multi-instance
 * deployment should back this with Redis instead.
 */
export function checkRateLimit(
  key: string,
  maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 100),
  windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60000)
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt < now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
}

/** Extracts a best-effort client identifier from a request for rate limiting. */
export function getClientKey(request: Request, suffix: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  return `${ip}:${suffix}`;
}
