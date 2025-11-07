"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { getAllInventoryItems } from "@/features/inventory/services/inventory";
import { useQuery } from "@tanstack/react-query";
import { calculateProgress } from "@/features/fifo/utils/fifo";
import { formatDate } from "@/utils/format-date";

interface SpoilageAlertTableProps {
  status: "critical" | "warning" | "all";
}

export function SpoilageAlertTable({ status }: SpoilageAlertTableProps) {
  const { data: inventory, isLoading: isLoadingInventory } = useQuery<
    any,
    any,
    any
  >({
    queryKey: ["inventory", "items"],
    queryFn: getAllInventoryItems,
    placeholderData: (previousData: any) => previousData,
  });

  if (!inventory) return null;

  const transformedData = transformInventoryToAlertFormat(inventory);

  const filteredData =
    status === "all"
      ? transformedData
      : transformedData.filter((item) => {
          if (status === "critical") return item.status === "Kritis";
          if (status === "warning") return item.status === "Waspada";
          return false;
        });

  return (
    <div className="max-h-[500px] overflow-y-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode Batch</TableHead>
            <TableHead>Bahan</TableHead>
            <TableHead>Prediksi Pembusukan</TableHead>
            <TableHead>Konfidensi</TableHead>
            <TableHead>Faktor Utama</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Tindakan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow
              key={item.id}
              className={
                item.status === "Kritis"
                  ? "bg-red-50"
                  : item.status === "Waspada"
                  ? "bg-yellow-50"
                  : "bg-green-50"
              }
            >
              <TableCell className="font-medium">{item.kodeBatch}</TableCell>
              <TableCell>{item.bahan}</TableCell>
              <TableCell>{formatDate(item.expiryDate)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress
                    value={item.konfidensiBusuk}
                    className="h-2"
                    indicatorClassName={getProgressColor(item.status)}
                  />
                  <span className="text-xs">{item.konfidensiBusuk}%</span>
                </div>
              </TableCell>
              <TableCell>{item.faktorUtama}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    item.status === "Kritis"
                      ? "border-red-500 text-red-500"
                      : item.status === "Waspada"
                      ? "border-yellow-500 text-yellow-500"
                      : "border-green-500 text-green-500"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Buka menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Gunakan Segera</DropdownMenuItem>
                    <DropdownMenuItem>Redistribusi</DropdownMenuItem>
                    <DropdownMenuItem>Tandai Busuk</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
function transformInventoryToAlertFormat(inventory: any[]): any[] {
  return inventory.map((item) => {
    const status =
      item.freshnessStatus === "RED"
        ? "Kritis"
        : item.freshnessStatus === "YELLOW"
        ? "Waspada"
        : "Aman";

    const konfidensiBusuk = calculateProgress(item.entryDate, item.expiryDate);

    return {
      id: item.id,
      kodeBatch: item.batchCode,
      bahan: item.ingredientName,
      expiryDate: item.expiryDate,
      konfidensiBusuk,
      faktorUtama: "-",
      status,
    };
  });
}

function getProgressColor(status: string) {
  switch (status) {
    case "Kritis":
      return "bg-red-500";
    case "Waspada":
      return "bg-yellow-500";
    case "Aman":
      return "bg-green-500";
    default:
      return "bg-gray-200";
  }
}
