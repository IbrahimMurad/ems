"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authenticatedUser } from "@/app/lib/definitions";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export async function setCookies(
  access: string,
  refresh?: string,
  user?: authenticatedUser
) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_KEY, access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60, // 15 minutes
  });
  if (refresh) {
    cookieStore.set(REFRESH_TOKEN_KEY, refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 24 * 60 * 60, // 7 days
    });
  }
  if (user) {
    cookieStore.set(USER_KEY, JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 24 * 60 * 60, // 7 days
    });
  }
}

export async function getCookies() {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get(ACCESS_TOKEN_KEY)?.value,
    refreshToken: cookieStore.get(REFRESH_TOKEN_KEY)?.value,
    user: JSON.parse(
      cookieStore.get(USER_KEY)?.value || "{}"
    ) as authenticatedUser,
  };
}

export async function getUser() {
  const { user } = await getCookies();
  return user;
}

// This is a server action that can safely modify cookies
export async function refreshAccessToken() {
  "use server";

  const { refreshToken } = await getCookies();

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
    await setCookies(access);
    return { success: true, access };
  } else {
    // If refresh fails, clear cookies and redirect to login
    const cookieStore = await cookies();
    cookieStore.delete(ACCESS_TOKEN_KEY);
    cookieStore.delete(REFRESH_TOKEN_KEY);
    cookieStore.delete(USER_KEY);
    redirect("/login");
  }
}

export async function request(
  url: string,
  method: string,
  data: object | undefined = undefined
): Promise<Response> {
  const { accessToken } = await getCookies();

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
  if (response.ok || response.status === 400 || response.status === 404) {
    return response;
  }

  if (response.status === 401) {
    // Token is invalid, middleware should have handled this
    // If we get here, the refresh token is likely invalid
    redirect("/login");
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
    const getUserRequest = await fetch("http://127.0.0.1:8000/api/me/", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    const user = await getUserRequest.json();
    await setCookies(access, refresh, user);
    redirect("/");
  } else {
    const { detail } = await response.json();
    return detail;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
  cookieStore.delete(USER_KEY);
  redirect("/login");
}
