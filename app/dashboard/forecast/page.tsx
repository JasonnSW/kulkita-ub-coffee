import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForecastSummary } from "@/features/forecast/components/forecast-summary";
import { ForecastRecommendation } from "@/features/forecast/components/forecast-recommendation";
import { ForecastSettings } from "@/features/forecast/components/forecast-settings";
import { getDehydratedForecastState } from "@/features/forecast/queries/forecast";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function ForecastPage() {
  const { state } = await getDehydratedForecastState();
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Prediksi Kebutuhan
          </h1>
          <p className="text-muted-foreground">
            Perencanaan stok bahan segar berdasarkan prediksi kebutuhan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Ekspor Prediksi</Button>
          <Button>Buat Rencana Pembelian</Button>
        </div>
      </div>

      <Tabs defaultValue="summary">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Ringkasan Prediksi</TabsTrigger>
          <TabsTrigger value="recommendation">Rekomendasi Stok</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan Prediksi</TabsTrigger>
        </TabsList>
        <HydrationBoundary state={state}>
          <TabsContent value="summary" className="space-y-4">
            <ForecastSummary />
          </TabsContent>
          <TabsContent value="recommendation" className="space-y-4">
            <ForecastRecommendation />
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <ForecastSettings />
          </TabsContent>
        </HydrationBoundary>
      </Tabs>
    </div>
  );
}
