import { NextResponse } from "next/server";

/** Shape of every successful JSON API response. */
export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, ...data }, { status });
}

/** Shape of every error JSON API response. */
export function apiError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ success: false, message, details }, { status });
}

/** Wraps a route handler so unexpected errors return a clean 500 response. */
export function withErrorHandling<Args extends unknown[]>(
  handler: (...args: Args) => Promise<Response>
) {
  return async (...args: Args): Promise<Response> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error("Unhandled API error:", error);
      return apiError("Internal server error", 500);
    }
  };
}
