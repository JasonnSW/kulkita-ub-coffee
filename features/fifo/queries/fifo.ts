"use server";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getAllByBatchesPriority, getAllByMenu, getAllFifoItems } from "../services/fifo";

export async function getDehydratedFifoState() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["fifo", "batches"],
      queryFn: getAllFifoItems,
    }),
    queryClient.prefetchQuery({
      queryKey: ["fifo", "priority-batches"],
      queryFn: getAllByBatchesPriority,
    }),
    queryClient.prefetchQuery({
      queryKey: ["fifo", "menu"],
      queryFn: getAllByMenu,
    }),
  ]);

  return {
    state: dehydrate(queryClient),
  };
}
