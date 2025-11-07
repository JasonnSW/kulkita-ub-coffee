"use client";

import { useState } from "react";
import { Search, AlertTriangle, AlertCircle, Info, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetNotifications } from "@/features/notification/queries/notification";
import {
  useDeleteNotification,
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
} from "@/features/notification/mutations/notification";
import {
  Notification,
  NotificationApiResponse,
} from "@/features/notification/dto/notification";
import {
  getBadgeVariant,
  getCategoryLabel,
  transformApiResponseToNotifications,
} from "@/features/notification/utils/notification";

export default function AllNotifications() {
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [activeTab, setActiveTab] = useState("all");
  const [readNotifications, setReadNotifications] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const { data: apiResponse } = useGetNotifications() as {
    data: NotificationApiResponse;
  };

  const notifications: Notification[] = apiResponse?.content
    ? transformApiResponseToNotifications(apiResponse.content).map((n) => ({
        ...n,
        isRead: readNotifications.includes(n.id) || n.isRead,
      }))
    : [];

  const { mutate: markAsRead } = useMarkNotificationAsRead();

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

  const filteredNotifications = notifications
    .filter((notification) => {
      if (activeTab === "unread" && notification.isRead) return false;
      if (activeTab === "read" && !notification.isRead) return false;

      if (
        searchQuery &&
        !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !notification.message
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        !notification.batchId.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (filterType !== "all" && notification.type !== filterType)
        return false;

      if (filterCategory !== "all" && notification.category !== filterCategory)
        return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.date.getTime() - a.date.getTime();
        case "oldest":
          return a.date.getTime() - b.date.getTime();
        case "type":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

  const handleSelectNotification = (notificationId: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
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

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const readCount = notifications.filter((n) => n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari notifikasi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    <SelectItem value="critical">Kritis</SelectItem>
                    <SelectItem value="warning">Peringatan</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="batch_status">Status Batch</SelectItem>
                    <SelectItem value="inventory">Inventaris</SelectItem>
                    <SelectItem value="expiry">Kadaluarsa</SelectItem>
                    <SelectItem value="system">Sistem</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Terbaru</SelectItem>
                    <SelectItem value="oldest">Terlama</SelectItem>
                    <SelectItem value="type">Berdasarkan Tipe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="all">
              Semua ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Belum Dibaca ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="read">Sudah Dibaca ({readCount})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={
                selectedNotifications.length === filteredNotifications.length &&
                filteredNotifications.length > 0
              }
              onCheckedChange={handleSelectAll}
              className="border-green-600 data-[state=checked]:bg-green-600"
            />
            <span className="text-sm text-gray-600">
              {selectedNotifications.length > 0
                ? `${selectedNotifications.length} dari ${filteredNotifications.length} dipilih`
                : `Pilih semua (${filteredNotifications.length})`}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            Menampilkan {filteredNotifications.length} dari{" "}
            {notifications.length} notifikasi
          </span>
        </div>

        <div className="space-y-2">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                !notification.isRead
                  ? "border-l-4 border-l-blue-500 bg-blue-50/30"
                  : ""
              } ${
                selectedNotifications.includes(notification.id)
                  ? "ring-2 ring-green-500 bg-green-50"
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
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {isSelectionMode && (
                    <Checkbox
                      checked={selectedNotifications.includes(notification.id)}
                      onCheckedChange={() =>
                        handleSelectNotification(notification.id)
                      }
                      className="mt-1 border-green-600 data-[state=checked]:bg-green-600"
                    />
                  )}

                  {getIcon(notification.type)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3
                        className={`font-medium ${
                          !notification.isRead
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <Badge
                        variant={getBadgeVariant(notification.type)}
                        className="text-xs"
                      >
                        {notification.batchId}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(notification.category)}
                      </Badge>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p
                      className={`text-sm mb-2 ${
                        !notification.isRead ? "text-gray-700" : "text-gray-600"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>{notification.timestamp}</span>
                      <span>•</span>
                      <span>
                        {notification.date.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <Card className="p-8 text-center">
            <div className="text-gray-400 mb-2">
              <Bell className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada notifikasi
            </h3>
            <p className="text-gray-600">
              Tidak ada notifikasi yang sesuai dengan filter yang dipilih.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
