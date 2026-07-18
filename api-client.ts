interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

/**
 * Thin wrapper around `fetch` for calling this app's own `/api/*` routes
 * from client components, with automatic JSON encoding/decoding and
 * typed error handling.
 */
export async function apiFetch<T>(url: string, options: ApiOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.message ?? "Request failed", res.status, data.details);
  }

  return data as T;
}

export const api = {
  get: <T>(url: string) => apiFetch<T>(url, { method: "GET" }),
  post: <T>(url: string, body?: unknown) => apiFetch<T>(url, { method: "POST", body }),
  put: <T>(url: string, body?: unknown) => apiFetch<T>(url, { method: "PUT", body }),
  patch: <T>(url: string, body?: unknown) => apiFetch<T>(url, { method: "PATCH", body }),
  delete: <T>(url: string) => apiFetch<T>(url, { method: "DELETE" }),
};
