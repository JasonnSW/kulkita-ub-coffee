"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const usageData = [
  { date: "16 Mei", sayur: 45, buah: 30, protein: 35 },
  { date: "17 Mei", sayur: 50, buah: 25, protein: 40 },
  { date: "18 Mei", sayur: 35, buah: 35, protein: 30 },
  { date: "19 Mei", sayur: 40, buah: 30, protein: 35 },
  { date: "20 Mei", sayur: 45, buah: 25, protein: 40 },
  { date: "21 Mei", sayur: 55, buah: 30, protein: 45 },
  { date: "22 Mei", sayur: 50, buah: 35, protein: 40 },
];

const topUsageData = [
  { bahan: "Bayam", jumlah: 85, fill: "hsl(var(--chart-1))" },
  { bahan: "Tomat", jumlah: 75, fill: "hsl(var(--chart-2))" },
  { bahan: "Ayam", jumlah: 65, fill: "hsl(var(--chart-3))" },
  { bahan: "Telur", jumlah: 60, fill: "hsl(var(--chart-4))" },
  { bahan: "Wortel", jumlah: 50, fill: "hsl(var(--chart-5))" },
];

export function UsageTrends() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tren Penggunaan Harian</CardTitle>
          <Select defaultValue="7hari">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7hari">7 Hari Terakhir</SelectItem>
              <SelectItem value="14hari">14 Hari Terakhir</SelectItem>
              <SelectItem value="30hari">30 Hari Terakhir</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="max-h-dvh">
            <ChartContainer
              config={{
                sayur: {
                  label: "Sayur (kg)",
                  color: "hsl(var(--chart-1))",
                },
                buah: {
                  label: "Buah (kg)",
                  color: "hsl(var(--chart-2))",
                },
                protein: {
                  label: "Protein (kg)",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="sayur"
                    stroke="var(--color-sayur)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="buah"
                    stroke="var(--color-buah)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="protein"
                    stroke="var(--color-protein)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 w-full col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Bahan Paling Banyak Digunakan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-dvh">
              <ChartContainer
                config={{
                  jumlah: {
                    label: "Jumlah (kg)",
                    color: "#4CAF50",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topUsageData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="bahan" type="category" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="jumlah"
                      fill="var(--color-jumlah)"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Menu Paling Banyak Dimasak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Nasi Ayam Sayur</div>
                  <div className="text-xs text-muted-foreground">
                    450 porsi minggu ini
                  </div>
                </div>
                <div className="text-sm font-medium">30%</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Sup Ayam</div>
                  <div className="text-xs text-muted-foreground">
                    350 porsi minggu ini
                  </div>
                </div>
                <div className="text-sm font-medium">23%</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Capcay</div>
                  <div className="text-xs text-muted-foreground">
                    300 porsi minggu ini
                  </div>
                </div>
                <div className="text-sm font-medium">20%</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Telur Balado</div>
                  <div className="text-xs text-muted-foreground">
                    250 porsi minggu ini
                  </div>
                </div>
                <div className="text-sm font-medium">17%</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Tumis Kangkung</div>
                  <div className="text-xs text-muted-foreground">
                    150 porsi minggu ini
                  </div>
                </div>
                <div className="text-sm font-medium">10%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
