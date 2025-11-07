import { apiClient } from "@/lib/api-client";
import { inventorySchema } from "../schemas/inventory";
import { z } from "zod";

export async function createBatch(payload: z.infer<typeof inventorySchema>) {
  const res = await apiClient("/api/batches", "POST", {
    body: JSON.stringify(payload),
  });
  console.log("Batch created:", res);
  return res;
}

export async function getAllInventoryItems() {
  const res = await apiClient("/api/batches", "GET");
  // console.log("Fetched inventory items:", res);
  return res;
}
