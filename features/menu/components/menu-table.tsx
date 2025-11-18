"use client";

import { useMemo, useState } from "react";
import { Edit2, Trash2, MoreVertical, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuItem } from "../schema/menu";
import { useDeleteMenu } from "../mutations/use-delete-menu";

interface MenuTableProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
}

export function MenuTable({ items, onEdit }: MenuTableProps) {
  const [search, setSearch] = useState("");

  const { mutate: deleteMenuMutate } = useDeleteMenu();

  if (items.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground mb-2">Belum ada menu</p>
        <p className="text-sm text-muted-foreground">
          Tambahkan menu pertama Anda dengan mengklik tombol Tambah Menu
        </p>
      </div>
    );
  }

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;

    return items.filter((item) => {
      const inName = item.name.toLowerCase().includes(q);
      const inCategory = item.category.toLowerCase().includes(q);
      const inIngredients = item.ingredients?.some((ing) =>
        ing.ingredientName.toLowerCase().includes(q)
      );

      return inName || inCategory || inIngredients;
    });
  }, [items, search]);

  return (
    <>
      <div className="w-full flex justify-end">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari bahan / menu / kategori..."
            className="pl-9 text-sm"
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg max-h-[750px] flex flex-col">
        {/* Search di atas tabel */}
        {/* Tabel */}
        <div className="overflow-y-auto h-auto flex-1">
          <div className="overflow-x-auto">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Tidak ditemukan menu atau bahan untuk kata kunci{" "}
                <span className="font-semibold">&quot;{search}&quot;</span>.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Nama Menu
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Bahan
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={
                        idx % 2 === 0 ? "bg-background" : "bg-muted/30"
                      }
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-foreground">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {item.ingredients.slice(0, 2).map((ing) => (
                            <span
                              key={ing.id ?? ing.ingredientName}
                              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                            >
                              {ing.ingredientName}
                            </span>
                          ))}
                          {item.ingredients.length > 2 && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                              +{item.ingredients.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            item.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {item.active ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => onEdit(item)}
                                className="flex gap-2"
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteMenuMutate(item.id)}
                                className="flex gap-2 text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
