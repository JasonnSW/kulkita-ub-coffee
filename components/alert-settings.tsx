"use client";

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

const formSchema = z.object({
  notifyBefore: z.string(),
  notifyMethod: z.array(z.string()).min(1, {
    message: "Pilih minimal satu metode notifikasi.",
  }),
  sensitivityLevel: z.number().min(1).max(100),
  autoAction: z.boolean(),
  emailRecipients: z.string().optional(),
});

export function AlertSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notifyBefore: "24",
      notifyMethod: ["app", "email"],
      sensitivityLevel: 75,
      autoAction: false,
      emailRecipients: "manager@gmail.com",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Pengaturan berhasil disimpan",
        description: "Pengaturan peringatan dini telah diperbarui",
      });
    }, 1000);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Peringatan Dini</CardTitle>
          <CardDescription>
            Konfigurasi notifikasi dan tindakan otomatis untuk peringatan
            pembusukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="notifyBefore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peringatan Sebelum Pembusukan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih waktu peringatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="12">12 jam sebelum</SelectItem>
                        <SelectItem value="24">24 jam sebelum</SelectItem>
                        <SelectItem value="48">48 jam sebelum</SelectItem>
                        <SelectItem value="72">72 jam sebelum</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Tentukan berapa jam sebelum prediksi pembusukan Anda ingin
                      menerima peringatan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifyMethod"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Metode Notifikasi</FormLabel>
                      <FormDescription>
                        Pilih cara Anda ingin menerima peringatan
                      </FormDescription>
                    </div>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="notifyMethod"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Notifikasi Aplikasi</FormLabel>
                                <FormDescription>
                                  Peringatan di dalam aplikasi Kulkita
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value?.includes("app")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, "app"])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== "app"
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="notifyMethod"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Email</FormLabel>
                                <FormDescription>
                                  Peringatan melalui email
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value?.includes("email")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          "email",
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== "email"
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="notifyMethod"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>SMS</FormLabel>
                                <FormDescription>
                                  Peringatan melalui SMS
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value?.includes("sms")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, "sms"])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== "sms"
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sensitivityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tingkat Sensitivitas Peringatan</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          defaultValue={[field.value]}
                          max={100}
                          step={1}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Rendah (Kurangi false positive)</span>
                          <span>{field.value}%</span>
                          <span>Tinggi (Deteksi dini)</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Sensitivitas tinggi memberikan peringatan lebih dini
                      tetapi mungkin menghasilkan lebih banyak peringatan palsu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autoAction"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Tindakan Otomatis</FormLabel>
                      <FormDescription>
                        Secara otomatis tandai bahan sebagai "Perlu Digunakan
                        Segera" saat mendekati pembusukan
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
                control={form.control}
                name="emailRecipients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penerima Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@gmail.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Masukkan alamat email yang akan menerima peringatan
                      (pisahkan dengan koma untuk beberapa alamat)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Menyimpan..." : "Simpan Pengaturan"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
