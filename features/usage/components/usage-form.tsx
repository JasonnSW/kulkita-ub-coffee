"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, Minus, Save, Search } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getAllInventoryItems } from "@/features/inventory/services/inventory";
import { useRecordUsage } from "../mutations/use-record-usage";

interface UsageItem {
  id: string;
  ingredientName: string;
  usedWeight: number;
  unit: string;
  usageType: string;
  batchCode?: string;
  portionCount: number;
}

export function UsageForm() {
  const [date, setDate] = useState<Date>(new Date());
  const [mealType, setMealType] = useState("");
  const [usageItems, setUsageItems] = useState<UsageItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState("");

  const { data } = useQuery<any, any, any>({
    queryKey: ["inventory", "items"],
    queryFn: getAllInventoryItems,
  });

  const { mutate: recordUsage, isPending } = useRecordUsage();

  const items = Array.isArray(data) ? data : [];

  const filteredMaterials = items.filter((material: any) =>
    material.ingredientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addUsageItem = (material: any) => {
    const newItem: UsageItem = {
      id: Date.now().toString(),
      ingredientName: material.ingredientName,
      usedWeight: 1,
      unit: material.unit,
      usageType: material.usageType || "OTHER",
      batchCode: material.batchCode,
      portionCount: 1,
    };
    setUsageItems((prev) => [...prev, newItem]);
  };
  const updateUsageItem = (id: string, field: keyof UsageItem, value: any) => {
    setUsageItems((items) =>
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeUsageItem = (id: string) => {
    setUsageItems((items) => items.filter((item) => item.id !== id));
  };

  const handleSubmit = () => {
    usageItems.forEach((item) => {
      const payload = {
        batchCode: item.batchCode,
        usedWeight: item.usedWeight,
        usageType: item.usageType,
        menuName: item.ingredientName,
        portionCount: item.portionCount,
        notes: notes,
      };

      console.log("Payload before submit:", JSON.stringify(payload, null, 2));
      recordUsage(payload);
    });

    setUsageItems([]);
    setNotes("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Tanggal Penggunaan</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: id }) : "Pilih tanggal"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meal-type">Jenis Menu</Label>
          <Select value={mealType} onValueChange={setMealType}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis menu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MENU_COOKING">Menu Cooking</SelectItem>
              <SelectItem value="MANUAL_USE">Manual Use</SelectItem>
              <SelectItem value="WASTE">Waste</SelectItem>
              <SelectItem value="EXPIRED">Expired</SelectItem>
              <SelectItem value="REDISTRIBUTED">Redistributed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">Cari Bahan</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari bahan makanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bahan Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredMaterials.map((material: any) => (
                <div
                  key={material.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="font-medium">{material.ingredientName}</div>
                    <div className="text-sm text-gray-500">
                      Stok: {material.weight} {material.unit} • Batch:{" "}
                      {material.batchCode}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addUsageItem(material)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bahan yang Digunakan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {usageItems.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  Belum ada bahan yang dipilih
                </div>
              ) : (
                usageItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{item.ingredientName}</div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeUsageItem(item.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Jumlah</Label>
                        <Input
                          type="usedWeight"
                          value={item.usedWeight}
                          onChange={(e) =>
                            updateUsageItem(
                              item.id,
                              "usedWeight",
                              Number(e.target.value)
                            )
                          }
                          min="0"
                          step="0.5"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Satuan</Label>
                        <Input value={item.unit} disabled />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Keperluan</Label>
                      <Select
                        value={item.usageType}
                        onValueChange={(value) =>
                          updateUsageItem(item.id, "usageType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih keperluan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MENU_COOKING">
                            Menu Cooking
                          </SelectItem>
                          <SelectItem value="MANUAL_USE">Manual Use</SelectItem>
                          <SelectItem value="WASTE">Waste</SelectItem>
                          <SelectItem value="EXPIRED">Expired</SelectItem>
                          <SelectItem value="REDISTRIBUTED">
                            Redistributed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {item.batchCode && (
                      <Badge variant="outline" className="text-xs">
                        Batch: {item.batchCode}
                      </Badge>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Catatan Tambahan</Label>
        <Textarea
          id="notes"
          placeholder="Tambahkan catatan tentang penggunaan bahan..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      {usageItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ringkasan Penggunaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Item:</span>
                <span className="font-medium">
                  {usageItems.length} jenis bahan
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tanggal:</span>
                <span className="font-medium">
                  {format(date, "PPP", { locale: id })}
                </span>
              </div>
              <div className="flex justify-between text-sm pb-2">
                <span>Jenis Menu:</span>
              </div>
              <span className="font-medium capitalize">
                {usageItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm pb-1"
                  >
                    <span>
                      {index + 1}. {item.ingredientName}
                    </span>
                    <span>
                      {item.usedWeight} {item.unit}{" "}
                      {item.batchCode && `• Batch: ${item.batchCode}`}
                    </span>
                  </div>
                ))}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            setUsageItems([]);
            setNotes("");
          }}
        >
          Reset
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={usageItems.length === 0 || isPending}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="mr-2 h-4 w-4" />
          {isPending ? "Loading..." : "Simpan Penggunaan"}
        </Button>
      </div>
    </div>
    
  );
}
