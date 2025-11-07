import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 animate-pulse">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-10 w-64 rounded-md" />
        <Skeleton className="h-6 w-32 rounded-md" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="h-5 w-28 rounded-md mb-2" />
            <Skeleton className="h-8 w-16 rounded-md mb-1" />
            <Skeleton className="h-3 w-32 rounded-md" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[ "Kelola Pengguna", "Role & Permission", "Aktivitas", "Undangan" ].map((title, i) => (
          <Skeleton key={i} className="h-10 rounded-md" />
        ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-48 rounded-md mb-2" />
        <Skeleton className="h-4 w-64 rounded-md mb-6" />
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    </div>
  )
}
