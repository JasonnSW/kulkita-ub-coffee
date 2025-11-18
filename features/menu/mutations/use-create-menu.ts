"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type CreateMenuPayload } from "../schema/menu";
import { createMenu } from "../services/menu";
import { toast } from "sonner";
import { error } from "console";

export function useCreateMenu() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMenuPayload) => createMenu(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["menus"] });
      toast.success("Menu ditambah");
    },
    onError: () => {
      toast.error("Menu gagal ditambah");
    },
  });
}
