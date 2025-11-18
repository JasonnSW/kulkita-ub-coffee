"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type CreateMenuPayload } from "../schema/menu";
import { createMenu } from "../services/menu";
import { toast } from "sonner";

export function useCreateMenu() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateMenuPayload) => {
      const t = toast.loading("Menambahkan menu...");
      try {
        const result = await createMenu(payload);
        toast.success("Menu berhasil ditambahkan", {
          id: t,
          description: "Data menu telah tersimpan.",
        });
        qc.invalidateQueries({ queryKey: ["menus"] });
        return result;
      } catch (err: any) {
        toast.error("Gagal menambahkan menu", {
          id: t,
          description: err?.message ?? "Terjadi kesalahan.",
        });
        throw err;
      }
    },
  });
}
