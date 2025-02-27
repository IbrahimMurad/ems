"use server";

import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export async function setTokens(access: string, refresh: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_KEY, access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 15, // 15 minutes
  });
  cookieStore.set(REFRESH_TOKEN_KEY, refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 5 * 24 * 60 * 60, // 7 days
  });
}

export async function getTokens() {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get(ACCESS_TOKEN_KEY)?.value,
    refreshToken: cookieStore.get(REFRESH_TOKEN_KEY)?.value,
  };
}

// This is a server action that can safely modify cookies
export async function refreshAccessToken() {
  "use server";

  const { refreshToken } = await getTokens();

  if (!refreshToken) {
    redirect("/login");
  }

  const refreshResponse = await fetch(
    "http://127.0.0.1:8000/api/token/refresh/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    }
  );

  if (refreshResponse.ok) {
    const { access } = await refreshResponse.json();
    await setTokens(access, refreshToken);
    return { success: true, access };
  } else {
    // If refresh fails, clear cookies and redirect to login
    const cookieStore = await cookies();
    cookieStore.delete(ACCESS_TOKEN_KEY);
    cookieStore.delete(REFRESH_TOKEN_KEY);
    redirect("/login");
  }
}

export async function request(
  url: string,
  method: string,
  data: object | undefined = undefined
): Promise<Response> {
  const { accessToken } = await getTokens();

  if (!accessToken) {
    redirect("/login");
  }

  // Make the request with the access token
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  // Handle various response cases
  if (response.ok || response.status === 400) {
    return response;
  }

  if (response.status === 401) {
    // Token is invalid, middleware should have handled this
    // If we get here, the refresh token is likely invalid
    redirect("/login");
  }

  if (response.status === 404) {
    notFound();
  }

  if (response.status === 403) {
    throw new Error("Forbidden");
  }

  throw new Error(`HTTP error ${response.status}`);
}

export async function login(email: string, password: string) {
  const response = await fetch("http://127.0.0.1:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { access, refresh } = await response.json();
    await setTokens(access, refresh);
    return true;
  } else {
    const { detail } = await response.json();
    return detail;
  }
}
