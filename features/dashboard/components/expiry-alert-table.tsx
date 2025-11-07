"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardExpiryAlerts } from "../services/dashboard";

export function ExpiryAlertTable() {
  const { data, isLoading } = useQuery<any, any, any>({
    queryKey: ["dashboard", "expiry-alerts"],
    queryFn: getDashboardExpiryAlerts,
  });
  const items = Array.isArray(data?.expiringToday) ? data.expiringToday : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Bahan Mendekati Kadaluarsa</h2>
        <Button variant="outline" size="sm">
          Lihat Semua
        </Button>
      </div>
      <div className="max-h-[500px] overflow-y-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode Batch</TableHead>
              <TableHead>Bahan</TableHead>
              <TableHead>Berat</TableHead>
              <TableHead>Tanggal Masuk</TableHead>
              <TableHead>Tanggal Expired</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item: any) => (
              <TableRow
                key={item.id}
                className={
                  item.freshnessStatus === "RED"
                    ? "bg-red-50"
                    : item.freshnessStatus === "Waspada"
                    ? "bg-yellow-50"
                    : ""
                }
              >
                <TableCell className="font-medium">{item.batchCode}</TableCell>
                <TableCell>{item.ingredientName}</TableCell>
                <TableCell>{item.weight}</TableCell>
                <TableCell>
                  {new Date(item.entryDate).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  {new Date(item.expiryDate).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      item.freshnessStatus === "RED"
                        ? "border-red-500 text-red-500"
                        : item.freshnessStatus === "YELLOW"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-green-500 text-green-500"
                    }
                  >
                    {item.freshnessStatus === "GREEN"
                      ? "Segar"
                      : item.freshnessStatus === "YELLOW"
                      ? "Waspada"
                      : "Kritis"}
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
                      <DropdownMenuItem>Gunakan</DropdownMenuItem>
                      <DropdownMenuItem>Redistribusi</DropdownMenuItem>
                      <DropdownMenuItem>Buang</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
