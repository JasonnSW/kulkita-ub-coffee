import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuHeaderProps {
  onAddNew: () => void;
}

export function MenuHeader({ onAddNew }: MenuHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Menu</h1>
          <p className="text-muted-foreground">
            Kelola daftar menu restoran Anda
          </p>
        </div>
        <Button
          onClick={onAddNew}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Menu
        </Button>
      </div>
    </div>
  );
}
