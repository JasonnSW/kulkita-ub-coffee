import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  markAllNotificationAsRead,
  markNotificationAsRead,
} from "../services/notification";
import { toast } from "sonner";

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["notification", "mark-as-read"],
    mutationFn: (notificationIds: string[]) =>
    markNotificationAsRead(notificationIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });
      toast.success("Notification marked as read successfully");
    },
    onError: () => {
      toast.error("Failed to mark notification as read");
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["notification", "mark-all-as-read"],
    mutationFn: markAllNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });
      toast.success("Notification marked as read successfully");
    },
    onError: () => {
      toast.error("Failed to mark all notifications as read");
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["notification", "delete"],
    mutationFn: async (notificationId: string) => {
      await deleteNotification(notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "summary"] });
      toast.success("Notification deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete notification");
    },
  });
}
