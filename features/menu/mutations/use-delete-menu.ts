"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteMenu } from "../services/menu";

export function useDeleteMenu() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const t = toast.loading("Menghapus menu...");
      try {
        const result = await deleteMenu(id);

        toast.success("Menu berhasil dihapus", {
          id: t,
          description: "Data menu telah dihapus dari daftar.",
        });

        qc.invalidateQueries({ queryKey: ["menus"] });

        return result;
      } catch (err: any) {
        toast.error("Gagal menghapus menu", {
          id: t,
          description: err?.message ?? "Terjadi kesalahan.",
        });
        throw err;
      }
    },
  });
}
