import { useQuery } from "@tanstack/react-query";
import {
  getNotifications,
  getNotificationsSummary,
} from "../services/notification";

export function useGetNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
}

export function useGetNotificationsSummary() {
  return useQuery({
    queryKey: ["notifications", "summary"],
    queryFn: getNotificationsSummary,
  });
}
