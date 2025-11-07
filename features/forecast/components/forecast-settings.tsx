"use client";

import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const generalFormSchema = z.object({
  forecastHorizon: z.string(),
  updateFrequency: z.string(),
  confidenceLevel: z.number().min(50).max(99),
  includeSeasonality: z.boolean(),
  includeEvents: z.boolean(),
  autoAdjust: z.boolean(),
});

const dataSourcesFormSchema = z.object({
  historicalPeriod: z.string(),
  includeSpoilage: z.boolean(),
  includeWaste: z.boolean(),
  includeExternalData: z.boolean(),
  externalDataSources: z.array(z.string()).optional(),
});

const notificationsFormSchema = z.object({
  enableNotifications: z.boolean(),
  notifyBeforePurchase: z.string(),
  notifyOnAnomaly: z.boolean(),
  notifyRecipients: z.string().optional(),
});

export function ForecastSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      forecastHorizon: "7",
      updateFrequency: "daily",
      confidenceLevel: 90,
      includeSeasonality: true,
      includeEvents: true,
      autoAdjust: true,
    },
  });

  const dataSourcesForm = useForm<z.infer<typeof dataSourcesFormSchema>>({
    resolver: zodResolver(dataSourcesFormSchema),
    defaultValues: {
      historicalPeriod: "90",
      includeSpoilage: true,
      includeWaste: true,
      includeExternalData: false,
      externalDataSources: [],
    },
  });

  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      enableNotifications: true,
      notifyBeforePurchase: "48",
      notifyOnAnomaly: true,
      notifyRecipients: "manager@gmail.org",
    },
  });

  function onGeneralSubmit(values: z.infer<typeof generalFormSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Pengaturan umum berhasil disimpan",
        description: "Pengaturan prediksi telah diperbarui",
      });
    }, 1000);
  }

  function onDataSourcesSubmit(values: z.infer<typeof dataSourcesFormSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Pengaturan sumber data berhasil disimpan",
        description: "Sumber data prediksi telah diperbarui",
      });
    }, 1000);
  }

  function onNotificationsSubmit(
    values: z.infer<typeof notificationsFormSchema>
  ) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Pengaturan notifikasi berhasil disimpan",
        description: "Notifikasi prediksi telah diperbarui",
      });
    }, 1000);
  }

  function handleRetrainModel() {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Model berhasil dilatih ulang",
        description: "Model prediksi telah diperbarui dengan data terbaru",
      });
    }, 3000);
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Pengaturan Umum</TabsTrigger>
          <TabsTrigger value="data-sources">Sumber Data</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum Prediksi</CardTitle>
              <CardDescription>
                Konfigurasi parameter umum untuk model prediksi kebutuhan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form
                  onSubmit={generalForm.handleSubmit(onGeneralSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={generalForm.control}
                    name="forecastHorizon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horizon Prediksi</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih horizon prediksi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 hari</SelectItem>
                            <SelectItem value="3">3 hari</SelectItem>
                            <SelectItem value="7">7 hari</SelectItem>
                            <SelectItem value="14">14 hari</SelectItem>
                            <SelectItem value="30">30 hari</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Tentukan berapa hari ke depan yang ingin diprediksi
                          kebutuhannya
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="updateFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frekuensi Update Prediksi</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih frekuensi update" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hourly">Setiap jam</SelectItem>
                            <SelectItem value="daily">Harian</SelectItem>
                            <SelectItem value="weekly">Mingguan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Seberapa sering model prediksi akan diperbarui
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="confidenceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tingkat Kepercayaan Prediksi</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              defaultValue={[field.value]}
                              max={99}
                              min={50}
                              step={1}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>50% (Lebih hemat)</span>
                              <span>{field.value}%</span>
                              <span>99% (Lebih aman)</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Tingkat kepercayaan yang lebih tinggi akan
                          menghasilkan prediksi yang lebih konservatif
                          (cenderung lebih tinggi)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={generalForm.control}
                      name="includeSeasonality"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Perhitungkan Musiman</FormLabel>
                            <FormDescription>
                              Memperhitungkan pola musiman (hari dalam seminggu,
                              bulan dalam setahun) dalam prediksi
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="includeEvents"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Perhitungkan Event Khusus</FormLabel>
                            <FormDescription>
                              Memperhitungkan event khusus (libur nasional,
                              acara sekolah) dalam prediksi
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="autoAdjust"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Penyesuaian Otomatis</FormLabel>
                            <FormDescription>
                              Secara otomatis menyesuaikan prediksi berdasarkan
                              perbedaan antara prediksi dan aktual
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Menyimpan..." : "Simpan Pengaturan"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pelatihan Model</CardTitle>
              <CardDescription>
                Latih ulang model prediksi dengan data terbaru
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-semibold">
                      Status Model Saat Ini
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Model terakhir dilatih: 21 Mei 2025 (1 hari yang lalu)
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Akurasi model: 92%
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    Aktif
                  </Badge>
                </div>
              </div>

              <Button
                onClick={handleRetrainModel}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Melatih Model..." : "Latih Ulang Model"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Pelatihan ulang model akan memakan waktu beberapa menit dan
                menggunakan data terbaru
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-sources" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sumber Data Prediksi</CardTitle>
              <CardDescription>
                Konfigurasi sumber data yang digunakan untuk model prediksi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...dataSourcesForm}>
                <form
                  onSubmit={dataSourcesForm.handleSubmit(onDataSourcesSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={dataSourcesForm.control}
                    name="historicalPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Periode Data Historis</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih periode data historis" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="30">30 hari terakhir</SelectItem>
                            <SelectItem value="60">60 hari terakhir</SelectItem>
                            <SelectItem value="90">90 hari terakhir</SelectItem>
                            <SelectItem value="180">
                              180 hari terakhir
                            </SelectItem>
                            <SelectItem value="365">
                              365 hari terakhir
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Tentukan berapa lama data historis yang akan digunakan
                          untuk prediksi
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={dataSourcesForm.control}
                      name="includeSpoilage"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Perhitungkan Data Pembusukan</FormLabel>
                            <FormDescription>
                              Memperhitungkan data pembusukan bahan dalam model
                              prediksi
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={dataSourcesForm.control}
                      name="includeWaste"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Perhitungkan Data Waste</FormLabel>
                            <FormDescription>
                              Memperhitungkan data waste (sisa bahan yang
                              terbuang) dalam model prediksi
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={dataSourcesForm.control}
                      name="includeExternalData"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Gunakan Data Eksternal</FormLabel>
                            <FormDescription>
                              Menggunakan data eksternal (cuaca, event lokal)
                              dalam model prediksi
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {dataSourcesForm.watch("includeExternalData") && (
                    <FormField
                      control={dataSourcesForm.control}
                      name="externalDataSources"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Sumber Data Eksternal</FormLabel>
                            <FormDescription>
                              Pilih sumber data eksternal yang ingin digunakan
                            </FormDescription>
                          </div>
                          <div className="space-y-2">
                            <FormField
                              control={dataSourcesForm.control}
                              name="externalDataSources"
                              render={({ field }) => {
                                return (
                                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          "weather"
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value || []),
                                                "weather",
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== "weather"
                                                ) || []
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Data Cuaca
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                            <FormField
                              control={dataSourcesForm.control}
                              name="externalDataSources"
                              render={({ field }) => {
                                return (
                                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          "events"
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value || []),
                                                "events",
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== "events"
                                                ) || []
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Event Lokal
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                            <FormField
                              control={dataSourcesForm.control}
                              name="externalDataSources"
                              render={({ field }) => {
                                return (
                                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          "holidays"
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value || []),
                                                "holidays",
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== "holidays"
                                                ) || []
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Hari Libur Nasional
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                            <FormField
                              control={dataSourcesForm.control}
                              name="externalDataSources"
                              render={({ field }) => {
                                return (
                                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          "market"
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value || []),
                                                "market",
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== "market"
                                                ) || []
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Data Pasar (Harga & Ketersediaan)
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Menyimpan..." : "Simpan Pengaturan"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi Prediksi</CardTitle>
              <CardDescription>
                Konfigurasi notifikasi terkait prediksi kebutuhan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationsForm}>
                <form
                  onSubmit={notificationsForm.handleSubmit(
                    onNotificationsSubmit
                  )}
                  className="space-y-6"
                >
                  <FormField
                    control={notificationsForm.control}
                    name="enableNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Aktifkan Notifikasi</FormLabel>
                          <FormDescription>
                            Aktifkan notifikasi terkait prediksi kebutuhan
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {notificationsForm.watch("enableNotifications") && (
                    <>
                      <FormField
                        control={notificationsForm.control}
                        name="notifyBeforePurchase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notifikasi Sebelum Pembelian</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih waktu notifikasi" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="24">
                                  24 jam sebelum
                                </SelectItem>
                                <SelectItem value="48">
                                  48 jam sebelum
                                </SelectItem>
                                <SelectItem value="72">
                                  72 jam sebelum
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Tentukan berapa jam sebelum pembelian yang
                              direkomendasikan Anda ingin menerima notifikasi
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationsForm.control}
                        name="notifyOnAnomaly"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Notifikasi Anomali</FormLabel>
                              <FormDescription>
                                Kirim notifikasi ketika terjadi anomali dalam
                                prediksi (perubahan signifikan)
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationsForm.control}
                        name="notifyRecipients"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Penerima Notifikasi</FormLabel>
                            <FormControl>
                              <Input placeholder="email@gmail.org" {...field} />
                            </FormControl>
                            <FormDescription>
                              Masukkan alamat email yang akan menerima
                              notifikasi (pisahkan dengan koma untuk beberapa
                              alamat)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Menyimpan..." : "Simpan Pengaturan"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
