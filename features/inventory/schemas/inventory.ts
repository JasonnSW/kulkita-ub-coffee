import { z } from "zod";

export const inventorySchema = z.object({
  ingredientName: z.string({
    required_error: "Nama bahan wajib diisi.",
  }),
  weight: z.string({
    required_error: "Berat bahan wajib diisi.",
    invalid_type_error: "Berat harus berupa angka.",
  }),
  unit: z.string({
    required_error: "Pilih satuan.",
  }),
  category: z.string({
    required_error: "Pilih kategori bahan.",
  }),
  pricePerKg: z.string({
    required_error: "Masukkan sumber bahan.",
  }),
  storageLocation: z.string({
    required_error: "Pilih lokasi penyimpanan.",
  }),
  notes: z.string().optional(),
});

export const updateBatchStatusSchema = z.object({
  batchCode: z.string().min(1, "Batch code wajib diisi"),
  status: z.enum(["ACTIVE", "EXPIRED", "DISCARDED"]),
  notes: z.string().optional().nullable(),
});

export type UpdateBatchStatusInput = z.infer<typeof updateBatchStatusSchema>;
