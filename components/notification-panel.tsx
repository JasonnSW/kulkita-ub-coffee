"use client";

import { useState, useMemo } from "react";
import {
  Bell,
  X,
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useGetNotifications } from "@/features/notification/queries/notification";
import {
  useDeleteNotification,
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
} from "@/features/notification/mutations/notification";

interface ApiNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  read: boolean;
  readAt: string | null;
  referenceId: string;
  referenceType: string;
  sentViaFirebase: boolean;
  createdAt: string;
  typeIcon: string;
  priorityColor: string;
}

interface NotificationPanelProps {
  onShowAllNotifications?: () => void;
}

export function NotificationPanel({
  onShowAllNotifications,
}: NotificationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: apiResponse } = useGetNotifications();
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const [deletedNotifications, setDeletedNotifications] = useState<string[]>(
    []
  );
  const [readNotifications, setReadNotifications] = useState<string[]>([]);

  const router = useRouter();
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: markAllAsRead } = useMarkAllNotificationsAsRead();
  const { mutate: deleteNotification } = useDeleteNotification();

  const notifications = useMemo(() => {
    const content = (apiResponse as any)?.content;
    if (!content) return [];

    return content
      .filter(
        (notification: any) => !deletedNotifications.includes(notification.id)
      )
      .map((notification: any) => ({
        id: notification.id,
        type: mapPriorityToType(notification.priority),
        title: notification.title,
        message: notification.message,
        timestamp: formatTimestamp(notification.createdAt),
        batchId: notification.referenceId,
        isRead:
          notification.read || readNotifications.includes(notification.id),
        priority: notification.priority,
        typeIcon: notification.typeIcon,
        priorityColor: notification.priorityColor,
      }));
  }, [apiResponse, deletedNotifications, readNotifications]);

  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  function mapPriorityToType(
    priority: string
  ): "critical" | "warning" | "info" {
    switch (priority) {
      case "CRITICAL":
      case "HIGH":
        return "critical";
      case "MEDIUM":
        return "warning";
      case "LOW":
      default:
        return "info";
    }
  }

  function formatTimestamp(timestamp: string): string {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - notificationTime.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Baru saja";
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} hari yang lalu`;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "critical":
        return "destructive";
      case "warning":
        return "secondary";
      default:
        return "default";
    }
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === notifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(notifications.map((n: any) => n.id));
    }
  };

  const handleSelectNotification = (notificationId: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const handleMarkAsRead = () => {
    if (selectedNotifications.length === 0) return;

    setReadNotifications((prev) => [...prev, ...selectedNotifications]);
    setSelectedNotifications([]);
    setIsSelectionMode(false);

    if (selectedNotifications.length === notifications.length) {
      markAllAsRead(undefined, {
        onSuccess: () => {
          console.log("All notifications marked as read successfully");
        },
        onError: (error) => {
          setReadNotifications((prev) =>
            prev.filter((id) => !selectedNotifications.includes(id))
          );
          console.error("Failed to mark all notifications as read:", error);
        },
      });
    } else {
      markAsRead(selectedNotifications, {
        onSuccess: () => {
          console.log("Selected notifications marked as read successfully");
        },
        onError: (error) => {
          setReadNotifications((prev) =>
            prev.filter((id) => !selectedNotifications.includes(id))
          );
          console.error(
            "Failed to mark selected notifications as read:",
            error
          );
        },
      });
    }
  };

  const handleDeleteSelected = () => {
    if (selectedNotifications.length === 0) return;

    setDeletedNotifications((prev) => [...prev, ...selectedNotifications]);
    setSelectedNotifications([]);
    setIsSelectionMode(false);

    const failedDeletions: string[] = [];

    selectedNotifications.forEach((notificationId) => {
      deleteNotification(notificationId, {
        onSuccess: () => {
          console.log(`Notification ${notificationId} deleted successfully`);
        },
        onError: (error) => {
          failedDeletions.push(notificationId);
          console.error(
            `Failed to delete notification ${notificationId}:`,
            error
          );
        },
      });
    });

    if (failedDeletions.length > 0) {
      setTimeout(() => {
        setDeletedNotifications((prev) =>
          prev.filter((id) => !failedDeletions.includes(id))
        );
      }, 1000);
    }
  };

  const handleSingleDelete = (notificationId: string) => {
    setDeletedNotifications((prev) => [...prev, notificationId]);

    deleteNotification(notificationId, {
      onSuccess: () => {
        console.log(`Notification ${notificationId} deleted successfully`);
      },
      onError: (error) => {
        setDeletedNotifications((prev) =>
          prev.filter((id) => id !== notificationId)
        );
        console.error(
          `Failed to delete notification ${notificationId}:`,
          error
        );
      },
    });
  };

  const handleSingleMarkAsRead = (notificationId: string) => {
    setReadNotifications((prev) => [...prev, notificationId]);

    markAsRead([notificationId], {
      onSuccess: () => {
        console.log(
          `Notification ${notificationId} marked as read successfully`
        );
      },
      onError: (error) => {
        setReadNotifications((prev) =>
          prev.filter((id) => id !== notificationId)
        );
        console.error(
          `Failed to mark notification ${notificationId} as read:`,
          error
        );
      },
    });
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedNotifications([]);
  };

  if (!apiResponse) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="relative bg-green-50 border-green-200 hover:bg-green-100"
          disabled
        >
          <Bell className="h-4 w-4 text-green-600" />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-green-50 border-green-200 hover:bg-green-100"
      >
        <Bell className="h-4 w-4 text-green-600" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-96 max-h-[500px] overflow-hidden shadow-lg border-green-200 z-50">
          <CardHeader className="pb-3 bg-green-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle className="text-lg text-green-800">
                  Notifikasi
                </CardTitle>
                {isSelectionMode && (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={
                        selectedNotifications.length === notifications.length
                      }
                      onCheckedChange={handleSelectAll}
                      className="border-green-600 data-[state=checked]:bg-green-600"
                    />
                    <span className="text-sm text-green-700">
                      {selectedNotifications.length > 0
                        ? `${selectedNotifications.length} dipilih`
                        : "Pilih Semua"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSelectionMode}
                  className="h-8 px-2 text-green-600 hover:bg-green-100"
                >
                  {isSelectionMode ? "Batal" : "Pilih"}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 text-green-600 hover:bg-green-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {isSelectionMode && selectedNotifications.length > 0 && (
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAsRead}
                  className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50"
                >
                  <Check className="h-3 w-3" />
                  Tandai Dibaca
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                  Hapus
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent className="p-0 max-h-80 overflow-y-auto">
            <div className="space-y-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Tidak ada notifikasi</p>
                </div>
              ) : (
                notifications.slice(0, 5).map((notification: any) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors group ${
                      !notification.isRead ? "bg-blue-50/30" : ""
                    } ${
                      selectedNotifications.includes(notification.id)
                        ? "bg-green-50"
                        : ""
                    }`}
                    onClick={() => {
                      if (isSelectionMode) {
                        handleSelectNotification(notification.id);
                      } else if (!notification.isRead) {
                        handleSingleMarkAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {isSelectionMode && (
                        <Checkbox
                          checked={selectedNotifications.includes(
                            notification.id
                          )}
                          onCheckedChange={() =>
                            handleSelectNotification(notification.id)
                          }
                          className="mt-1 border-green-600 data-[state=checked]:bg-green-600"
                        />
                      )}
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p
                            className={`text-sm font-medium truncate ${
                              !notification.isRead
                                ? "text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <Badge
                            variant={getBadgeVariant(notification.type)}
                            className="text-xs"
                          >
                            {notification.priority}
                          </Badge>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p
                          className={`text-sm mb-2 ${
                            !notification.isRead
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400">
                          {notification.timestamp}
                        </p>
                      </div>
                      {!isSelectionMode && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSingleDelete(notification.id);
                          }}
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 text-center border-t">
              <Button
                variant="ghost"
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => {
                  setIsOpen(false);
                  onShowAllNotifications?.();
                  router.push("/dashboard/notification");
                }}
              >
                Lihat Semua Notifikasi
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
