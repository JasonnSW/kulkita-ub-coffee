"use server";

import { apiClient } from "@/lib/api-client";
import { cookies } from "next/headers";

export async function recordUsage(payload: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const res = await apiClient("/api/usage/record", "POST", {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return res;
}

