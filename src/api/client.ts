const rawBase = import.meta.env.VITE_API_URL as string | undefined;

if (!rawBase || rawBase.trim() === "") {
  throw new Error(
    "[api/client] VITE_API_URL is not set. " +
      "Add it to your .env file (e.g. VITE_API_URL=http://localhost:4000)."
  );
}

export const API_BASE = rawBase.replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  token?: string | null;
  body?: unknown;
}

export async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", token, body } = options;

  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(
      "Network error — unable to reach the server. Check your connection.",
      0
    );
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  if (!response.ok) {
    let message = `Request failed (${response.status} ${response.statusText})`;
    try {
      const errBody = (await response.json()) as { message?: string };
      if (errBody.message) {
        message = errBody.message;
      }
    } catch {
    }
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}
