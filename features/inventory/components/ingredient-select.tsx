"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { INGREDIENT_GROUPS } from "../data/inventory";

type IngredientSelectProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function IngredientSelect({
  value,
  onChange,
  placeholder = "Pilih bahan",
}: IngredientSelectProps) {
  const [open, setOpen] = React.useState(false);

  const flatItems = React.useMemo(
    () =>
      INGREDIENT_GROUPS.flatMap((group) =>
        group.items.map((item) => ({
          ...item,
          groupLabel: group.label,
        }))
      ),
    []
  );

  const selectedItem = flatItems.find((item) => item.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedItem ? (
            selectedItem.label ?? selectedItem.value
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Cari bahan..." />
          <CommandEmpty>Tidak ada bahan ditemukan.</CommandEmpty>
          <CommandList className="max-h-64">
            {INGREDIENT_GROUPS.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label ?? item.value}
                    onSelect={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        item.value === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label ?? item.value}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
