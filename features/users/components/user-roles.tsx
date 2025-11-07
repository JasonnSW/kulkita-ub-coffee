"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Users, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: string[]
  color: string
  isSystem: boolean
}

export function UserRoles() {
  const { toast } = useToast()
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const permissions: Permission[] = [
    {
      id: "inventory_view",
      name: "Lihat Inventaris",
      description: "Dapat melihat data inventaris",
      category: "Inventaris",
    },
    {
      id: "inventory_edit",
      name: "Edit Inventaris",
      description: "Dapat mengedit data inventaris",
      category: "Inventaris",
    },
    {
      id: "inventory_delete",
      name: "Hapus Inventaris",
      description: "Dapat menghapus data inventaris",
      category: "Inventaris",
    },
    {
      id: "usage_view",
      name: "Lihat Penggunaan",
      description: "Dapat melihat data penggunaan",
      category: "Penggunaan",
    },
    {
      id: "usage_create",
      name: "Catat Penggunaan",
      description: "Dapat mencatat penggunaan bahan",
      category: "Penggunaan",
    },
    { id: "reports_view", name: "Lihat Laporan", description: "Dapat melihat laporan", category: "Laporan" },
    { id: "reports_export", name: "Export Laporan", description: "Dapat mengexport laporan", category: "Laporan" },
    { id: "users_view", name: "Lihat Pengguna", description: "Dapat melihat daftar pengguna", category: "Pengguna" },
    { id: "users_manage", name: "Kelola Pengguna", description: "Dapat mengelola pengguna", category: "Pengguna" },
    { id: "settings_view", name: "Lihat Pengaturan", description: "Dapat melihat pengaturan", category: "Pengaturan" },
    { id: "settings_edit", name: "Edit Pengaturan", description: "Dapat mengedit pengaturan", category: "Pengaturan" },
  ]

  const roles: Role[] = [
    {
      id: "admin",
      name: "Administrator",
      description: "Akses penuh ke semua fitur sistem",
      userCount: 2,
      permissions: permissions.map((p) => p.id),
      color: "bg-red-100 text-red-800",
      isSystem: true,
    },
    {
      id: "supervisor",
      name: "Supervisor",
      description: "Akses manajemen dan monitoring",
      userCount: 3,
      permissions: [
        "inventory_view",
        "inventory_edit",
        "usage_view",
        "usage_create",
        "reports_view",
        "reports_export",
        "users_view",
      ],
      color: "bg-blue-100 text-blue-800",
      isSystem: true,
    },
    {
      id: "chef",
      name: "Chef",
      description: "Akses untuk pengelolaan dapur dan penggunaan bahan",
      userCount: 8,
      permissions: ["inventory_view", "usage_view", "usage_create", "reports_view"],
      color: "bg-green-100 text-green-800",
      isSystem: true,
    },
    {
      id: "staff",
      name: "Staff",
      description: "Akses terbatas untuk operasional harian",
      userCount: 10,
      permissions: ["inventory_view", "usage_view", "usage_create"],
      color: "bg-gray-100 text-gray-800",
      isSystem: true,
    },
    {
      id: "viewer",
      name: "Viewer",
      description: "Hanya dapat melihat data tanpa edit",
      userCount: 1,
      permissions: ["inventory_view", "usage_view", "reports_view"],
      color: "bg-purple-100 text-purple-800",
      isSystem: false,
    },
  ]

  const permissionCategories = [...new Set(permissions.map((p) => p.category))]

  const handleCreateRole = () => {
    toast({
      title: "Role berhasil dibuat",
      description: "Role baru telah ditambahkan ke sistem",
    })
    setIsCreateDialogOpen(false)
  }

  const handleEditRole = (role: Role) => {
    setSelectedRole(role)
    setIsEditDialogOpen(true)
  }

  const handleSaveRole = () => {
    toast({
      title: "Role berhasil diperbarui",
      description: "Perubahan role telah disimpan",
    })
    setIsEditDialogOpen(false)
    setSelectedRole(null)
  }

  const handleDeleteRole = (roleId: string) => {
    toast({
      title: "Role berhasil dihapus",
      description: "Role telah dihapus dari sistem",
    })
  }

  const RolePermissionForm = ({ role, isEdit = false }: { role?: Role; isEdit?: boolean }) => {
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(role?.permissions || [])
    const [roleName, setRoleName] = useState(role?.name || "")
    const [roleDescription, setRoleDescription] = useState(role?.description || "")

    const togglePermission = (permissionId: string) => {
      setSelectedPermissions((prev) =>
        prev.includes(permissionId) ? prev.filter((id) => id !== permissionId) : [...prev, permissionId],
      )
    }

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role-name">Nama Role</Label>
            <Input
              id="role-name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Masukkan nama role"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role-description">Deskripsi</Label>
            <Textarea
              id="role-description"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              placeholder="Deskripsi role dan tanggung jawabnya"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Permission</Label>
          <Tabs defaultValue={permissionCategories[0]}>
            <TabsList className="grid w-full grid-cols-5">
              {permissionCategories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {permissionCategories.map((category) => (
              <TabsContent key={category} value={category} className="space-y-3">
                {permissions
                  .filter((p) => p.category === category)
                  .map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{permission.name}</div>
                        <div className="text-xs text-gray-500">{permission.description}</div>
                      </div>
                      <Switch
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={() => togglePermission(permission.id)}
                      />
                    </div>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => (isEdit ? setIsEditDialogOpen(false) : setIsCreateDialogOpen(false))}
          >
            Batal
          </Button>
          <Button onClick={isEdit ? handleSaveRole : handleCreateRole} className="bg-green-600 hover:bg-green-700">
            {isEdit ? "Simpan Perubahan" : "Buat Role"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Role & Permission</h3>
          <p className="text-sm text-gray-600">Kelola role pengguna dan permission akses</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Buat Role Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Buat Role Baru</DialogTitle>
              <DialogDescription>Buat role baru dengan permission yang sesuai</DialogDescription>
            </DialogHeader>
            <RolePermissionForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <Card key={role.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className={role.color}>{role.name}</Badge>
                {role.isSystem && (
                  <Badge variant="outline" className="text-xs">
                    System
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{role.name}</CardTitle>
              <CardDescription className="text-sm">{role.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Pengguna:</span>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {role.userCount}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Permission:</span>
                <span className="font-medium">{role.permissions.length} akses</span>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEditRole(role)} className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {!role.isSystem && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Matrix Permission</CardTitle>
          <CardDescription>Overview permission untuk setiap role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48">Permission</TableHead>
                  {roles.map((role) => (
                    <TableHead key={role.id} className="text-center min-w-24">
                      <Badge className={role.color} variant="outline">
                        {role.name}
                      </Badge>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{permission.name}</div>
                        <div className="text-xs text-gray-500">{permission.category}</div>
                      </div>
                    </TableCell>
                    {roles.map((role) => (
                      <TableCell key={role.id} className="text-center">
                        {role.permissions.includes(permission.id) ? (
                          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
                        ) : (
                          <div className="w-4 h-4 bg-gray-200 rounded-full mx-auto"></div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role: {selectedRole?.name}</DialogTitle>
            <DialogDescription>Perbarui permission dan pengaturan role</DialogDescription>
          </DialogHeader>
          {selectedRole && <RolePermissionForm role={selectedRole} isEdit={true} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
