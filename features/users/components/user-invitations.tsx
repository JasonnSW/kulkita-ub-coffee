"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserPlus,
  Mail,
  Copy,
  MoreHorizontal,
  Send,
  Trash2,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Invitation {
  id: string;
  email: string;
  role: string;
  department: string;
  status: "pending" | "accepted" | "expired" | "cancelled";
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  acceptedAt?: string;
  inviteCode: string;
  message?: string;
}

export function UserInvitations() {
  const { toast } = useToast();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedInvitation, setSelectedInvitation] =
    useState<Invitation | null>(null);
  const [statusFilter, setStatusFilter] = useState("");

  // Mock data
  const invitations: Invitation[] = [
    {
      id: "1",
      email: "rina.sari@gmail.com",
      role: "staff",
      department: "Dapur",
      status: "pending",
      invitedBy: "Ahmad Santoso",
      invitedAt: "2024-01-15 10:30",
      expiresAt: "2024-01-22 10:30",
      inviteCode: "INV-ABC123-XYZ789",
      message: "Selamat bergabung dengan tim Mitra Kulkita!",
    },
    {
      id: "2",
      email: "doni.pratama@gmail.com",
      role: "chef",
      department: "Dapur",
      status: "pending",
      invitedBy: "Ahmad Santoso",
      invitedAt: "2024-01-14 14:20",
      expiresAt: "2024-01-21 14:20",
      inviteCode: "INV-DEF456-ABC123",
    },
    {
      id: "3",
      email: "lisa.wijaya@gmail.com",
      role: "supervisor",
      department: "Operasional",
      status: "accepted",
      invitedBy: "Ahmad Santoso",
      invitedAt: "2024-01-10 09:15",
      expiresAt: "2024-01-17 09:15",
      acceptedAt: "2024-01-12 16:30",
      inviteCode: "INV-GHI789-DEF456",
      message: "Bergabunglah dengan tim supervisor kami!",
    },
    {
      id: "4",
      email: "andi.setiawan@gmail.com",
      role: "staff",
      department: "Gudang",
      status: "expired",
      invitedBy: "Maya Sari",
      invitedAt: "2024-01-05 11:00",
      expiresAt: "2024-01-12 11:00",
      inviteCode: "INV-JKL012-GHI789",
    },
    {
      id: "5",
      email: "sinta.dewi@gmail.com",
      role: "staff",
      department: "Dapur",
      status: "cancelled",
      invitedBy: "Sari Dewi",
      invitedAt: "2024-01-08 13:45",
      expiresAt: "2024-01-15 13:45",
      inviteCode: "INV-MNO345-JKL012",
    },
  ];

  const roles = [
    { value: "admin", label: "Administrator" },
    { value: "supervisor", label: "Supervisor" },
    { value: "chef", label: "Chef" },
    { value: "staff", label: "Staff" },
    { value: "viewer", label: "Viewer" },
  ];

  const departments = [
    { value: "manajemen", label: "Manajemen" },
    { value: "dapur", label: "Dapur" },
    { value: "gudang", label: "Gudang" },
    { value: "operasional", label: "Operasional" },
  ];

  const filteredInvitations = invitations.filter((invitation) => {
    return !statusFilter || invitation.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      expired: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
    };
    return (
      variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "expired":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleSendInvitation = () => {
    toast({
      title: "Undangan berhasil dikirim",
      description: "Email undangan telah dikirim ke alamat yang ditentukan",
    });
    setIsInviteDialogOpen(false);
  };

  const handleResendInvitation = (invitationId: string) => {
    toast({
      title: "Undangan dikirim ulang",
      description: "Email undangan telah dikirim ulang",
    });
  };

  const handleCancelInvitation = (invitationId: string) => {
    toast({
      title: "Undangan dibatalkan",
      description: "Undangan telah dibatalkan dan tidak dapat digunakan",
    });
  };

  const handleCopyInviteLink = (inviteCode: string) => {
    const inviteLink = `https://kulkita.mitra.org/invite/${inviteCode}`;
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Link disalin",
      description: "Link undangan telah disalin ke clipboard",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Undangan Pengguna</h3>
          <p className="text-sm text-gray-600">
            Kelola undangan untuk pengguna baru
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Diterima</SelectItem>
                <SelectItem value="expired">Kadaluarsa</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
            {statusFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStatusFilter("")}
                className="h-8 px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Dialog
            open={isInviteDialogOpen}
            onOpenChange={setIsInviteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Kirim Undangan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Kirim Undangan Pengguna</DialogTitle>
                <DialogDescription>
                  Undang pengguna baru untuk bergabung dengan Mitra
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-email">Email</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-department">Departemen</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih departemen" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-message">Pesan (Opsional)</Label>
                  <Textarea
                    id="invite-message"
                    placeholder="Tambahkan pesan personal untuk undangan..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsInviteDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleSendInvitation}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Kirim Undangan
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Invitation Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Undangan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invitations.length}</div>
            <p className="text-xs text-gray-600">semua waktu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {invitations.filter((inv) => inv.status === "pending").length}
            </div>
            <p className="text-xs text-gray-600">menunggu konfirmasi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Diterima</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {invitations.filter((inv) => inv.status === "accepted").length}
            </div>
            <p className="text-xs text-gray-600">berhasil bergabung</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Kadaluarsa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {invitations.filter((inv) => inv.status === "expired").length}
            </div>
            <p className="text-xs text-gray-600">perlu dikirim ulang</p>
          </CardContent>
        </Card>
      </div>

      {/* Invitations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Undangan ({filteredInvitations.length})</CardTitle>
          <CardDescription>Kelola undangan yang telah dikirim</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role & Departemen</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Diundang Oleh</TableHead>
                  <TableHead>Tanggal Undangan</TableHead>
                  <TableHead>Kadaluarsa</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvitations.map((invitation) => (
                  <TableRow key={invitation.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{invitation.email}</div>
                        <div className="text-xs text-gray-500">
                          Kode: {invitation.inviteCode}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Badge variant="outline" className="mb-1">
                          {
                            roles.find((r) => r.value === invitation.role)
                              ?.label
                          }
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {invitation.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(invitation.status)}
                        <Badge className={getStatusBadge(invitation.status)}>
                          {invitation.status === "pending"
                            ? "Pending"
                            : invitation.status === "accepted"
                            ? "Diterima"
                            : invitation.status === "expired"
                            ? "Kadaluarsa"
                            : "Dibatalkan"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {invitation.invitedBy}
                    </TableCell>
                    <TableCell className="text-sm">
                      {invitation.invitedAt}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div
                        className={
                          invitation.status === "expired" ? "text-red-600" : ""
                        }
                      >
                        {invitation.expiresAt}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleCopyInviteLink(invitation.inviteCode)
                            }
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Salin Link
                          </DropdownMenuItem>
                          {invitation.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleResendInvitation(invitation.id)
                                }
                              >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Kirim Ulang
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleCancelInvitation(invitation.id)
                                }
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Batalkan
                              </DropdownMenuItem>
                            </>
                          )}
                          {invitation.status === "expired" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleResendInvitation(invitation.id)
                              }
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Kirim Baru
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInvitations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada undangan yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invitation Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Cara Kerja Undangan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-800">
                1
              </div>
              <div>
                <div className="font-medium">Kirim Undangan</div>
                <div className="text-sm text-gray-600">
                  Masukkan email dan pilih role untuk pengguna baru. Sistem akan
                  mengirim email undangan otomatis.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-800">
                2
              </div>
              <div>
                <div className="font-medium">Penerima Membuka Link</div>
                <div className="text-sm text-gray-600">
                  Penerima akan mendapat email dengan link undangan yang berlaku
                  selama 7 hari.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-800">
                3
              </div>
              <div>
                <div className="font-medium">Registrasi & Aktivasi</div>
                <div className="text-sm text-gray-600">
                  Penerima melengkapi data dan membuat password. Akun langsung
                  aktif setelah registrasi.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-800">
                4
              </div>
              <div>
                <div className="font-medium">Akses Sistem</div>
                <div className="text-sm text-gray-600">
                  Pengguna baru dapat langsung mengakses sistem sesuai dengan
                  role yang diberikan.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
