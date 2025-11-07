"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { getAllByBatchesPriority, getAllFifoItems } from "../services/fifo";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  calculateProgress,
  mapUrgencyToColor,
  mapUrgencyToLabel,
} from "../utils/fifo";

export function FifoRecommendation() {
  const { data = [], isLoading } = useQuery<any, any, any>({
    queryKey: ["fifo", "priority-batches"],
    queryFn: getAllByBatchesPriority,
    placeholderData: (previousData: any) => previousData,
  });

  function isValidDate(date: any) {
    return date && !isNaN(new Date(date).getTime());
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        Berikut adalah rekomendasi penggunaan bahan berdasarkan prinsip FIFO
        (First In, First Out) dan tanggal kadaluarsa. Bahan dengan prioritas
        lebih tinggi harus digunakan terlebih dahulu.
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
              <TableHead>Sisa Waktu</TableHead>
              <TableHead className="min-w-[120px]">Prioritas</TableHead>
              <TableHead>Masa Simpan</TableHead>
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
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Tidak ada data.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item: any, index: number) => {
                const progress = calculateProgress(
                  item.entryDate,
                  item.expiryDate
                );
                return (
                  <TableRow
                    key={
                      item.id ??
                      item.batchCode ??
                      `${item.ingredientName}-${index + 1}`
                    }
                  >
                    <TableCell className="font-medium">
                      {item.batchCode}
                    </TableCell>
                    <TableCell>{item.ingredientName}</TableCell>
                    <TableCell>
                      {item.weight} {item.unit}
                    </TableCell>
                    <TableCell>
                      {isValidDate(item.entryDate)
                        ? format(new Date(item.entryDate), "dd MMMM yyyy", {
                            locale: id,
                          })
                        : "-"}
                    </TableCell>

                    <TableCell>
                      {isValidDate(item.expiryDate)
                        ? format(new Date(item.expiryDate), "dd MMMM yyyy", {
                            locale: id,
                          })
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {item.daysUntilExpiry < 0
                        ? "Kadaluarsa"
                        : `${item.daysUntilExpiry} hari`}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={mapUrgencyToColor(item.urgencyLevel)}
                      >
                        {mapUrgencyToLabel(item.urgencyLevel)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={progress} className="h-2" />
                        <span className="text-xs">{progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        Gunakan
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
