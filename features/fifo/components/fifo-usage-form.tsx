"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getAllByBatchesPriority, getAllByMenu } from "../services/fifo";
import { useQuery } from "@tanstack/react-query";
import { useMenu, useMenuManual } from "../mutations/fifo";
import { manualFormSchema, menuFormSchema } from "../schemas/fifo";

interface FifoUsageFormProps {
  type: "menu" | "manual";
}

export function FifoUsageForm({ type }: FifoUsageFormProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");

  const menuForm = useForm<z.infer<typeof menuFormSchema>>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: {
      menuId: "",
      portionCount: "",
    },
  });

  const { data = [] } = useQuery<any, any, any>({
    queryKey: ["fifo", "menu"],
    queryFn: getAllByMenu,
    placeholderData: (previousData: any) => previousData,
  });

  const { data: BatchesPriority = [] } = useQuery<any, any, any>({
    queryKey: ["fifo", "priority-batches"],
    queryFn: getAllByBatchesPriority,
    placeholderData: (previousData: any) => previousData,
  });

  const { mutate: menu, isPending: isPendingMenu } = useMenu();
  const { mutate: menuManual, isPending: isPendingMenuManual } =
    useMenuManual();

  const manualForm = useForm<z.infer<typeof manualFormSchema>>({
    resolver: zodResolver(manualFormSchema),
    defaultValues: {
      ingredientName: "",
      batchCode: "",
      usedWeight: "",
      satuan: "kg",
    },
  });

  function onMenuSubmit(values: z.infer<typeof menuFormSchema>) {
    menu(values);
  }

  function onManualSubmit(values: z.infer<typeof manualFormSchema>) {
    menuManual(values);
  }

  if (type === "menu") {
    return (
      <Form {...menuForm}>
        <form
          onSubmit={menuForm.handleSubmit(onMenuSubmit)}
          className="space-y-4"
        >
          <FormField
            control={menuForm.control}
            name="menuId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih menu" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.map((menu: any) => (
                      <SelectItem key={menu.id} value={menu.id}>
                        {menu.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={menuForm.control}
            name="portionCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Porsi</FormLabel>
                <FormControl>
                  <Input placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isPendingMenu}>
              {isPendingMenu ? "Memproses..." : "Gunakan Menu"}
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return (
    <Form {...manualForm}>
      <form
        onSubmit={manualForm.handleSubmit(onManualSubmit)}
        className="space-y-4"
      >
        <FormField
          control={manualForm.control}
          name="ingredientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bahan</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedIngredient(value);
                  manualForm.setValue("batchCode", "");
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bahan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(
                    Array.from(
                      new Set(
                        BatchesPriority.map(
                          (item: any) => item.ingredientName
                        ).filter(Boolean)
                      )
                    ) as string[]
                  ).map((ingredientName, index) => (
                    <SelectItem
                      key={`ingredient-${ingredientName}-${index}`}
                      value={ingredientName}
                    >
                      {ingredientName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={manualForm.control}
          name="batchCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!selectedIngredient}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih batch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BatchesPriority.filter(
                    (batch: any) => batch.ingredientName === selectedIngredient
                  ).map((batch: any) => (
                    <SelectItem key={batch.id} value={batch.batchCode}>
                      {batch.batchCode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={manualForm.control}
            name="usedWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl>
                  <Input placeholder="5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={manualForm.control}
            name="satuan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satuan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih satuan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="butir">Butir</SelectItem>
                    <SelectItem value="ikat">Ikat</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isPendingMenuManual}
          >
            {isPendingMenuManual ? "Memproses..." : "Gunakan Bahan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
