"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"

export function UsageAnalytics() {
  const topUsedMaterials = [
    { name: "Beras Premium", usage: 45, unit: "kg", trend: "up", percentage: 12 },
    { name: "Ayam Fillet", usage: 28, unit: "kg", trend: "up", percentage: 8 },
    { name: "Minyak Goreng", usage: 15, unit: "liter", trend: "down", percentage: -5 },
    { name: "Wortel", usage: 12, unit: "kg", trend: "up", percentage: 15 },
    { name: "Bawang Merah", usage: 8, unit: "kg", trend: "stable", percentage: 2 },
  ]

  const usageByMealType = [
    { type: "Makan Siang", percentage: 45, color: "bg-blue-500" },
    { type: "Sarapan", percentage: 30, color: "bg-yellow-500" },
    { type: "Snack", percentage: 20, color: "bg-purple-500" },
    { type: "Persiapan", percentage: 5, color: "bg-gray-500" },
  ]

  const efficiencyMetrics = [
    {
      title: "Efisiensi Penggunaan",
      value: "94%",
      target: "95%",
      status: "good",
      description: "Sesuai dengan rencana menu",
    },
    {
      title: "Waste Ratio",
      value: "2.1%",
      target: "< 3%",
      status: "good",
      description: "Di bawah target maksimal",
    },
    {
      title: "Stock Turnover",
      value: "8.5 hari",
      target: "7-10 hari",
      status: "good",
      description: "Dalam rentang optimal",
    },
    {
      title: "Forecast Accuracy",
      value: "87%",
      target: "> 85%",
      status: "warning",
      description: "Perlu peningkatan prediksi",
    },
  ]

  const weeklyTrends = [
    { day: "Senin", usage: 85, target: 90 },
    { day: "Selasa", usage: 92, target: 90 },
    { day: "Rabu", usage: 88, target: 90 },
    { day: "Kamis", usage: 95, target: 90 },
    { day: "Jumat", usage: 87, target: 90 },
    { day: "Sabtu", usage: 78, target: 80 },
    { day: "Minggu", usage: 82, target: 80 },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-red-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Analisis Penggunaan</h3>
        <Select defaultValue="week">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Minggu Ini</SelectItem>
            <SelectItem value="month">Bulan Ini</SelectItem>
            <SelectItem value="quarter">Kuartal Ini</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Efficiency Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {efficiencyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {getStatusIcon(metric.status)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-gray-600">Target: {metric.target}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Used Materials */}
        <Card>
          <CardHeader>
            <CardTitle>Bahan Paling Banyak Digunakan</CardTitle>
            <CardDescription>Berdasarkan volume penggunaan minggu ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsedMaterials.map((material, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-800">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{material.name}</div>
                      <div className="text-sm text-gray-500">
                        {material.usage} {material.unit}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(material.trend)}
                    <span
                      className={`text-sm ${
                        material.trend === "up"
                          ? "text-green-600"
                          : material.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {material.percentage > 0 ? "+" : ""}
                      {material.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage by Meal Type */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Penggunaan per Jenis Menu</CardTitle>
            <CardDescription>Persentase penggunaan berdasarkan waktu makan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageByMealType.map((meal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{meal.type}</span>
                    <span className="text-sm text-gray-600">{meal.percentage}%</span>
                  </div>
                  <Progress value={meal.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Usage Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Tren Penggunaan Mingguan</CardTitle>
          <CardDescription>Perbandingan penggunaan aktual vs target harian</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyTrends.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{day.day}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {day.usage}% / {day.target}%
                    </span>
                    <Badge variant={day.usage >= day.target ? "default" : "secondary"}>
                      {day.usage >= day.target ? "Target tercapai" : "Di bawah target"}
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={day.target} className="h-2 bg-gray-200" />
                  <Progress
                    value={day.usage}
                    className={`h-2 absolute top-0 ${day.usage >= day.target ? "text-green-600" : "text-yellow-600"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Insight & Rekomendasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-green-800">Efisiensi Baik</div>
                  <div className="text-sm text-green-700">
                    Penggunaan beras dan ayam fillet menunjukkan tren positif dengan efisiensi 94%.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-800">Perhatian Diperlukan</div>
                  <div className="text-sm text-yellow-700">
                    Penggunaan minyak goreng menurun 5%. Periksa kualitas atau cari alternatif supplier.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-800">Rekomendasi</div>
                  <div className="text-sm text-blue-700">
                    Tingkatkan akurasi forecasting untuk mencapai target 90%. Pertimbangkan pola musiman.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
