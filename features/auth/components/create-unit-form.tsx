"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { unitSchema } from "../schemas/auth";
import { useCreateUnit } from "../hooks/use-auth";

export function CreateUnitForm() {
  const { mutate: createUnit, isPending } = useCreateUnit();

  const form = useForm<z.infer<typeof unitSchema>>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      unitName: "",
      address: "",
      contactPerson: "",
      contactPhone: "",
    },
  });

  function onSubmit(values: z.infer<typeof unitSchema>) {
    createUnit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="unitName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Unit Mitra</FormLabel>
              <FormControl>
                <Input placeholder="Kulkita Cabang Malang" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Jl. Contoh No. 123, Kota Bogor"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kontak</FormLabel>
              <FormControl>
                <Input placeholder="Nama Kontak" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon Kontak</FormLabel>
              <FormControl>
                <Input placeholder="08xxxxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Memproses..." : "Daftarkan Mitra Baru"}
        </Button>
      </form>
    </Form>
  );
}
