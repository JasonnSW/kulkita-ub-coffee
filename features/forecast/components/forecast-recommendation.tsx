"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { usePredictionDate } from "../stores/forecast";
import { toast } from "sonner";
import { getPredictionForecastDashboard } from "../services/forecast";
import { stockRiskData, supplierRecommendationData } from "../data/forecast";
import { getAllInventoryItems } from "@/features/inventory/services/inventory";

export function ForecastRecommendation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { dateRange, setDateRange } = usePredictionDate();
  const isValidRange = !!dateRange?.from && !!dateRange?.to;

  const { data, isLoading } = useQuery({
    enabled: isValidRange,
    queryKey: [
      "forecast",
      dateRange?.from || new Date(),
      dateRange?.to || new Date(),
    ],
    queryFn: () => {
      if (!dateRange?.from || !dateRange?.to) {
        toast.error("Tanggal tidak valid");
        throw new Error("Tanggal tidak valid");
      }
      return getPredictionForecastDashboard(dateRange.from, dateRange.to);
    },
  });

  const { data: inventory, isLoading: isLoadingInventory } = useQuery<any, any, any>({
    queryKey: ["inventory", "items"],
    queryFn: getAllInventoryItems,
    placeholderData: (previousData: any) => previousData,
  });


  // const filteredData = purchaseRecommendationData.filter(
  //   (item : any) =>
  //     (selectedCategory === "all" ||
  //       item.kategori.toLowerCase() === selectedCategory) &&
  //     (item.bahan.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.kategori.toLowerCase().includes(searchTerm.toLowerCase()))
  // );

  const handleGeneratePurchaseOrder = () => {
    toast.success("Rencana pembelian berhasil dibuat dan siap untuk diproses");
  };

  const handleAdjustRecommendation = () => {
    toast.success(
      "Rekomendasi pembelian telah disesuaikan berdasarkan preferensi Anda"
    );
  };

  const latestItemPrices = data?.prediction_summary.latest_item_prices || [];
  const totalPredictedDemand =
    data?.prediction_summary.total_predicted_demand || [];

  const currentStock: Record<string, number> = useMemo(() => {
    if (!inventory || !Array.isArray(inventory)) {
      return {
        Ayam: 100,
        Bayam: 50,
        Beras: 200,
        Jeruk: 150,
        Telur: 300,
        Tomat: 80,
        Wortel: 60,
      };
    }

    const stockCalculation = inventory.reduce((acc: Record<string, number>, item: any) => {
      const ingredientName = item.ingredientName;
      const weight = parseFloat(item.weight) || 0;

      if (item.active && item.freshnessStatus !== 'EXPIRED') {
        acc[ingredientName] = (acc[ingredientName] || 0) + weight;
      }

      return acc;
    }, {});

    return stockCalculation;
  }, [inventory]);
  
  function getStatus(predicted: number, stock: number) {
    if (stock < predicted * 0.5) return "Kritis";
    if (stock < predicted) return "Perlu";
    return "Aman";
  }

  function getTrend(harian: number) {
    return harian > 50 ? "up" : "down";
  }

  const filteredData = totalPredictedDemand.map((item: any) => {
    const priceInfo = latestItemPrices.find(
      (p: any) => p.Nama_Barang === item.Nama_Barang
    );

    const stokSaatIni = currentStock[item.Nama_Barang] || 0;
    const prediksiKebutuhan = item.Prediksi_Kebutuhan_Total_kg;
    const rekomendasiPembelian = Math.max(prediksiKebutuhan - stokSaatIni, 0);
    const estimasiHarga = rekomendasiPembelian * (priceInfo?.Harga_Satuan || 0);
    const status = getStatus(prediksiKebutuhan, stokSaatIni);
    const tren = getTrend(item.Prediksi_Harian_Rata2_kg);

    return {
      id: item.Nama_Barang,
      bahan: item.Nama_Barang,
      kategori: priceInfo?.Kategori || "-",
      stokSaatIni,
      prediksiKebutuhan,
      rekomendasiPembelian,
      estimasiHarga: estimasiHarga.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
      status,
      tren,
    };
  });

  const stockoutData = filteredData.filter(
    (item: any) => item.stokSaatIni < item.prediksiKebutuhan
  );
  const overstockData = filteredData.filter(
    (item: any) => item.stokSaatIni > item.prediksiKebutuhan
  );

  console.log(dateRange);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Rekomendasi Pembelian</CardTitle>
              <CardDescription>
                Rekomendasi pembelian bahan berdasarkan prediksi kebutuhan
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="sayuran">Sayuran</SelectItem>
                  <SelectItem value="buah">Buah</SelectItem>
                  <SelectItem value="protein">Protein</SelectItem>
                  <SelectItem value="bahan pokok">Bahan Pokok</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Cari bahan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bahan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Stok Saat Ini</TableHead>
                <TableHead>Prediksi Kebutuhan</TableHead>
                <TableHead>Rekomendasi Pembelian</TableHead>
                <TableHead>Estimasi Harga</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tren</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.bahan}</TableCell>
                  <TableCell>{item.kategori}</TableCell>
                  <TableCell>{item.stokSaatIni}</TableCell>
                  <TableCell>{item.prediksiKebutuhan}</TableCell>
                  <TableCell>{item.rekomendasiPembelian}</TableCell>
                  <TableCell>{item.estimasiHarga}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.status === "Kritis"
                          ? "border-red-500 text-red-500"
                          : item.status === "Perlu"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-green-500 text-green-500"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.tren === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleAdjustRecommendation}>
            Sesuaikan Rekomendasi
          </Button>
          <Button onClick={handleGeneratePurchaseOrder}>
            Buat Rencana Pembelian
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risiko Stok</CardTitle>
          <CardDescription>
            Identifikasi risiko kelebihan dan kekurangan stok
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stockout">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="stockout">Risiko Stockout</TabsTrigger>
              <TabsTrigger value="overstock">Risiko Overstock</TabsTrigger>
            </TabsList>
            <TabsContent value="stockout">
              <div className="max-h-[500px] overflow-y-auto space-y-4 border rounded-md">
                {stockoutData.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-4 bg-red-50 rounded-lg"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-semibold">
                          {item.bahan} ({item.kategori})
                        </h4>
                        <Badge
                          variant="outline"
                          className="border-red-500 text-red-500"
                        >
                          Risiko {item.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                        <div className="text-xs">
                          <span className="text-muted-foreground">
                            Stok Saat Ini:
                          </span>{" "}
                          {item.stokSaatIni} kg
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">
                            Prediksi Kebutuhan:
                          </span>{" "}
                          {item.prediksiKebutuhan} kg
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">
                            Rekomendasi Beli:
                          </span>{" "}
                          <span className="text-red-500 font-medium">
                            {item.rekomendasiPembelian} kg
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Estimasi Harga:</span>{" "}
                        {item.estimasiHarga}
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Tindak Lanjuti
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="overstock">
              <div className="max-h-[500px] overflow-y-auto border rounded-md">
                {overstockData.map((item: any) => {
                  const surplus = item.stokSaatIni - item.prediksiKebutuhan;
                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg"
                    >
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-semibold">
                            {item.bahan} ({item.kategori})
                          </h4>
                          <Badge
                            variant="outline"
                            className="border-yellow-500 text-yellow-500"
                          >
                            Kelebihan Stok
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                          <div className="text-xs">
                            <span className="text-muted-foreground">
                              Stok Saat Ini:
                            </span>{" "}
                            {item.stokSaatIni} kg
                          </div>
                          <div className="text-xs">
                            <span className="text-muted-foreground">
                              Prediksi Kebutuhan:
                            </span>{" "}
                            {item.prediksiKebutuhan} kg
                          </div>
                          <div className="text-xs">
                            <span className="text-muted-foreground">
                              Kelebihan:
                            </span>{" "}
                            <span className="text-yellow-500 font-medium">
                              {surplus} kg
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          <span className="font-medium">Rekomendasi:</span>{" "}
                          Gunakan kelebihan stok untuk promo/menu spesial
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">
                          Tindak Lanjuti
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rekomendasi Supplier</CardTitle>
          <CardDescription>
            Supplier yang direkomendasikan berdasarkan kebutuhan prediksi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Bahan</TableHead>
                <TableHead>Harga Rata-rata</TableHead>
                <TableHead>Kualitas</TableHead>
                <TableHead>Lead Time</TableHead>
                <TableHead>Rekomendasi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplierRecommendationData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.supplier}</TableCell>
                  <TableCell>{item.kategori}</TableCell>
                  <TableCell>{item.bahan}</TableCell>
                  <TableCell>{item.hargaRataRata}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.kualitas === "Tinggi"
                          ? "border-green-500 text-green-500"
                          : item.kualitas === "Sedang"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-red-500 text-red-500"
                      }
                    >
                      {item.kualitas}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.leadTime}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {item.rekomendasi}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
