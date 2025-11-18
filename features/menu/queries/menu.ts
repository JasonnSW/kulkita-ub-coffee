"use client";

import { useQuery } from "@tanstack/react-query";
import { getMenus } from "../services/menu";

export function useMenus() {
  return useQuery({
    queryKey: ["menus"],
    queryFn: () => getMenus(),
  });
}
