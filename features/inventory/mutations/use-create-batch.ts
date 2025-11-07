"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBatch } from "@/features/inventory/services/inventory";
import { toast } from "sonner";

export function useCreateBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBatch,
    onSuccess: (newBatch: any) => {
      queryClient.setQueryData(["inventory", "items"], (old: any) => {
        if (!old || !Array.isArray(old)) return [newBatch];
        if (old.some((item) => item.id === newBatch.id)) return old;
        return [newBatch, ...old];
      });
      console.log("New batch:", newBatch);
      queryClient.invalidateQueries({ queryKey: ["inventory", "items"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });

      toast.success("Bahan berhasil ditambahkan ke inventaris.");
    },
    onError: () => {
      toast.error("Gagal menambahkan bahan ke inventaris. Silakan coba lagi.");
    },
  });
}
