"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Download, FileText, Mail, Printer } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function UsageReport() {
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [reportType, setReportType] = useState("")
  const [selectedSections, setSelectedSections] = useState({
    summary: true,
    detailed: true,
    analytics: true,
    efficiency: true,
    recommendations: false,
  })

  const reportTypes = [
    { value: "daily", label: "Laporan Harian", description: "Ringkasan penggunaan per hari" },
    { value: "weekly", label: "Laporan Mingguan", description: "Analisis penggunaan per minggu" },
    { value: "monthly", label: "Laporan Bulanan", description: "Tren dan analisis bulanan" },
    { value: "custom", label: "Periode Kustom", description: "Pilih rentang tanggal sendiri" },
  ]

  const handleSectionChange = (section: string, checked: boolean) => {
    setSelectedSections((prev) => ({
      ...prev,
      [section]: checked,
    }))
  }

  const generateReport = (format: string) => {
    console.log("Generating report:", {
      type: reportType,
      dateFrom,
      dateTo,
      sections: selectedSections,
      format,
    })
  }

  const sendReport = () => {
    console.log("Sending report via email")
  }

  const printReport = () => {
    console.log("Printing report")
  }

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Konfigurasi Laporan</CardTitle>
            <CardDescription>Pilih jenis dan periode laporan yang ingin dibuat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Report Type */}
            <div className="space-y-2">
              <Label>Jenis Laporan</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis laporan" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            {(reportType === "custom" || reportType) && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tanggal Mulai</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateFrom && "text-muted-foreground",
                        )}
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
                  <Label>Tanggal Selesai</Label>
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
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Konten Laporan</CardTitle>
            <CardDescription>Pilih bagian yang ingin disertakan dalam laporan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="summary"
                  checked={selectedSections.summary}
                  onCheckedChange={(checked) => handleSectionChange("summary", checked as boolean)}
                />
                <Label htmlFor="summary" className="text-sm font-medium">
                  Ringkasan Eksekutif
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="detailed"
                  checked={selectedSections.detailed}
                  onCheckedChange={(checked) => handleSectionChange("detailed", checked as boolean)}
                />
                <Label htmlFor="detailed" className="text-sm font-medium">
                  Data Detail Penggunaan
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="analytics"
                  checked={selectedSections.analytics}
                  onCheckedChange={(checked) => handleSectionChange("analytics", checked as boolean)}
                />
                <Label htmlFor="analytics" className="text-sm font-medium">
                  Analisis & Grafik
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="efficiency"
                  checked={selectedSections.efficiency}
                  onCheckedChange={(checked) => handleSectionChange("efficiency", checked as boolean)}
                />
                <Label htmlFor="efficiency" className="text-sm font-medium">
                  Metrik Efisiensi
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recommendations"
                  checked={selectedSections.recommendations}
                  onCheckedChange={(checked) => handleSectionChange("recommendations", checked as boolean)}
                />
                <Label htmlFor="recommendations" className="text-sm font-medium">
                  Rekomendasi & Insight
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview Laporan</CardTitle>
          <CardDescription>Pratinjau konten yang akan disertakan dalam laporan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedSections.summary && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">📊 Ringkasan Eksekutif</h4>
                <p className="text-sm text-gray-600">
                  Ringkasan kinerja penggunaan bahan, efisiensi, dan pencapaian target.
                </p>
              </div>
            )}

            {selectedSections.detailed && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">📋 Data Detail Penggunaan</h4>
                <p className="text-sm text-gray-600">Tabel lengkap penggunaan bahan per hari, jenis menu, dan batch.</p>
              </div>
            )}

            {selectedSections.analytics && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">📈 Analisis & Grafik</h4>
                <p className="text-sm text-gray-600">
                  Grafik tren penggunaan, distribusi per jenis menu, dan perbandingan periode.
                </p>
              </div>
            )}

            {selectedSections.efficiency && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">⚡ Metrik Efisiensi</h4>
                <p className="text-sm text-gray-600">KPI efisiensi penggunaan, waste ratio, dan stock turnover.</p>
              </div>
            )}

            {selectedSections.recommendations && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">💡 Rekomendasi & Insight</h4>
                <p className="text-sm text-gray-600">Saran perbaikan, optimasi penggunaan, dan prediksi kebutuhan.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generate Report Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Laporan</CardTitle>
          <CardDescription>Pilih format dan cara distribusi laporan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => generateReport("pdf")}
                disabled={!reportType}
                className="bg-red-600 hover:bg-red-700"
              >
                <FileText className="mr-2 h-4 w-4" />
                Download PDF
              </Button>

              <Button
                onClick={() => generateReport("excel")}
                disabled={!reportType}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Excel
              </Button>

              <Button onClick={printReport} disabled={!reportType} variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Print Laporan
              </Button>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Kirim via Email</h4>
                <p className="text-sm text-gray-600">Kirim laporan langsung ke email yang ditentukan</p>
              </div>
              <Button onClick={sendReport} variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Kirim Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Laporan Terbaru</CardTitle>
          <CardDescription>Riwayat laporan yang telah dibuat sebelumnya</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Laporan Mingguan - 8-14 Jan 2024", date: "15 Jan 2024", type: "PDF" },
              { name: "Laporan Bulanan - Desember 2023", date: "1 Jan 2024", type: "Excel" },
              { name: "Laporan Harian - 14 Jan 2024", date: "14 Jan 2024", type: "PDF" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{report.name}</div>
                  <div className="text-sm text-gray-500">Dibuat: {report.date}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{report.type}</span>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
