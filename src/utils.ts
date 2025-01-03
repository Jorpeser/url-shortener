import { NODE_ENV } from "../config";

/**
 * Function to check if an email is regex valid
 * @param {*} email string
 * @returns boolean
 */

export function isEmail(email: string) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function api_fetch(route: string, method: HTTPMethod, payload?: Record<string, any>) {
  const options: RequestInit = {
    credentials: "include",
    method,
    headers: {
      "Content-Type": "application/json",
    }
  };

  if (method !== "GET" && method !== "DELETE") {
    options.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(`route`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    if (NODE_ENV !== "production") {
      console.error("API Fetch error:", error);
    }
    throw Error("An error occurred communicating with server.");
  }
}
