"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  sub: string;
  email: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export async function getUserFromToken(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
}

export async function getProfileData() {
  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return {
    username: user.username,
    email: user.email,
    role: user.role,
  };
}
