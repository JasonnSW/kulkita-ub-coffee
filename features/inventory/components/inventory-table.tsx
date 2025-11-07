"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllInventoryItems } from "../services/inventory";
import { useSerialThermal } from "@/hooks/use-serial-thermal";
import { formatRupiah } from "@/utils/format-currency";

interface InventoryTableProps {
  category?: "all" | "SAYURAN" | "BUAH" | "PROTEIN" | "BAHAN_POKOK";
}

export function InventoryTable({ category = "all" }: InventoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery<any, any, any>({
    queryKey: ["inventory", "items"],
    queryFn: getAllInventoryItems,
    placeholderData: (previousData: any) => previousData,
  });

  const { status, connect, printBatch, printBase64 } = useSerialThermal();

  const items = Array.isArray(data) ? data : [];

  const filteredData = items
    .filter((item: any) => {
      const matchesCategory =
        category === "all" ||
        (category === "SAYURAN" && item.category === "SAYURAN") ||
        (category === "BUAH" && item.category === "BUAH") ||
        (category === "PROTEIN" && item.category === "PROTEIN") ||
        (category === "BAHAN_POKOK" && item.category === "BAHAN_POKOK");

      const matchesSearch =
        item.batchCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ingredientName?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort(
      (a: any, b: any) =>
        new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
    );

  return (
    <div className="space-y-4 text-[11px] sm:text-xs md:text-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari batch atau bahan..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="max-h-[500px] overflow-y-auto border rounded-md">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[700px] md:min-w-0">
            <TableHeader className="hidden md:table-header-group">
              <TableRow>
                <TableHead>Kode Batch</TableHead>
                <TableHead className="w-14">Bahan</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Berat</TableHead>
                <TableHead>Tanggal Masuk</TableHead>
                <TableHead>Tanggal Expired</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : items && items.length > 0 ? (
                filteredData.map((item: any) => (
                  <TableRow
                    key={item.id}
                    className={
                      item.freshnessStatus === "RED"
                        ? "bg-red-50"
                        : item.freshnessStatus === "YELLOW"
                        ? "bg-yellow-50"
                        : "bg-green-100"
                    }
                  >
                    <TableCell className="font-medium">
                      {item.batchCode}
                    </TableCell>
                    <TableCell>{item.ingredientName}</TableCell>
                    <TableCell>{formatRupiah(item.pricePerKg)}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{`${item.weight} ${item.unit}`}</TableCell>
                    <TableCell>
                      {new Date(item.entryDate).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>
                      {new Date(item.expiryDate).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>{item.storageLocation}</TableCell>
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
                          <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                          <DropdownMenuItem>Gunakan</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Hapus</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Tidak ada data ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
