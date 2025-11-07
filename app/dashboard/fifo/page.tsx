import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FifoRecommendation } from "@/features/fifo/components/fifo-recommendation";
import { FifoUsageForm } from "@/features/fifo/components/fifo-usage-form";
import { getDehydratedFifoState } from "@/features/fifo/queries/fifo";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function FifoPage() {
  const { state } = await getDehydratedFifoState();
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            FIFO Optimization
          </h1>
          <p className="text-muted-foreground">
            Optimasi penggunaan bahan dengan prinsip First In, First Out
          </p>
        </div>
        <Button>Gunakan Bahan</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Rekomendasi Penggunaan Bahan (FIFO)</CardTitle>
          </CardHeader>
          <CardContent>
            <HydrationBoundary state={state}>
              <FifoRecommendation />
            </HydrationBoundary>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Penggunaan Bahan Berdasarkan Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <FifoUsageForm type="menu" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Penggunaan Bahan Manual</CardTitle>
          </CardHeader>
          <CardContent>
            <FifoUsageForm type="manual" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
