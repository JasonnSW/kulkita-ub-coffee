"use server";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import {
  getDashboardSummary,
  getDashboardExpiryAlerts,
  getDashboardWasteLoss,
} from "@/features/dashboard/services/dashboard";

export async function getDehydratedDashboardState() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["dashboard", "summary"],
      queryFn: getDashboardSummary,
    }),
    queryClient.prefetchQuery({
      queryKey: ["dashboard", "expiry-alerts"],
      queryFn: getDashboardExpiryAlerts,
    }),
    queryClient.prefetchQuery({
      queryKey: ["dashboard", "waste-loss"],
      queryFn: getDashboardWasteLoss,
    })
  ]);

  return {
    state: dehydrate(queryClient),
  };
}
