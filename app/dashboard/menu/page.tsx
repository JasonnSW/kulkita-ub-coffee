"use client";

import { useState } from "react";

import { MenuHeader } from "@/features/menu/components/menu-header";
import { MenuTable } from "@/features/menu/components/menu-table";
import { MenuModal } from "@/features/menu/components/menu-modal";

import {
  CreateMenuPayload,
  UpdateMenuPayload,
  type MenuItem,
} from "@/features/menu/schema/menu";
import { useMenus } from "@/features/menu/queries/menu";
import { useCreateMenu } from "@/features/menu/mutations/use-create-menu";
import { useUpdateMenu } from "@/features/menu/mutations/use-update-menu";

export default function MenuPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const { data: items, isLoading, isError } = useMenus();

  const createMenuMutation = useCreateMenu();
  const updateMenuMutation = useUpdateMenu();

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (values: CreateMenuPayload | UpdateMenuPayload) => {
    if (editingItem) {
      updateMenuMutation.mutate(
        {
          id: editingItem.id,
          payload: values as UpdateMenuPayload,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    } else {
      createMenuMutation.mutate(values as CreateMenuPayload, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  return (
    <main className="min-h-screen bg-background p-6 space-y-6">
      <MenuHeader onAddNew={handleAddNew} />

      {isLoading && (
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground">Memuat data menu...</p>
        </div>
      )}

      {isError && (
        <div className="bg-card border border-destructive/40 rounded-lg p-6">
          <p className="text-destructive">
            Terjadi kesalahan saat memuat data menu.
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <MenuTable items={items} onEdit={handleEdit} />
      )}

      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />
    </main>
  );
}
