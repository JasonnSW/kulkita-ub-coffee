"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  MapPin,
  Phone,
  Factory,
  CalendarDays,
  Plus,
  ArrowUpRight,
  Box,
  User,
  Users,
} from "lucide-react";

// ------------ Mock Types & Data ------------
type Status = "Tinggi" | "Sedang" | "Rendah";

type RequestItem = {
  id: string;
  ingredient: string;
  amount: string; // e.g. "15 kg"
  org: string;
  contact: string;
  city: string;
  deadline: string; // ISO or display
  notes: string;
  status: Status;
  fulfilled?: boolean;
};

const DEMAND: RequestItem[] = [
  {
    id: "1",
    ingredient: "Tomat",
    amount: "15 kg",
    org: "",
    contact: "Ibu Sari – 0812‑3456‑7890",
    city: "Bogor",
    deadline: "2025-05-23",
    notes:
      "Membutuhkan tomat segar untuk menu besok. Stok habis mendadak karena permintaan meningkat.",
    status: "Tinggi",
    fulfilled: false,
  },
  {
    id: "2",
    ingredient: "Bayam",
    amount: "8 kg",
    org: "",
    contact: "Pak Budi – 0851‑9876‑5432",
    city: "Bogor",
    deadline: "2025-05-24",
    notes:
      "Perlu bayam untuk menu sayur bening. Supplier reguler terlambat kirim.",
    status: "Sedang",
    fulfilled: true,
  },
];

const SUPPLY: RequestItem[] = [
  {
    id: "3",
    ingredient: "Tomat",
    amount: "15 kg",
    org: "",
    contact: "Ibu Sari – 0812-3456-7890",
    city: "Bogor",
    deadline: "2025-05-23",
    notes:
      "Kelebihan stok tomat karena panen. Siap diambil sebelum kualitas menurun.",
    status: "Rendah", // hijau
    fulfilled: false,
  },
  {
    id: "4",
    ingredient: "Bayam",
    amount: "8 kg",
    org: "",
    contact: "Pak Budi – 0851-9876-5432",
    city: "Bogor",
    deadline: "2025-05-24",
    notes: "Stok bayam lebih, bisa dialokasikan hari ini.",
    status: "Rendah", // hijau
    fulfilled: true,
  },
];

// ------------ Utilities ------------
function formatIndo(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function StatusBadge({ s }: { s: Status }) {
  if (s === "Tinggi")
    return (
      <Badge
        className="bg-emerald-50 text-emerald-700 border-emerald-200"
        variant="outline"
      >
        Urgent
      </Badge>
    );
  if (s === "Sedang")
    return (
      <Badge
        className="bg-yellow-50 text-yellow-700 border-yellow-200"
        variant="outline"
      >
        Sedang
      </Badge>
    );
  return (
    <Badge
      className="bg-gray-50 text-gray-700 border-gray-200"
      variant="outline"
    >
      Selesai
    </Badge>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

// ------------ List Card ------------
// ---- helpers
function LevelPill({ level }: { level?: "Tinggi" | "Sedang" | "Rendah" }) {
  if (!level) return null;
  const cls =
    level === "Tinggi"
      ? "bg-red-100 text-red-700 border-red-200 rounded-lg"
      : level === "Sedang"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200 rounded-lg"
      : "bg-emerald-100 text-emerald-700 border-emerald-200 rounded-lg";
  return (
    <span
      className={`inline-flex items-center rounded-xl border p-2 text-xs font-medium ${cls}`}
    >
      {level}
    </span>
  );
}

function SmallMeta({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span>{children}</span>
    </span>
  );
}

// ------------ List Card sesuai Figma ------------
function RequestCard({
  item,
  isDemand, // true = Permintaan, false/undefined = Penawaran
}: {
  item: RequestItem & { level?: "Tinggi" | "Sedang" | "Rendah" };
  isDemand?: boolean;
}) {
  const chipText = `${item.amount} ${isDemand ? "dibutuhkan" : "diberikan"}`;
  const accentCls = isDemand ? "border-[#F97316]" : "border-[#4CAF50]";

  return (
    <div className="relative">
      <Card className={`border border-l-4 shadow-sm ml-3 ${accentCls}`}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-50 grid place-items-center border border-emerald-200">
                  <Box className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  {item.ingredient}
                </div>
                <Chip>{chipText}</Chip>
              </div>

              <div className="flex flex-col flex-wrap items-start gap-3 text-xs sm:text-sm text-muted-foreground">
                <SmallMeta icon={Users}>{item.org}</SmallMeta>
                <SmallMeta icon={Phone}>{item.contact}</SmallMeta>
                <SmallMeta icon={MapPin}>{item.city}</SmallMeta>
              </div>
            </div>

            <div className="text-right shrink-0 space-y-1">
              <LevelPill level={item.status} />
              <div className="text-[11px] text-muted-foreground inline-flex items-center gap-1 justify-end w-full mt-8">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>Deadline:</span>
              </div>
              <div className="text-sm sm:text-base font-medium">
                {formatIndo(item.deadline)}
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {item.notes}
          </p>
          <div className="mt-4 space-y-2">
            {/* Baris atas */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              {item.fulfilled ? (
                <>
                  <span className="inline-flex items-center rounded-md border px-4 py-3 text-xs font-medium border-emerald-300 text-emerald-700 bg-emerald-50">
                    Status:{" "}
                    {isDemand ? "Berhasil Dibantu" : "Berhasil Diterima"}
                  </span>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Hubungi Tim Kami
                  </Button>
                </>
              ) : isDemand ? (
                // permintaan belum fulfilled
                <>
                  <Button size="sm" className="w-full sm:w-auto">
                    Bantu Penuhi
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Hubungi Tim Kami
                  </Button>
                </>
              ) : (
                // penawaran belum fulfilled
                <>
                  <Button
                    size="sm"
                    className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
                  >
                    Minta Bahan
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Hubungi Tim Kami
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ------------ Page ------------
export default function RedistribusiPage() {
  const [activeTab, setActiveTab] = useState<string>("demand");
  const [q, setQ] = useState("");
  const [lokasi, setLokasi] = useState<string>("all");
  const [bahan, setBahan] = useState<string>("all");

  const stats = [
    { label: "Total Redistribusi Bulan Ini", value: "24" },
    { label: "Bahan Makanan Terselamatkan", value: "156 kg" },
    { label: "Restoran & Mitra Aktif", value: "12" },
    { label: "Nilai Ekonomi Terselamatkan", value: "Rp 2.8M" },
  ];

  const list = activeTab === "demand" ? DEMAND : SUPPLY;

  const filtered = useMemo(() => {
    return list.filter((i) => {
      const matchQ =
        !q ||
        i.ingredient.toLowerCase().includes(q.toLowerCase()) ||
        i.org.toLowerCase().includes(q.toLowerCase()) ||
        i.city.toLowerCase().includes(q.toLowerCase());
      const matchLok =
        lokasi === "all" || i.city.toLowerCase() === lokasi.toLowerCase();
      // basic example for bahan filter; in real app use category field
      const matchBahan =
        bahan === "all" ||
        i.ingredient.toLowerCase().includes(bahan.toLowerCase());
      return matchQ && matchLok && matchBahan;
    });
  }, [list, q, lokasi, bahan]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Redistribusi Stok
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Fasilitasi pertukaran bahan segar antar mitra untuk mengurangi food
            waste
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:flex">
          <Button variant="outline" className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Buat Permintaan
          </Button>
          <Button className="w-full md:w-auto">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Tawarkan Stok
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-sm">
            <CardHeader className="py-3 text-center text-[#4CAF50]">
              <CardTitle className="text-lg sm:text-2xl">{s.value}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {s.label}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-muted/20 p-2 focus-within:ring-2 focus-within:ring-primary/20">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8 h-10 text-sm"
              placeholder="Cari berdasarkan bahan atau lokasi…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {/* Lokasi */}
          <Select value={lokasi} onValueChange={setLokasi}>
            <SelectTrigger className="h-10 w-full sm:w-[200px] bg-background">
              <SelectValue placeholder="Lokasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Lokasi</SelectItem>
              <SelectItem value="Bogor">Bogor</SelectItem>
              <SelectItem value="Depok">Depok</SelectItem>
              <SelectItem value="Jakarta">Jakarta</SelectItem>
            </SelectContent>
          </Select>

          {/* Bahan */}
          <Select value={bahan} onValueChange={setBahan}>
            <SelectTrigger className="h-10 w-full sm:w-[200px] bg-background">
              <SelectValue placeholder="Bahan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Bahan</SelectItem>
              <SelectItem value="Tomat">Tomat</SelectItem>
              <SelectItem value="Bayam">Bayam</SelectItem>
              <SelectItem value="Wortel">Wortel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2 p-1 bg-muted rounded-lg">
          <TabsTrigger value="demand">
            Permintaan Stok ({DEMAND.length})
          </TabsTrigger>
          <TabsTrigger value="supply">
            Penawaran Stok ({SUPPLY.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="demand" className="space-y-3 mt-3">
          {filtered.map((it) => (
            <RequestCard key={it.id} item={it} isDemand />
          ))}
          {!filtered.length && (
            <Card>
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                Tidak ada permintaan yang cocok.
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="supply" className="space-y-3 mt-3">
          {filtered.map((it) => (
            <RequestCard key={it.id} item={it} />
          ))}
          {!filtered.length && (
            <Card>
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                Tidak ada penawaran yang cocok.
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Form */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Tambah Permintaan Baru</CardTitle>
          <CardDescription>
            Lengkapi detail bahan dan kebutuhan redistribusi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="grid gap-2">
              <div className="text-sm font-medium">Nama Bahan</div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih bahan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tomat">Tomat</SelectItem>
                  <SelectItem value="Bayam">Bayam</SelectItem>
                  <SelectItem value="Wortel">Wortel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Deadline</div>
              <Input placeholder="DD/MM/YYYY" />
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Berat/Jumlah</div>
              <Input defaultValue="10" />
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Satuan</div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih satuan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="ikat">ikat</SelectItem>
                  <SelectItem value="pak">pak</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 grid gap-2">
              <div className="text-sm font-medium">Catatan</div>
              <Textarea placeholder="Tuliskan catatan kebutuhan…" />
            </div>
          </div>
          <Separator />
          <Button className="w-full">Posting Permintaan</Button>
        </CardContent>
      </Card>
    </div>
  );
}
