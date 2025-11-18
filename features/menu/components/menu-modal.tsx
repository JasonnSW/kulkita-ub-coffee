"use client";

import { useEffect, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import {
  createMenuSchema,
  updateMenuSchema,
  type CreateMenuPayload,
  type UpdateMenuPayload,
  type MenuItem,
} from "../schema/menu";
import { IngredientInput } from "./ingredient-input";

type MenuFormValues = CreateMenuPayload | UpdateMenuPayload;

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MenuFormValues) => void;
  initialData?: MenuItem | null;
}

export function MenuModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: MenuModalProps) {
  const mode: "create" | "edit" = initialData ? "edit" : "create";

  const schema = useMemo(
    () => (mode === "edit" ? updateMenuSchema : createMenuSchema),
    [mode]
  );

  const form = useForm<MenuFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      servingSize: 0,
      ingredients: [],
      ...(mode === "edit" ? { active: true } : {}),
    } as MenuFormValues,
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        category: initialData.category,
        active: initialData.active,
        ingredients: initialData.ingredients.map((ing) => ({
          id: ing.id,
          ingredientName: ing.ingredientName,
          weightPerPortion: ing.weightPerPortion,
          unit: ing.unit,
          notes: ing.notes,
        })),
      });
    } else {
      reset({
        name: "",
        description: "",
        category: "Main Course",
        servingSize: 1,
        ingredients: [],
      });
    }
  }, [initialData, isOpen, reset]);

  const onSubmit = (values: MenuFormValues) => {
    console.log("PAYLOAD KIRIM UPDATE:", values.ingredients);
    onSave(values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Menu" : "Tambah Menu Baru"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nama Menu */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Menu</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama menu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deskripsi */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input placeholder="Deskripsi menu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kategori & Porsi */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <FormControl>
                      <select
                        className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground"
                        {...field}
                      >
                        <option>Main Course</option>
                        <option>Side Dish</option>
                        <option>Appetizer</option>
                        <option>Beverage</option>
                        <option>Dessert</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="servingSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Porsi</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Jumlah porsi"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status Aktif (hanya saat edit) */}
            {mode === "edit" && (
              <FormField
                control={control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Aktif</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Bahan-bahan */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Bahan-bahan</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      ingredientName: "",
                      weightPerPortion: 0,
                      unit: "g",
                      notes: "",
                    })
                  }
                >
                  + Tambah Bahan
                </Button>
              </div>

              {errors.ingredients && (
                <p className="text-xs text-red-500 mb-2">
                  {errors.ingredients.message as string}
                </p>
              )}

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <IngredientInput
                    ingredient={field}
                    onChange={(updated) => update(index, updated)}
                    onRemove={() => remove(index)}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-4 border-t border-border">
              <Button type="button" onClick={onClose} variant="outline">
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {initialData ? "Perbarui" : "Tambah"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
