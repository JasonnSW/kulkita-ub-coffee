import { format } from "date-fns";

export function formatDate(isoDate: string): string {
  const tanggal = new Date(isoDate);
  const hari = tanggal.getDate().toString().padStart(2, "0");
  const bulan = tanggal.toLocaleString("en-US", { month: "long" });
  const tahun = tanggal.getFullYear();

  return `${hari} ${bulan} ${tahun}`;
}

export function formatDateToString(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
