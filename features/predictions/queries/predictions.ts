"use server";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getFreshnessStatusSummary } from "../services/predictions";
import { getAllInventoryItems } from "@/features/inventory/services/inventory";

export async function getDehydratedPredictionState() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["prediction", "freshness-status-summary"],
    queryFn: getFreshnessStatusSummary,
  });

  await queryClient.prefetchQuery({
    queryKey: ["inventory", "items"],
    queryFn: getAllInventoryItems,
  });

  return {
    state: dehydrate(queryClient),
  };
}
