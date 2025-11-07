import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsageForm } from "@/features/usage/components/usage-form";
import { UsageHistory } from "@/features/usage/components/usage-history";
import { UsageAnalytics } from "@/features/usage/components/usage-analytics";
import { UsageReport } from "@/features/usage/components/usage-report";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardList, TrendingUp, FileText, Plus } from "lucide-react";
import { getDehydratedInventoryState } from "@/features/inventory/queries/use-inventory-items";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function UsagePage() {
  const { state } = await getDehydratedInventoryState();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Penggunaan Bahan
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Mitra Kulkita</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Penggunaan Hari Ini
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">24</div>
            <p className="text-xs text-gray-600">item bahan digunakan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Minggu Ini
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">156</div>
            <p className="text-xs text-gray-600">+12% dari minggu lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Efisiensi Penggunaan
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <p className="text-xs text-gray-600">sesuai rencana menu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Ratio</CardTitle>
            <Plus className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2.1%</div>
            <p className="text-xs text-gray-600">-0.5% dari target</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="record" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="record">Catat Penggunaan</TabsTrigger>
          <TabsTrigger value="history">Riwayat</TabsTrigger>
          <TabsTrigger value="analytics">Analisis</TabsTrigger>
          <TabsTrigger value="reports">Laporan</TabsTrigger>
        </TabsList>

        <TabsContent value="record" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-600" />
                Catat Penggunaan Bahan
              </CardTitle>
              <CardDescription>
                Catat penggunaan bahan makanan untuk persiapan menu harian
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HydrationBoundary state={state}>
                <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                  <UsageForm />
                </Suspense>
              </HydrationBoundary>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-blue-600" />
                Riwayat Penggunaan
              </CardTitle>
              <CardDescription>
                Lihat riwayat penggunaan bahan makanan dan filter berdasarkan
                periode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <UsageHistory />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Analisis Penggunaan
              </CardTitle>
              <CardDescription>
                Analisis pola penggunaan bahan dan tren konsumsi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <UsageAnalytics />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Laporan Penggunaan
              </CardTitle>
              <CardDescription>
                Generate laporan penggunaan untuk periode tertentu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <UsageReport />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
