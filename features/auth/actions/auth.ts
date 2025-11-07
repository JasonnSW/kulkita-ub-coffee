"use server";

import { cookies } from "next/headers";
import { login } from "@/features/auth/services/auth";
import { z } from "zod";
import { loginSchema } from "@/features/auth/schemas/auth";

export async function loginAction(payload: z.infer<typeof loginSchema>) {
  const res = await login(payload);

  const cookieStore = await cookies();

  cookieStore.set("token", res.token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return {
    success: true,
  };

}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("token");

  return { success: true };
}
