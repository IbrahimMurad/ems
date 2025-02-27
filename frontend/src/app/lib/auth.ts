"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export async function setTokens(access: string, refresh: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_KEY, access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60, // 1 hour
  });
  cookieStore.set(REFRESH_TOKEN_KEY, refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60, // 24 hours
  });
}

export async function getTokens() {
  const cookieStore = await cookies();
  const verifyResponse = await fetch(
    "http://127.0.0.1:8000/api/token/verify/",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get(ACCESS_TOKEN_KEY)?.value}`,
      },
    }
  );
  if (verifyResponse.ok) {
    return {
      accessToken: cookieStore.get(ACCESS_TOKEN_KEY)?.value,
      refreshToken: cookieStore.get(REFRESH_TOKEN_KEY)?.value,
    };
  }

  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;
  if (!refreshToken) {
    return null;
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
    return {
      accessToken: access,
      refreshToken,
    };
  }
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
