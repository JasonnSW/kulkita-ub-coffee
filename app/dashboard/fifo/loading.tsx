import { Skeleton } from "@/components/ui/skeleton"

export default function FifoPageLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded-md" />
          <Skeleton className="h-4 w-80 rounded-md" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-8 w-80 rounded-md" /> 
          <Skeleton className="h-48 w-full rounded-lg" /> 
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-64 rounded-md" /> 
          <Skeleton className="h-40 w-full rounded-lg" /> 
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-64 rounded-md" /> 
          <Skeleton className="h-40 w-full rounded-lg" /> 
        </div>
      </div>
    </div>
  )
}
