"use server";

import { apiClient } from "@/lib/api-client";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  CreateMenuPayload,
  createMenuSchema,
  MenuItem,
  menuItemSchema,
  UpdateMenuPayload,
  updateMenuSchema,
} from "../schema/menu";

export async function getMenus(): Promise<any> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  const res = await apiClient("/api/menus", "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res);
  return res;
}

export async function createMenu(payload: CreateMenuPayload): Promise<any> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const body = createMenuSchema.parse(payload);

  const res = await apiClient("/api/menus", "POST", {
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}

export async function updateMenu(
  id: string,
  payload: UpdateMenuPayload
): Promise<any> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const body = updateMenuSchema.parse(payload);

  const res = await apiClient(`/api/menus/${id}`, "PUT", {
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}

export async function deleteMenu(id: string): Promise<any> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  const res = await apiClient(`/api/menus/${id}`, "DELETE", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}
