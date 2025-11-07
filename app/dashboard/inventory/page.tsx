import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryTable } from "@/features/inventory/components/inventory-table";
import { AddBatchForm } from "@/features/inventory/components/add-batch-form";
import { getDehydratedInventoryState } from "@/features/inventory/queries/use-inventory-items";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function InventoryPage() {
  const { state } = await getDehydratedInventoryState();
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventaris</h1>
          <p className="text-muted-foreground">Kelola stok bahan segar</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Ekspor Data</Button>
          <Button>Tambah Batch Baru</Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Semua Bahan</TabsTrigger>
          <TabsTrigger value="SAYURAN">Sayuran</TabsTrigger>
          <TabsTrigger value="BUAH">Buah</TabsTrigger>
          <TabsTrigger value="PROTEIN">Protein</TabsTrigger>
          <TabsTrigger value="BAHAN_POKOK">Bahan Pokok</TabsTrigger>
        </TabsList>
        <HydrationBoundary state={state}>
          <TabsContent value="all" className="space-y-4">
            <InventoryTable />
          </TabsContent>
          <TabsContent value="SAYURAN" className="space-y-4">
            <InventoryTable category="SAYURAN" />
          </TabsContent>
          <TabsContent value="BUAH" className="space-y-4">
            <InventoryTable category="BUAH" />
          </TabsContent>
          <TabsContent value="PROTEIN" className="space-y-4">
            <InventoryTable category="PROTEIN" />
          </TabsContent>
          <TabsContent value="BAHAN_POKOK" className="space-y-4">
            <InventoryTable category="BAHAN_POKOK" />
          </TabsContent>
        </HydrationBoundary>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Tambah Batch Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <AddBatchForm />
        </CardContent>
      </Card>
    </div>
  );
}
