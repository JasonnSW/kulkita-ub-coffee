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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  joinDate: string;
  avatar?: string;
  department?: string;
}

export function UserManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const users: User[] = [
    {
      id: "1",
      name: "Ahmad Santoso",
      email: "ahmad.santoso@gmail.org",
      phone: "081234567890",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 09:30",
      joinDate: "2023-06-15",
      department: "Manajemen",
    },
    {
      id: "2",
      name: "Sari Dewi",
      email: "sari.dewi@gmail.org",
      phone: "081234567891",
      role: "chef",
      status: "active",
      lastLogin: "2024-01-15 08:15",
      joinDate: "2023-07-20",
      department: "Dapur",
    },
    {
      id: "3",
      name: "Budi Prasetyo",
      email: "budi.prasetyo@gmail.org",
      phone: "081234567892",
      role: "staff",
      status: "active",
      lastLogin: "2024-01-14 16:45",
      joinDate: "2023-08-10",
      department: "Gudang",
    },
    {
      id: "4",
      name: "Maya Sari",
      email: "maya.sari@gmail.org",
      phone: "081234567893",
      role: "supervisor",
      status: "inactive",
      lastLogin: "2024-01-10 14:20",
      joinDate: "2023-05-05",
      department: "Operasional",
    },
    {
      id: "5",
      name: "Eko Wijaya",
      email: "eko.wijaya@gmail.org",
      role: "staff",
      status: "pending",
      lastLogin: "-",
      joinDate: "2024-01-15",
      department: "Gudang",
    },
  ];

  const roles = [
    {
      value: "admin",
      label: "Administrator",
      color: "bg-red-100 text-red-800",
    },
    {
      value: "supervisor",
      label: "Supervisor",
      color: "bg-blue-100 text-blue-800",
    },
    { value: "chef", label: "Chef", color: "bg-green-100 text-green-800" },
    { value: "staff", label: "Staff", color: "bg-gray-100 text-gray-800" },
    {
      value: "viewer",
      label: "Viewer",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    const roleConfig = roles.find((r) => r.value === role);
    return roleConfig
      ? roleConfig
      : { label: role, color: "bg-gray-100 text-gray-800" };
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return (
      variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
    );
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "Pengguna dihapus",
      description: "Pengguna berhasil dihapus dari sistem",
    });
  };

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast({
      title: "Status diperbarui",
      description: `Status pengguna berhasil diubah menjadi ${newStatus}`,
    });
  };

  const handleSaveUser = () => {
    toast({
      title: "Pengguna disimpan",
      description: "Data pengguna berhasil diperbarui",
    });
    setIsEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    toast({
      title: "Pengguna ditambahkan",
      description: "Pengguna baru berhasil ditambahkan ke sistem",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari pengguna..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {roleFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRoleFilter("")}
              className="h-8 px-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Tidak Aktif</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
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

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Pengguna
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Pengguna Baru</DialogTitle>
              <DialogDescription>
                Tambahkan pengguna baru ke sistem Mitra
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-name">Nama Lengkap</Label>
                <Input id="new-name" placeholder="Masukkan nama lengkap" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-email">Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  placeholder="email@gmail.org"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-phone">Nomor Telepon</Label>
                <Input id="new-phone" placeholder="081234567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-role">Role</Label>
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
                <Label htmlFor="new-department">Departemen</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manajemen">Manajemen</SelectItem>
                    <SelectItem value="dapur">Dapur</SelectItem>
                    <SelectItem value="gudang">Gudang</SelectItem>
                    <SelectItem value="operasional">Operasional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  onClick={handleAddUser}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Tambah Pengguna
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Departemen</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Login Terakhir</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback className="bg-green-100 text-green-800">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            Bergabung: {user.joinDate}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadge(user.role).color}>
                        {getRoleBadge(user.role).label}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status === "active"
                          ? "Aktif"
                          : user.status === "inactive"
                          ? "Tidak Aktif"
                          : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {user.lastLogin}
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
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleToggleStatus(user.id, user.status)
                            }
                          >
                            {user.status === "active" ? (
                              <>
                                <UserX className="mr-2 h-4 w-4" />
                                Nonaktifkan
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Aktifkan
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Pengguna</DialogTitle>
            <DialogDescription>Perbarui informasi pengguna</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nama Lengkap</Label>
                <Input id="edit-name" defaultValue={selectedUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedUser.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Nomor Telepon</Label>
                <Input id="edit-phone" defaultValue={selectedUser.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger>
                    <SelectValue />
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
                <Label htmlFor="edit-department">Departemen</Label>
                <Select defaultValue={selectedUser.department}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manajemen">Manajemen</SelectItem>
                    <SelectItem value="dapur">Dapur</SelectItem>
                    <SelectItem value="gudang">Gudang</SelectItem>
                    <SelectItem value="operasional">Operasional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch defaultChecked={selectedUser.status === "active"} />
                <Label>Pengguna Aktif</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  onClick={handleSaveUser}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Simpan
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
