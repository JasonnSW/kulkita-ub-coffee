export interface Notification {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  batchId: string;
  isRead: boolean;
  category: "batch_status" | "inventory" | "system" | "expiry";
  date: Date;
}

export interface NotificationApiItem {
  id: string;
  priority: string;
  title: string;
  message: string;
  createdAt: string;
  referenceId: string;
  read: boolean;
  referenceType: string;
}

export interface NotificationApiResponse {
  content: NotificationApiItem[];
}
