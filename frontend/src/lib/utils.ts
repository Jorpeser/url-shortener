import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_URL, NODE_ENV } from "@/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export async function api_fetch(route: string, method: HTTPMethod, payload?: Record<string, any>) {
  const options: RequestInit = {
    credentials: "include",
    method,
    headers: {
      "Content-Type": "application/json",
    }
  }

  if (method !== "GET" && method !== "DELETE") {
    options.body = JSON.stringify(payload)
  }

  try {
    const response = await fetch(`${API_URL}${route}`, options)

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`)
    }

    return await response.json()

  } catch (error) {
    if (NODE_ENV !== "production") {
      console.error("API Fetch error:", error)
    }
    throw Error("An error occurred communicating with server.")
  }
}
