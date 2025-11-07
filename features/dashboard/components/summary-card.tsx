"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Activity, Clipboard, DollarSign } from "lucide-react";
import React, { useMemo } from "react";
import { getDashboardSummary } from "../services/dashboard";

type Status = "GREEN" | "YELLOW" | "RED";

const colorMap: Record<Status, string> = {
  GREEN: "#4CAF50",
  YELLOW: "#FFC107",
  RED: "#EF4444",
};

const labelMap: Record<Status, string> = {
  GREEN: "Aman",
  YELLOW: "Waspada",
  RED: "Kritis",
};

type FreshnessEntry = { status: Status; count: number; [k: string]: any };

export default function SummaryCard() {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["dashboard", "summary"],
    queryFn: getDashboardSummary,
  });

  const freshnessData = useMemo(() => {
    if (!data?.freshnessStatusSummaries) return [];
    const order: Record<Status, number> = { GREEN: 0, YELLOW: 1, RED: 2 };
    return [...data.freshnessStatusSummaries]
      .sort(
        (a: FreshnessEntry, b: FreshnessEntry) =>
          order[a.status] - order[b.status]
      )
      .map((entry: FreshnessEntry) => ({
        ...entry,
        fillColor: colorMap[entry.status],
      }));
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 w-32 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-6 w-24 bg-muted rounded" />
              <div className="mt-3 h-4 w-40 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Stok Aktif
          </CardTitle>
          <DollarSign className="h-4 w-4 text-primary flex-shrink-0" />
        </CardHeader>

        <CardContent className="p-4 sm:p-5 pt-0">
          <div className="text-xl sm:text-2xl font-bold">
            {data?.totalActiveBatches ?? "-"}
          </div>
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium truncate">
            Batch Aktif
          </CardTitle>
          <Clipboard className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">
            {data?.totalActiveWeight ?? "-"}
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
            {freshnessData?.map((entry: FreshnessEntry) => {
              const baseColor =
                entry.status === "GREEN"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : entry.status === "YELLOW"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : "bg-red-50 text-red-700 border-red-200";
              return (
                <Badge
                  key={entry.status}
                  variant="outline"
                  className={`px-1.5 py-0.5 sm:px-2 ${baseColor} text-[10px] sm:text-xs`}
                >
                  {entry.count}
                  <span className="inline">&nbsp;{labelMap[entry.status]}</span>
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium truncate">
            Potensi Food Loss
          </CardTitle>
          <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">
            {data?.potentialFoodLossKg ?? "24.5"} kg
          </div>
          {/* <p className="text-[10px] sm:text-xs text-muted-foreground">Estimasi: Rp 1,250,000</p> */}
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium truncate">
            Stok Menipis
          </CardTitle>
          <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">
            {data?.lowStockCount ?? "5"} Bahan
          </div>

          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 line-clamp-1 sm:line-clamp-2">
            {(
              data?.lowStockItems ?? [
                "Bayam",
                "Tomat",
                "Telur",
                "Ayam",
                "Wortel",
              ]
            ).join(", ")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
