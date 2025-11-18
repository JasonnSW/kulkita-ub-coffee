import { z } from "zod";

export const menuFormSchema = z.object({
  menuId: z.string({
    required_error: "Pilih menu.",
  }),
  portionCount: z.string().min(1, {
    message: "Masukkan jumlah porsi.",
  }),
});

export const manualFormSchema = z.object({
  ingredientName: z.string({
    required_error: "Pilih bahan.",
  }),
  batchCode: z.string({
    required_error: "Pilih batch.",
  }),
  usedWeight: z.string().min(1, {
    message: "Masukkan jumlah yang digunakan.",
  }),
  satuan: z.string({
    required_error: "Pilih satuan.",
  }),
});

export type FifoBatch = {
  id: string;
  batchCode: string;
  ingredientName: string;
  weight: number;
  unit: string;
  pricePerKg: number;
  entryDate: string;
  expiryDate: string;
  storageLocation: string;
  freshnessStatus: string;
  daysUntilExpiry: number;
  urgencyLevel: string;
  notes: string;
};
