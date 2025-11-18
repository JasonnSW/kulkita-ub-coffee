"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type UpdateMenuPayload } from "../schema/menu";
import { updateMenu } from "../services/menu";
import { toast } from "sonner";

type UpdateArgs = {
  id: string;
  payload: UpdateMenuPayload;
};

export function useUpdateMenu() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateArgs) => updateMenu(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["menus"] });
      toast.success("Menu berhasil diperbarui", {
        description: "Perubahan menu telah disimpan.",
      });
    },
    onError: (err) => {
      toast.error("Menu gagal diperbarui", {
        description: err?.message ?? "Terjadi kesalahan, silakan coba lagi.",
      });
    },
  });
}
