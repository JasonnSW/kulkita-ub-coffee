"use server"

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getIngredientUsage, getPredictionForecastDashboard } from "../services/forecast";
import { getForecastDateRange } from "../utils/get-date-range";

export async function getDehydratedForecastState() {
  const queryClient = new QueryClient();

  const { from, to, lastFrom, lastTo } = getForecastDateRange();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["forecast", from.toISOString(), to.toISOString()],
      queryFn: () => getPredictionForecastDashboard(from, to),
    }),
    queryClient.prefetchQuery({
      queryKey: ["forecast-ingredient-usage", lastFrom.toISOString(), lastTo.toISOString()],
      queryFn: () => getIngredientUsage(lastFrom, lastTo),
    }),
  ]);

  return {
    state: dehydrate(queryClient),
  };
}
