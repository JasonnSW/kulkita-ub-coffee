import { apiClient } from "@/lib/api-client";

export async function getDashboardSummary() {
  const res = await apiClient("/api/dashboard/summary", "GET");
  return res;
}

export async function getDashboardExpiryAlerts() {
  const res = await apiClient("/api/dashboard/expiry-alerts", "GET");
  return res;
}

export async function getDashboardWasteLoss() {
  const res = await apiClient("/api/analytics/potential-food-loss", "GET");
  return res;
}

