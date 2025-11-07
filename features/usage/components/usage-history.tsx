"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search, Filter, Download, Eye } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface UsageRecord {
  id: string
  date: string
  mealType: string
  materialName: string
  quantity: number
  unit: string
  batch: string
  user: string
  notes?: string
}

export function UsageHistory() {
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [mealTypeFilter, setMealTypeFilter] = useState("")
  const [materialFilter, setMaterialFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const usageRecords: UsageRecord[] = [
    {
      id: "1",
      date: "2024-01-15",
      mealType: "sarapan",
      materialName: "Beras Premium",
      quantity: 5,
      unit: "kg",
      batch: "B001",
      user: "Chef Ahmad",
      notes: "Untuk nasi goreng sarapan",
    },
    {
      id: "2",
      date: "2024-01-15",
      mealType: "sarapan",
      materialName: "Ayam Fillet",
      quantity: 2.5,
      unit: "kg",
      batch: "B002",
      user: "Chef Ahmad",
    },
    {
      id: "3",
      date: "2024-01-15",
      mealType: "makan-siang",
      materialName: "Wortel",
      quantity: 3,
      unit: "kg",
      batch: "B003",
      user: "Chef Sari",
      notes: "Untuk sayur sop",
    },
    {
      id: "4",
      date: "2024-01-14",
      mealType: "makan-siang",
      materialName: "Bawang Merah",
      quantity: 1.5,
      unit: "kg",
      batch: "B004",
      user: "Chef Ahmad",
    },
    {
      id: "5",
      date: "2024-01-14",
      mealType: "snack",
      materialName: "Minyak Goreng",
      quantity: 2,
      unit: "liter",
      batch: "B005",
      user: "Chef Sari",
      notes: "Untuk gorengan snack",
    },
  ]

  const filteredRecords = usageRecords.filter((record) => {
    const matchesSearch =
      record.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMealType = !mealTypeFilter || record.mealType === mealTypeFilter
    const matchesMaterial = !materialFilter || record.materialName.toLowerCase().includes(materialFilter.toLowerCase())

    return matchesSearch && matchesMealType && matchesMaterial
  })

  const getMealTypeBadge = (mealType: string) => {
    const variants = {
      sarapan: "bg-yellow-100 text-yellow-800",
      "makan-siang": "bg-blue-100 text-blue-800",
      snack: "bg-purple-100 text-purple-800",
      persiapan: "bg-gray-100 text-gray-800",
    }
    return variants[mealType as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const exportData = () => {
    // Handle export functionality
    console.log("Exporting data...")
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Tanggal Dari</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP", { locale: id }) : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Tanggal Sampai</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP", { locale: id }) : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Jenis Menu</Label>
              <Select value={mealTypeFilter} onValueChange={setMealTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua jenis menu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua jenis menu</SelectItem>
                  <SelectItem value="sarapan">Sarapan</SelectItem>
                  <SelectItem value="makan-siang">Makan Siang</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                  <SelectItem value="persiapan">Persiapan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Cari</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari bahan atau user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Menampilkan {filteredRecords.length} dari {usageRecords.length} record
            </div>
            <Button onClick={exportData} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Penggunaan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jenis Menu</TableHead>
                  <TableHead>Bahan</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Catatan</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {format(new Date(record.date), "dd MMM yyyy", { locale: id })}
                    </TableCell>
                    <TableCell>
                      <Badge className={getMealTypeBadge(record.mealType)}>{record.mealType.replace("-", " ")}</Badge>
                    </TableCell>
                    <TableCell>{record.materialName}</TableCell>
                    <TableCell>
                      {record.quantity} {record.unit}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.batch}</Badge>
                    </TableCell>
                    <TableCell>{record.user}</TableCell>
                    <TableCell className="max-w-xs truncate">{record.notes || "-"}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-gray-500">Tidak ada data penggunaan yang ditemukan</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
