"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateBatchStatusInput } from "../schemas/inventory";

interface EditBatchDialogProps {
  open: boolean;
  batch: any | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: Pick<UpdateBatchStatusInput, "status" | "notes">) => void;
}

const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Aktif" },
  { value: "EXPIRED", label: "Expired" },
  { value: "DISCARDED", label: "Dibuang" },
];

export function EditBatchDialog({
  open,
  batch,
  onClose,
  onSubmit,
  loading,
}: EditBatchDialogProps) {
  if (!batch) return null;

  const [status, setStatus] = useState(batch.status ?? "ACTIVE");
  const [notes, setNotes] = useState(batch.notes ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      status,
      notes,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Status Batch</DialogTitle>
          <DialogDescription>
            Ubah status dan catatan untuk batch ini.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <Label>Kode Batch</Label>
            <Input value={batch.batchCode} readOnly className="bg-muted/50" />
          </div>

          <div className="space-y-1">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Catatan</Label>
            <Textarea
              rows={4}
              placeholder="Contoh: Found spoiled during inspection"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
