"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { recordUsage } from "../services/usage";

export function useRecordUsage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recordUsage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usage"] });
      queryClient.invalidateQueries({ queryKey: ["inventory", "items"] });
      queryClient.invalidateQueries({ queryKey: ["inventory", "usage"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });
      toast.success("Penggunaan bahan berhasil dicatat.");
    },
    onError: (error) => {
      toast.error("Gagal mencatat penggunaan bahan. Silakan coba lagi.");
      console.error("Error recording usage:", error.message);
    },
  });
}
