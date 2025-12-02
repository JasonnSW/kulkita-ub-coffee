"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateBatchStatus } from "../services/inventory";
import { UpdateBatchStatusInput } from "../schemas/inventory";

export function useUpdateBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateBatchStatusInput) => updateBatchStatus(payload),
    onSuccess: (updatedBatch: any) => {
      queryClient.setQueryData(["inventory", "items"], (old: any) => {
        if (!old || !Array.isArray(old)) return old;

        return old.map((item) =>
          item.id === updatedBatch.id ||
          item.batchCode === updatedBatch.batchCode
            ? updatedBatch
            : item
        );
      });

      queryClient.invalidateQueries({ queryKey: ["inventory", "items"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });

      toast.success("Batch berhasil diperbarui.");
    },
    onError: () => {
      toast.error("Gagal memperbarui batch. Silakan coba lagi.");
    },
  });
}
