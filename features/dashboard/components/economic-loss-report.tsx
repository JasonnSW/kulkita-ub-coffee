"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const economicLossData = [
  { bahan: "Ayam", nilai: 350000, fill: "hsl(var(--chart-1))" },
  { bahan: "Tomat", nilai: 120000, fill: "hsl(var(--chart-2))" },
  { bahan: "Bayam", nilai: 70000, fill: "hsl(var(--chart-3))" },
  { bahan: "Telur", nilai: 65000, fill: "hsl(var(--chart-4))" },
  { bahan: "Wortel", nilai: 45000, fill: "hsl(var(--chart-5))" },
];

export function EconomicLossReport() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Nilai Kerugian Ekonomi per Bahan</CardTitle>
          <Select defaultValue="bulanIni">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mingguIni">Minggu Ini</SelectItem>
              <SelectItem value="bulanIni">Bulan Ini</SelectItem>
              <SelectItem value="3bulan">3 Bulan Terakhir</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              nilai: { label: "Nilai Kerugian (Rp)", color: "#4CAF50" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={economicLossData}>
                <XAxis dataKey="bahan" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => `Rp ${value.toLocaleString()}`}
                />
                <Bar
                  dataKey="nilai"
                  fill="var(--color-nilai)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Kerugian Ekonomi</CardTitle>
        </CardHeader>

        <CardContent>
          <div
            className="
        flex flex-col gap-4
        sm:grid sm:grid-cols-3 sm:gap-6
        sm:[&>div]:border-l sm:[&>div]:pl-6
        sm:[&>div:first-child]:border-l-0 sm:[&>div:first-child]:pl-0
      "
          >
            <div className="space-y-1.5">
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                Total Kerugian Bulan Ini
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                Rp 1.250.000
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                Estimasi Porsi Makanan yang Hilang
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold">
                120 porsi
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                Perbandingan dengan Bulan Lalu
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-medium text-red-500">
                +15% (Rp 187.500)
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4">
            Lihat Riwayat Waste
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rekomendasi Pengurangan Food Loss</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Optimasi Penyimpanan Sayuran
                </div>
                <div className="text-xs text-muted-foreground">
                  Pindahkan sayuran hijau ke Kulkas 1 yang memiliki suhu lebih
                  rendah untuk memperpanjang masa simpan.
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Prioritaskan Penggunaan Tomat
                </div>
                <div className="text-xs text-muted-foreground">
                  Gunakan batch tomat TOMAT-20250520-K1-B dalam menu besok untuk
                  menghindari pembusukan.
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Evaluasi Jumlah Pembelian Ayam
                </div>
                <div className="text-xs text-muted-foreground">
                  Kurangi pembelian ayam sebesar 15% untuk menghindari kelebihan
                  stok berdasarkan pola konsumsi.
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Pelatihan Staf FIFO</div>
                <div className="text-xs text-muted-foreground">
                  Lakukan pelatihan ulang tentang prinsip FIFO untuk memastikan
                  batch lama digunakan terlebih dahulu.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
