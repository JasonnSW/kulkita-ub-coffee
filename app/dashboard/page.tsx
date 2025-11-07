import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { InventorySummary } from "@/features/dashboard/components/inventory-summary";
import { ExpiryAlertTable } from "@/features/dashboard/components/expiry-alert-table";
import { UsageTrends } from "@/features/dashboard/components/usage-trends";
import { WasteLossChart } from "@/features/dashboard/components/waste-loss-chart";
import { EconomicLossReport } from "@/features/dashboard/components/economic-loss-report";
import { HydrationBoundary } from "@tanstack/react-query";
import { getDehydratedDashboardState } from "@/features/dashboard/hooks/use-dashboard";
import SummaryCard from "@/features/dashboard/components/summary-card";

export default async function DashboardPage() {
  const { state } = await getDehydratedDashboardState();
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Ringkasan stok dan status bahan segar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Ekspor Data</Button>
          <Button>Tambah Batch Baru</Button>
        </div>
      </div>

      <HydrationBoundary state={state}>
        <SummaryCard />
        <Tabs defaultValue="inventory">
          <TabsList
            className="
      w-full
      overflow-x-auto no-scrollbar
      flex gap-1 p-1
      justify-start
      md:grid md:grid-cols-5 md:gap-0 md:overflow-visible md:justify-start
    "
          >
            <TabsTrigger
              value="inventory"
              className="snap-start shrink-0 px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm md:w-full md:justify-center"
            >
              Status Stok
            </TabsTrigger>
            <TabsTrigger
              value="expiry"
              className="snap-start shrink-0 px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm md:w-full md:justify-center"
            >
              Mendekati Kadaluarsa
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="snap-start shrink-0 px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm md:w-full md:justify-center"
            >
              Tren Penggunaan
            </TabsTrigger>
            <TabsTrigger
              value="waste"
              className="snap-start shrink-0 px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm md:w-full md:justify-center"
            >
              Waste Loss
            </TabsTrigger>
            <TabsTrigger
              value="economic"
              className="snap-start shrink-0 px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm md:w-full md:justify-center"
            >
              Kerugian Ekonomi
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inventory" className="space-y-4">
            <InventorySummary />
          </TabsContent>
          <TabsContent value="expiry" className="space-y-4">
            <ExpiryAlertTable />
          </TabsContent>
          <TabsContent value="usage" className="space-y-4">
            <UsageTrends />
          </TabsContent>
          <TabsContent value="waste" className="space-y-4">
            <WasteLossChart />
          </TabsContent>
          <TabsContent value="economic" className="space-y-4">
            <EconomicLossReport />
          </TabsContent>
        </Tabs>
      </HydrationBoundary>
    </div>
  );
}
