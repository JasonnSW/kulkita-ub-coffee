"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const accuracyData = [
  { month: "Jan", accuracy: 78 },
  { month: "Feb", accuracy: 82 },
  { month: "Mar", accuracy: 85 },
  { month: "Apr", accuracy: 87 },
  { month: "Mei", accuracy: 91 },
]

const factorData = [
  { factor: "Suhu Penyimpanan", importance: 85, fill: "hsl(var(--chart-1))" },
  { factor: "Usia Bahan", importance: 75, fill: "hsl(var(--chart-2))" },
  { factor: "Kelembapan", importance: 65, fill: "hsl(var(--chart-3))" },
  { factor: "Kondisi Awal", importance: 55, fill: "hsl(var(--chart-4))" },
  { factor: "Jenis Bahan", importance: 45, fill: "hsl(var(--chart-5))" },
]

const predictionData = [
  {
    name: "Bayam",
    actual: 2.5,
    predicted: 2.3,
  },
  {
    name: "Tomat",
    actual: 4.0,
    predicted: 3.8,
  },
  {
    name: "Wortel",
    actual: 5.0,
    predicted: 4.7,
  },
  {
    name: "Kangkung",
    actual: 2.0,
    predicted: 1.8,
  },
  {
    name: "Ayam",
    actual: 3.0,
    predicted: 3.2,
  },
]

export function PredictionModelInsights() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Performa Model Prediksi</CardTitle>
              <CardDescription>Akurasi model prediksi pembusukan bahan</CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Akurasi: 91%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-dvh">
            <ChartContainer
              config={{
                accuracy: {
                  label: "Akurasi (%)",
                  color: "#4CAF50",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyData}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="var(--color-accuracy)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Faktor Penentu Pembusukan</CardTitle>
            <CardDescription>Tingkat pengaruh faktor terhadap prediksi pembusukan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-dvh">
              <ChartContainer
                config={{
                  importance: {
                    label: "Tingkat Pengaruh (%)",
                    color: "#4CAF50",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={factorData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="factor" type="category" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="importance" fill="var(--color-importance)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Perbandingan Prediksi vs Aktual</CardTitle>
            <CardDescription>Masa simpan bahan (hari) prediksi vs aktual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-dvh">
              <ChartContainer
                config={{
                  actual: {
                    label: "Aktual (hari)",
                    color: "hsl(var(--chart-1))",
                  },
                  predicted: {
                    label: "Prediksi (hari)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={predictionData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="actual" fill="var(--color-actual)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="predicted" fill="var(--color-predicted)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Kalibrasi Model</CardTitle>
          <CardDescription>Catatan penyesuaian model prediksi pembusukan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <h4 className="text-sm font-semibold">Kalibrasi Suhu Penyimpanan</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Penyesuaian parameter suhu untuk meningkatkan akurasi prediksi sayuran hijau
                </p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  +5% Akurasi
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">20 Mei 2025</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <h4 className="text-sm font-semibold">Penambahan Data Historis</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Penambahan 500+ data historis pembusukan untuk meningkatkan performa model
                </p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  +3% Akurasi
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">15 Mei 2025</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <h4 className="text-sm font-semibold">Optimasi Algoritma</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Penyesuaian algoritma untuk meningkatkan kecepatan prediksi real-time
                </p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  +40% Kecepatan
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">10 Mei 2025</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
