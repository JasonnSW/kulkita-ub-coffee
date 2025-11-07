import { apiClient } from "@/lib/api-client";

export async function getFreshnessStatusSummary() {
  const res = await apiClient("/api/batches/freshness-summary", "GET");
  return res;
}
