import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMenu, createMenuManual } from "../services/fifo";
import { toast } from "sonner";

export function useMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMenu,
    onSuccess: (data: any) => {
      queryClient.setQueryData(["fifo", "priority-batches"], (old: any) => {
        if (!old || !Array.isArray(old)) return [data];
        if (old.some((item) => item.id === data.id)) return old;
        return [data, ...old];
      });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });
      queryClient.invalidateQueries({ queryKey: ["inventory", "items"], type: "all" });
      queryClient.invalidateQueries({ queryKey: ["fifo", "priority-batches"] });
      queryClient.invalidateQueries({ queryKey: ["fifo", "menu"] });
      queryClient.invalidateQueries({ queryKey: ["fifo", "batches"] });
      queryClient.invalidateQueries({
        queryKey: ["forecast"],
        type: "all"
      });
      queryClient.invalidateQueries({
        queryKey: ["forecast-ingredient-usage"],
        type: "all"
      });
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(` ${error.message}`);
    },
  });
}

export function useMenuManual() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMenuManual,
    onSuccess: (data: any) => {
      queryClient.setQueryData(["fifo", "priority-batches"], (old: any) => {
        if (!old || !Array.isArray(old)) return [data];
        if (old.some((item) => item.id === data.id)) return old;
        return [data, ...old];
      });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });
      queryClient.invalidateQueries({ queryKey: ["inventory", "items"], type: "all" });
      queryClient.invalidateQueries({ queryKey: ["fifo", "priority-batches"] });
      queryClient.invalidateQueries({ queryKey: ["fifo", "menu"] });
      queryClient.invalidateQueries({ queryKey: ["fifo", "batches"] });
      queryClient.invalidateQueries({
        queryKey: ["forecast"],
        type: "all"
      });
      queryClient.invalidateQueries({
        queryKey: ["forecast-ingredient-usage"],
        type: "all"
      });
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      const fixedMessage = error.message.replace(
        /(\d+(?:[.,]\d+))(?=\s*kg)/g,
        (match) => {
          const clean = match.replace(",", ".");
          return parseInt(clean, 10).toString();
        }
      );

      toast.error(fixedMessage);
    },
  });
}
