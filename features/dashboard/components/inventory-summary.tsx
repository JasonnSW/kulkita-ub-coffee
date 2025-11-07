"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../services/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

type Status = "GREEN" | "YELLOW" | "RED";

const colorMap: Record<Status, string> = {
  GREEN: "#4CAF50",
  YELLOW: "#FFC107",
  RED: "#EF4444",
};

export function InventorySummary() {
  const { data, isLoading } = useQuery<any, any, any>({
    queryKey: ["dashboard", "summary"],
    queryFn: getDashboardSummary,
  });

  const top8Ingredients =
    data?.ingredientSummaries
      ?.slice()
      .sort((a: any, b: any) => b.batchCount - a.batchCount)
      .slice(0, 8)
      .map((item: any, index: any) => ({
        ...item,
        fill: `hsl(${(index * 45) % 360}, 70%, 50%)`,
      })) || [];

  const freshnessData = data?.freshnessStatusSummaries
    ?.slice()
    .sort((a: { status: Status }, b: { status: Status }) => {
      const order: Record<Status, number> = {
        GREEN: 0,
        YELLOW: 1,
        RED: 2,
      };
      return order[a.status] - order[b.status];
    })
    .map((entry: { status: Status; [key: string]: any }) => {
      const fillColor = colorMap[entry.status];
      return { ...entry, fillColor };
    });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Distribusi Kategori Bahan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-dvh">
            {isLoading ? (
              <Skeleton className="w-full h-[300px] rounded-md" />
            ) : (
              <ChartContainer
                config={{
                  batchCount: {
                    label: "Jumlah Batch",
                    color: "#4CAF50",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={top8Ingredients}>
                    <XAxis dataKey="ingredientName" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="batchCount"
                      fill="var(--color-batchCount)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 w-full col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Status Kesegaran Batch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-dvh">
              <ChartContainer
                config={{
                  count: {
                    label: "Jumlah Batch",
                    color: "#4CAF50",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={freshnessData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis
                      dataKey="status"
                      type="category"
                      tickFormatter={(value: string) => {
                        if (value === "RED") return "Kritis";
                        if (value === "YELLOW") return "Waspada";
                        if (value === "GREEN") return "Aman";
                        return value;
                      }}
                    />
                    <ChartTooltip content={<CustomTooltipContent />} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {freshnessData?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.fillColor} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lokasi Penyimpanan</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.storageLocationSummaries && (
              <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
                {data.storageLocationSummaries.map(
                  (storage: any, index: number) => (
                    <div
                      key={`${storage.location}-${index}`}
                      className="flex justify-between items-center"
                    >
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {storage.location}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {storage.batchCount} batch
                        </div>
                      </div>
                      <Badge className="bg-primary">Aktif</Badge>
                    </div>
                  )
                )}
              </div>
            )}
            <Button variant="outline" className="w-full mt-4">
              Kelola Lokasi
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const statusLabel =
      label === "RED"
        ? "Kritis"
        : label === "YELLOW"
        ? "Waspada"
        : label === "GREEN"
        ? "Aman"
        : label;

    const statusColor = colorMap[label as Status];

    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="text-xs font-medium">{statusLabel}</p>
        <div className="flex items-center gap-2 mt-1">
          <div
            className="w-3 h-3 rounded border"
            style={{ backgroundColor: statusColor, borderColor: statusColor }}
          />
          <p className="text-xs text-muted-foreground">
            Jumlah Batch: {payload[0].value}
          </p>
        </div>
      </div>
    );
  }
  return null;
};
