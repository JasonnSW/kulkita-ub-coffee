"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Search,
  Download,
  Filter,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "lucide-react";

interface ActivityLog {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  action: string;
  description: string;
  category: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: "success" | "warning" | "error" | "info";
  details?: any;
}

export function UserActivity() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const activityLogs: ActivityLog[] = [
    {
      id: "1",
      user: { name: "Ahmad Santoso", email: "ahmad.santoso@gmail.org" },
      action: "LOGIN",
      description: "User berhasil login ke sistem",
      category: "Authentication",
      timestamp: "2024-01-15 09:30:15",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
    },
    {
      id: "2",
      user: { name: "Sari Dewi", email: "sari.dewi@gmail.org" },
      action: "CREATE_USAGE",
      description: "Mencatat penggunaan bahan: Beras Premium 5kg",
      category: "Usage",
      timestamp: "2024-01-15 08:45:22",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      details: { material: "Beras Premium", quantity: 5, unit: "kg" },
    },
    {
      id: "3",
      user: { name: "Budi Prasetyo", email: "budi.prasetyo@gmail.org" },
      action: "UPDATE_INVENTORY",
      description: "Memperbarui stok inventaris: Ayam Fillet",
      category: "Inventory",
      timestamp: "2024-01-15 07:20:10",
      ipAddress: "192.168.1.102",
      userAgent:
        "Mozilla/5.0 (Android 10; Mobile; rv:81.0) Gecko/81.0 Firefox/81.0",
      status: "success",
      details: { material: "Ayam Fillet", oldStock: 20, newStock: 25 },
    },
    {
      id: "4",
      user: { name: "Maya Sari", email: "maya.sari@gmail.org" },
      action: "FAILED_LOGIN",
      description: "Percobaan login gagal - password salah",
      category: "Authentication",
      timestamp: "2024-01-15 06:15:33",
      ipAddress: "192.168.1.103",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)",
      status: "error",
    },
  ];

  const categories = [
    "Authentication",
    "Inventory",
    "Usage",
    "Reports",
    "User Management",
    "Settings",
  ];
  const users = [...new Set(activityLogs.map((log) => log.user.name))];

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = !userFilter || log.user.name === userFilter;
    const matchesCategory = !categoryFilter || log.category === categoryFilter;
    const matchesStatus = !statusFilter || log.status === statusFilter;

    return matchesSearch && matchesUser && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
      info: "bg-blue-100 text-blue-800",
    };
    return (
      variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
    );
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      Authentication: "bg-purple-100 text-purple-800",
      Inventory: "bg-green-100 text-green-800",
      Usage: "bg-blue-100 text-blue-800",
      Reports: "bg-orange-100 text-orange-800",
      "User Management": "bg-red-100 text-red-800",
      Settings: "bg-gray-100 text-gray-800",
    };
    return (
      variants[category as keyof typeof variants] || "bg-gray-100 text-gray-800"
    );
  };

  const exportLogs = () => {
    console.log("Exporting activity logs...");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Aktivitas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Pencarian</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari aktivitas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Pengguna</Label>
              <div className="flex items-center space-x-2">
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pengguna" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user} value={user}>
                        {user}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {userFilter && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUserFilter("")}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kategori</Label>
              <div className="flex items-center space-x-2">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {categoryFilter && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCategoryFilter("")}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex items-center space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
                {statusFilter && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStatusFilter("")}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Menampilkan {filteredLogs.length} dari {activityLogs.length}{" "}
              aktivitas
            </div>
            <Button onClick={exportLogs} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Log
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Aktivitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredLogs.length}</div>
            <p className="text-xs text-gray-600">dalam periode ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {filteredLogs.filter((log) => log.status === "success").length}
            </div>
            <p className="text-xs text-gray-600">aktivitas berhasil</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Warning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {filteredLogs.filter((log) => log.status === "warning").length}
            </div>
            <p className="text-xs text-gray-600">perlu perhatian</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {filteredLogs.filter((log) => log.status === "error").length}
            </div>
            <p className="text-xs text-gray-600">aktivitas gagal</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Aktivitas</CardTitle>
          <CardDescription>
            Riwayat aktivitas pengguna dalam sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Aktivitas</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={log.user.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback className="bg-green-100 text-green-800">
                            {log.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {log.user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {log.user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{log.action}</div>
                        <div className="text-xs text-gray-500">
                          {log.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryBadge(log.category)}>
                        {log.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{log.timestamp}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {log.ipAddress}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(log.status)}
                        <Badge className={getStatusBadge(log.status)}>
                          {log.status}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada aktivitas yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
