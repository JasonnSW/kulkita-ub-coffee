import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpoilageAlertDashboard } from "@/features/predictions/components/spoilage-alert-dashboard";
import { PredictionModelInsights } from "@/components/prediction-model-insights";
import { AlertSettings } from "@/components/alert-settings";
import { getDehydratedPredictionState } from "@/features/predictions/queries/predictions";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function PredictionPage() {
  const { state } = await getDehydratedPredictionState();
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Prediksi Pembusukan
          </h1>
          <p className="text-muted-foreground">
            Peringatan dini pembusukan bahan berdasarkan model prediksi
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Kalibrasi Model</Button>
          <Button>Atur Notifikasi</Button>
        </div>
      </div>

      <Tabs defaultValue="alerts">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Peringatan Aktif</TabsTrigger>
          <TabsTrigger value="model">Insight Model</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
        </TabsList>
        <TabsContent value="alerts" className="space-y-4">
          <HydrationBoundary state={state}>
            <SpoilageAlertDashboard />
          </HydrationBoundary>
        </TabsContent>
        <TabsContent value="model" className="space-y-4">
          <PredictionModelInsights />
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <AlertSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
