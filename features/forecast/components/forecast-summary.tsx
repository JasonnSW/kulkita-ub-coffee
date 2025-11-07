"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUp,
  BarChart3,
  CalendarIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { getIngredientUsage, getPredictionForecastDashboard } from "../services/forecast";
import { toast } from "sonner";
import { usePredictionDate } from "@/features/forecast/stores/forecast";
import { getForecastDateRange } from "../utils/get-date-range";

const monthlyForecastData = [
  { week: "Minggu 1", sayuran: 280, buah: 180, protein: 150, total: 610 },
  { week: "Minggu 2", sayuran: 300, buah: 200, protein: 170, total: 670 },
  { week: "Minggu 3", sayuran: 320, buah: 210, protein: 180, total: 710 },
  { week: "Minggu 4", sayuran: 290, buah: 190, protein: 160, total: 640 },
];

// const topIngredientsData = [
//   {
//     name: "Bayam",
//     forecast: 120,
//     previous: 100,
//     change: 20,
//     fill: "hsl(var(--chart-1))",
//   },
//   {
//     name: "Tomat",
//     forecast: 90,
//     previous: 95,
//     change: -5,
//     fill: "hsl(var(--chart-2))",
//   },
//   {
//     name: "Ayam",
//     forecast: 80,
//     previous: 70,
//     change: 10,
//     fill: "hsl(var(--chart-3))",
//   },
//   {
//     name: "Telur",
//     forecast: 70,
//     previous: 75,
//     change: -5,
//     fill: "hsl(var(--chart-4))",
//   },
//   {
//     name: "Wortel",
//     forecast: 60,
//     previous: 50,
//     change: 10,
//     fill: "hsl(var(--chart-5))",
//   },
// ];

const menuForecastData = [
  { name: "Nasi Ayam Sayur", forecast: 450, previous: 400, change: 50 },
  { name: "Sup Ayam", forecast: 350, previous: 380, change: -30 },
  { name: "Capcay", forecast: 300, previous: 280, change: 20 },
  { name: "Telur Balado", forecast: 250, previous: 270, change: -20 },
  { name: "Tumis Kangkung", forecast: 200, previous: 180, change: 20 },
];

const barColors = ["#4CAF50", "#2196F3", "#FACC15", "#9C27B0", "#EF4444"];

const categoryColorMap: Record<string, string> = {
  "Bahan Pokok": "text-green-700 bg-green-100",
  Buah: "text-blue-700 bg-blue-100",
  Protein: "text-yellow-700 bg-yellow-100",
  Sayuran: "text-red-700 bg-red-100",
};

interface RawForecastEntry {
  Tanggal: string;
  [key: string]: any;
}

export function ForecastSummary() {
  const [forecastPeriod, setForecastPeriod] = useState("week");

  const dateRange = usePredictionDate((state) => state.dateRange);
  const setDateRange = usePredictionDate((state) => state.setDateRange);

  const { from, to, lastFrom, lastTo } = useMemo(() => {
    return getForecastDateRange(dateRange?.from, dateRange?.to);
  }, [dateRange]);

  // const handlePeriodChange = (value: string) => {
  //   setForecastPeriod(value);
  //   if (value === "week") {
  //     setForecastData(weeklyForecastData);
  //     setXAxisKey("day");
  //   } else if (value === "month") {
  //     setForecastData(monthlyForecastData);
  //     setXAxisKey("week");
  //   }
  // };

  const isValidRange = !!dateRange?.from && !!dateRange?.to;

  const { data, isLoading } = useQuery({
    enabled: !!from && !!to,
    queryKey: ["forecast", from.toISOString(), to.toISOString()],
    queryFn: () => getPredictionForecastDashboard(from, to),
    placeholderData: (previousData) => previousData,
  });

  const { data: currentIngredient } = useQuery({
    enabled: !!lastFrom && !!lastTo,
    queryKey: ["forecast-ingredient-usage", lastFrom.toISOString(), lastTo.toISOString()],
    queryFn: () => getIngredientUsage(lastFrom, lastTo),
    placeholderData: (previousData) => previousData,
  });

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    if (selectedDate?.from && selectedDate?.to) {
      setDateRange({ from: selectedDate.from, to: selectedDate.to });
    }
  };

  const top5PredictedItems =
    data?.top_5_predicted_items?.map((item: any, index: number) => ({
      name: item.Nama_Barang,
      forecast: item.Prediksi_Kebutuhan_Total_kg,
      color: barColors[index % barColors.length],
    })) || [];

  const previousUsageMap = (currentIngredient as any)?.ingredientUsageKg || {};

  const topIngredientsData = top5PredictedItems.map((item: any) => ({
    name: item.name,
    forecast: item.forecast,
    previous: previousUsageMap[item.name] ?? 0,
    color: item.color,
  }));

  const predictionSummary = data?.prediction_summary;
  function transformForecastRaw(forecastByDate: RawForecastEntry[]) {
    if (
      !forecastByDate ||
      !Array.isArray(forecastByDate) ||
      forecastByDate.length === 0
    ) {
      return [];
    }

    const formatted = forecastByDate.map(({ Tanggal, ...rest }, index) => {
      console.log(`🔄 Processing item ${index}:`, { Tanggal, ...rest });
      return {
        tanggal: Tanggal,
        dateObj: new Date(Tanggal),
        sortIndex: index,
        ...rest,
      };
    });

    const sorted = formatted
      .sort((a, b) => {
        return a.dateObj.getTime() - b.dateObj.getTime();
      })
      .map((item, index) => ({
        ...item,
        displayIndex: index,
        displayDate: item.dateObj.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        }),
      }));

    return sorted;
  }

  const forecastDataChart = transformForecastRaw(data?.forecast_by_date || []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Kebutuhan Prediksi
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {predictionSummary?.total_predicted_kg} kg
            </div>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <ArrowUpIcon className="h-3 w-3 mr-1 text-green-500" />
              <span>Naik 8% dari periode sebelumnya</span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              <span className="font-medium">Estimasi biaya:</span> Rp{" "}
              {predictionSummary?.total_estimated_cost.toLocaleString("id-ID")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Distribusi Kategori
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap gap-2 mt-1">
              {predictionSummary?.category_summary.map((category: any) => (
                <Badge
                  key={category.Kategori}
                  variant="outline"
                  className={cn(
                    "text-xs px-3 py-1 rounded-full whitespace-nowrap",
                    categoryColorMap[category.Kategori] ||
                    "text-gray-700 bg-gray-100"
                  )}
                >
                  {category.Kategori}: {category.Prediksi_Kebutuhan_Total_kg} kg
                </Badge>
              ))}
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              <span className="font-medium">Kategori tumbuh tercepat:</span>{" "}
              Sayuran (+12%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Periode Prediksi
            </CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1"
                  disabled={isLoading}
                >
                  <CalendarIcon className="h-4 w-4 text-primary" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={handleDateSelect}
                  numberOfMonths={1}
                  min={2}
                  className="rounded-lg border shadow-sm"
                />
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">
              {dateRange?.from ? (
                dateRange.to ? (
                  `${format(dateRange.from, "dd MMM yyyy")} - ${format(
                    dateRange.to,
                    "dd MMM yyyy"
                  )}`
                ) : (
                  format(dateRange.from, "dd MMM yyyy")
                )
              ) : (
                <span className="text-muted-foreground italic">
                  Pilih periode prediksi
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {dateRange?.from && dateRange?.to
                ? "Akurasi prediksi: 92% berdasarkan data historis"
                : "Klik ikon kalender untuk memilih periode"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Prediksi Kebutuhan Bahan</CardTitle>
              <CardDescription>
                Estimasi kebutuhan bahan segar berdasarkan model prediksi
              </CardDescription>
            </div>
            <Select value={forecastPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Mingguan</SelectItem>
                {/* <SelectItem value="month">Bulanan</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-dvh">
            {/* <DebugInfo /> */}
            {!isLoading && forecastDataChart.length > 0 && (
              <ChartContainer
                config={{
                  sayuran: {
                    label: "Sayuran (kg)",
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
                  total: {
                    label: "Total (kg)",
                    color: "hsl(var(--chart-4))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={forecastDataChart}
                    layout="horizontal"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="displayIndex"
                      type="number"
                      domain={[0, "dataMax"]}
                      ticks={forecastDataChart.map((_, index) => index)}
                      tickFormatter={(value) => {
                        console.log(
                          "🏷️ XAxis tick value:",
                          value,
                          "data:",
                          forecastDataChart[value]
                        );
                        const item = forecastDataChart[value];
                        return item ? item.displayDate : "";
                      }}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="Bayam (Sayuran)"
                      stroke="#4ade80"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Tomat (Sayuran)"
                      stroke="#22c55e"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Wortel (Sayuran)"
                      stroke="#16a34a"
                      strokeWidth={2}
                    />

                    <Line
                      type="monotone"
                      dataKey="Jeruk (Buah)"
                      stroke="#f97316"
                      strokeWidth={2}
                    />

                    <Line
                      type="monotone"
                      dataKey="Ayam (Protein)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Telur (Protein)"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />

                    <Line
                      type="monotone"
                      dataKey="Beras (Bahan Pokok)"
                      stroke="#a855f7"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Bahan Prediksi</CardTitle>
            <CardDescription>
              Bahan dengan kebutuhan tertinggi untuk periode mendatang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-dvh">
              <ChartContainer
                config={{
                  forecast: {
                    label: "Prediksi (kg)",
                    color: "#4CAF50",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={top5PredictedItems} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <ChartTooltip content={<CustomTooltipContent />} />
                    <Bar dataKey="forecast" radius={[0, 4, 4, 0]}>
                      {top5PredictedItems.map(
                        (entry: number, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={barColors[index % barColors.length]}
                          />
                        )
                      )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prediksi Menu Populer</CardTitle>
            <CardDescription>
              Menu dengan prediksi porsi tertinggi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menuForecastData.map((menu, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{menu.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Prediksi: {menu.forecast} porsi
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`text-sm font-medium flex items-center ${menu.change > 0 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {menu.change > 0 ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(menu.change)} porsi
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perbandingan dengan Periode Sebelumnya</CardTitle>
          <CardDescription>
            Perubahan kebutuhan bahan dibandingkan periode sebelumnya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-dvh">
            <ChartContainer
              config={{
                forecast: {
                  label: "Prediksi (kg)",
                  color: "hsl(var(--chart-1))",
                },
                previous: {
                  label: "Periode Sebelumnya (kg)",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topIngredientsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    dataKey="forecast"
                    fill="var(--color-forecast)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="previous"
                    fill="var(--color-previous)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const CustomTooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="text-xs font-medium">{data.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <div
            className="w-3 h-3 rounded border"
            style={{
              backgroundColor: data.color,
              borderColor: data.color,
            }}
          />
          <p className="text-xs text-muted-foreground">
            Prediksi: {data.forecast} kg
          </p>
        </div>
      </div>
    );
  }
  return null;
};

