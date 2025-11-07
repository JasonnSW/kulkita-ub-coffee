import { Notification } from "../dto/notification";

export function transformApiResponseToNotifications(
  apiData: any[]
): Notification[] {
  return apiData.map((item) => ({
    id: item.id,
    type: mapPriorityToType(item.priority),
    title: item.title,
    message: item.message,
    timestamp: formatTimeAgo(item.createdAt),
    batchId: item.referenceId,
    isRead: item.read,
    category: mapReferenceTypeToCategory(item.referenceType),
    date: new Date(item.createdAt),
  }));
}

export function mapPriorityToType(priority: string): "critical" | "warning" | "info" {
  switch (priority.toUpperCase()) {
    case "HIGH":
      return "critical";
    case "MEDIUM":
      return "warning";
    default:
      return "info";
  }
}

export function mapReferenceTypeToCategory(
  referenceType: string
): Notification["category"] {
  switch (referenceType) {
    case "BATCH":
      return "inventory";
    default:
      return "system";
  }
}

export function formatTimeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) return `${minutes} menit yang lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam yang lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari yang lalu`;
}

export const getBadgeVariant = (type: string) => {
  switch (type) {
    case "critical":
      return "destructive";
    case "warning":
      return "secondary";
    default:
      return "default";
  }
};

export const getCategoryLabel = (category: string) => {
  switch (category) {
    case "batch_status":
      return "Status Batch";
    case "inventory":
      return "Inventaris";
    case "system":
      return "Sistem";
    case "expiry":
      return "Kadaluarsa";
    default:
      return "Lainnya";
  }
};
