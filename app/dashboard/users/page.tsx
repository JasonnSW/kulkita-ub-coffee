import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "@/features/users/components/user-management";
import { UserRoles } from "@/features/users/components/user-roles";
import { UserActivity } from "@/features/users/components/user-activity";
import { UserInvitations } from "@/features/users/components/user-invitations";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Shield, Activity, UserPlus } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Manajemen Pengguna
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Mitra Kulkita</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pengguna
            </CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">24</div>
            <p className="text-xs text-gray-600">+2 dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pengguna Aktif
            </CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">18</div>
            <p className="text-xs text-gray-600">aktif 7 hari terakhir</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Undangan Pending
            </CardTitle>
            <UserPlus className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-gray-600">menunggu konfirmasi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Role Tersedia</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">5</div>
            <p className="text-xs text-gray-600">level akses berbeda</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="management" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="management">Kelola Pengguna</TabsTrigger>
          <TabsTrigger value="roles">Role & Permission</TabsTrigger>
          <TabsTrigger value="activity">Aktivitas</TabsTrigger>
          <TabsTrigger value="invitations">Undangan</TabsTrigger>
        </TabsList>

        <TabsContent value="management" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Manajemen Pengguna
              </CardTitle>
              <CardDescription>
                Kelola akun pengguna, ubah informasi profil, dan atur status
                keaktifan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <UserManagement />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Role & Permission
              </CardTitle>
              <CardDescription>
                Atur role pengguna dan permission akses fitur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <UserRoles />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600" />
                Log Aktivitas
              </CardTitle>
              <CardDescription>
                Monitor aktivitas pengguna dan audit trail sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <UserActivity />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-orange-600" />
                Undangan Pengguna
              </CardTitle>
              <CardDescription>
                Kirim undangan dan kelola akses pengguna baru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <UserInvitations />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
