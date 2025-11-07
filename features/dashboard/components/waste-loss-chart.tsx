"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { getDashboardWasteLoss } from "../services/dashboard"

const wasteLossData = [
  { name: "Sayur", value: 50, color: "#4CAF50" },
  { name: "Buah", value: 20, color: "#2196F3" },
  { name: "Protein", value: 25, color: "#FFC107" },
  { name: "Bahan Pokok", value: 5, color: "#9C27B0" },
]

const dummyCauses = [
  "Penyimpanan tidak sesuai",
  "Kadaluarsa",
  "Kesalahan pengiriman",
  "Kelebihan stok",
  "Tidak terpakai dalam resep",
  "Kerusakan fisik",
];

const colors = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1",
  "#a4de6c", "#d0ed57", "#d66b6b", "#ffbb28", "#00C49F",
  "#FF8042", "#BCA0DC"
]


export function WasteLossChart() {
  const { data, isLoading } = useQuery<any, any, any>({
    queryKey: ["dashboard", "waste-loss"],
    queryFn: getDashboardWasteLoss,
  })
  console.log(data)

  const wasteLoss = data?.criticalBatches ?? []

  const wasteLossChart = wasteLoss.map((item: any, index: number) => ({
    name: item.ingredientName,
    value: Number(((item.estimatedValue / data.totalEstimatedValue) * 100).toFixed(1)),
    color: colors[index % colors.length],
  }))

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Distribusi Waste per Kategori</CardTitle>
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
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  className="text-xs"
                  data={wasteLossChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {wasteLossChart.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Penyebab Waste per Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[300px] overflow-y-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Persentase</TableHead>
                  <TableHead>Penyebab Umum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wasteLoss.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.ingredientName}</TableCell>
                    <TableCell>{item.weightKg} kg</TableCell>
                    <TableCell>
                      {((item.estimatedValue / data.totalEstimatedValue) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell>{dummyCauses[index % dummyCauses.length]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
