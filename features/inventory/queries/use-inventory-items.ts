"use server";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getAllInventoryItems } from "../services/inventory";

export async function getDehydratedInventoryState() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["inventory", "items"],
    queryFn: getAllInventoryItems,
  });

  return {
    state: dehydrate(queryClient),
  };
}
