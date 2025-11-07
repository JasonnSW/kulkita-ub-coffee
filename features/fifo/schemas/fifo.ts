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
