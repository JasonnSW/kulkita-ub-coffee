import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Ingredient } from "../types/menu";
import { useQuery } from "@tanstack/react-query";
import { getAllByBatchesPriority } from "@/features/fifo/services/fifo";
import { useMemo } from "react";
import { FifoBatch } from "@/features/fifo/schemas/fifo";

interface IngredientInputProps {
  ingredient: Ingredient;
  onChange: (ingredient: Ingredient) => void;
  onRemove: () => void;
}

export function IngredientInput({
  ingredient,
  onChange,
  onRemove,
}: IngredientInputProps) {
  const { data: batches = [] } = useQuery<any>({
    queryKey: ["fifo", "priority-batches"],
    queryFn: getAllByBatchesPriority,
    placeholderData: (prev: any) => prev,
  });

  const ingredientOptions = useMemo(() => {
    const map = new Map<string, { value: string; label: string }>();
    for (const b of batches) {
      if (!map.has(b.ingredientName)) {
        map.set(b.ingredientName, {
          value: b.ingredientName,
          label: b.ingredientName,
        });
      }
    }
    return Array.from(map.values());
  }, [batches]);

  return (
    <div className="space-y-2 bg-muted/50 p-3 rounded-md">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="block text-xs font-medium mb-1 text-muted-foreground">
            Nama Bahan
          </label>
          <Select
            value={ingredient.ingredientName || ""}
            onValueChange={(value) =>
              onChange({ ...ingredient, ingredientName: value })
            }
          >
            <SelectTrigger className="w-full h-9 text-sm">
              <SelectValue placeholder="Pilih bahan" />
            </SelectTrigger>
            <SelectContent>
              {ingredientOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2">
          <div className="w-24">
            <label className="block text-xs font-medium mb-1 text-muted-foreground">
              Jumlah
            </label>
            <Input
              type="number"
              value={ingredient.weightPerPortion}
              onChange={(e) =>
                onChange({
                  ...ingredient,
                  weightPerPortion: Number(e.target.value),
                })
              }
              placeholder="0"
              step={0.1}
              className="text-sm h-9"
            />
          </div>

          <div className="w-24">
            <label className="block text-xs font-medium mb-1 text-muted-foreground">
              Satuan
            </label>
            <select
              value={ingredient.unit}
              onChange={(e) =>
                onChange({ ...ingredient, unit: e.target.value })
              }
              className="w-full h-9 px-2 border border-border rounded text-sm bg-background text-foreground"
            >
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="ml">ml</option>
              <option value="l">l</option>
              <option value="butir">butir</option>
              <option value="pcs">pcs</option>
              <option value="ikat">ikat</option>
            </select>
          </div>
        </div>

        <Button
          onClick={onRemove}
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-destructive"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-muted-foreground">
          Catatan
        </label>
        <Textarea
          value={ingredient.notes ?? ""}
          onChange={(e) => onChange({ ...ingredient, notes: e.target.value })}
          placeholder="Catatan (opsional)"
          className="text-sm resize-none"
          rows={2}
        />
      </div>
    </div>
  );
}
