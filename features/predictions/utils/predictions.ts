import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

export const iconMap: Record<string, React.ElementType> = {
  RED: AlertCircle,
  YELLOW: Clock,
  GREEN: CheckCircle2,
};

export const colorMap: Record<string, string> = {
  RED: "text-red-500",
  YELLOW: "text-yellow-500",
  GREEN: "text-green-500",
};

export const descriptionMap: Record<string, string> = {
  Krisis: "Perlu tindakan segera",
  Waspada: "Pantau dalam 48 jam",
  Aman: "Tidak perlu tindakan",
};

