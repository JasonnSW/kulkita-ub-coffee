"use server";

import { apiClient } from "@/lib/api-client";
import { cookies } from "next/headers";

export async function getNotifications() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const res = await apiClient("/api/notifications", "GET", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

export async function getNotificationsSummary() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const res = await apiClient(`/api/notifications/summary`, "GET", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}}`,
    },
  });
  return res;
}

export async function markAllNotificationAsRead() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const res = await apiClient(`/api/notifications/mark-all-read`, "PUT", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

export async function deleteNotification(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const res = await apiClient(`/api/notifications/${id}`, "DELETE", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

export async function markNotificationAsRead(notificationIds: string[]) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const res = await apiClient(`/api/notifications/mark-read`, "PUT", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(notificationIds), 
  });
  return res;
}
