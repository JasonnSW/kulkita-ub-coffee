import { z } from "zod";

export const usageRecordSchema = z.object({
  batchCode: z.string(),
  usedWeight: z.number().positive(),
  usageType: z.enum(["MENU_COOKING", "PREPARATION", "SNACK", "OTHER"]),
  menuName: z.string().optional(),
  portionCount: z.number().int().positive().optional(),
  notes: z.string().optional(),
});

export type UsageRecord = z.infer<typeof usageRecordSchema>;
