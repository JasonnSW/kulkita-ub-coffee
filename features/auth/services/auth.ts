import { z } from "zod";
import {
  codeFormSchema,
  inviteFormSchema,
  loginSchema,
  registerSchema,
  unitSchema,
} from "../schemas/auth";
import { apiClient } from "@/lib/api-client";

type LoginResponse = {
  token: string;
  type: string;
  email: string;
  username: string;
  role: string;
};

export async function login(payload: z.infer<typeof loginSchema>) {
  const res = await apiClient<LoginResponse>("/api/auth/login", "POST", {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  return res;
}

export async function register(payload: z.infer<typeof registerSchema>) {
  const res = await apiClient("/api/auth/register", "POST", {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  return res;
}

export async function createUnit(payload: z.infer<typeof unitSchema>) {
  const res = await fetch("/api/create-unit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Gagal membuat unit");

  return res.json();
}

export async function codeForm(payload: z.infer<typeof codeFormSchema>) {
  const res = await fetch("/api/code-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Gagal mengirim kode");

  return res.json();
}

export async function InviteForm(payload: z.infer<typeof inviteFormSchema>) {
  const res = await fetch("/api/invite-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Gagal mengirim undangan");

  return res.json();
}
