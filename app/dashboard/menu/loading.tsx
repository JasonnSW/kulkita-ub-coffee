export default function Loading() {
  const rows = [1, 2, 3];

  return (
    <div className="h-full w-full px-6 py-6 md:px-10 md:py-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-8 w-40 rounded-md bg-slate-200 animate-pulse" />
          <div className="h-4 w-72 rounded-md bg-slate-200 animate-pulse" />
        </div>

        <div className="h-10 w-44 rounded-lg bg-slate-200 animate-pulse" />
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Table header */}
        <div className="grid grid-cols-[2.3fr,1fr,1.2fr,0.9fr,40px] border-b bg-slate-50 px-6 py-3 text-sm font-medium text-slate-500">
          <div>Nama Menu</div>
          <div>Kategori</div>
          <div>Bahan</div>
          <div>Status</div>
          <div className="text-right">Aksi</div>
        </div>

        {/* Table body (skeleton rows) */}
        <div className="divide-y divide-slate-100">
          {rows.map((row) => (
            <div
              key={row}
              className="grid grid-cols-[2.3fr,1fr,1.2fr,0.9fr,40px] px-6 py-4 text-sm"
            >
              {/* Nama + deskripsi */}
              <div className="space-y-2 pr-4">
                <div className="h-4 w-44 rounded bg-slate-200 animate-pulse" />
                <div className="h-3 w-64 rounded bg-slate-100 animate-pulse" />
                <div className="h-3 w-52 rounded bg-slate-100 animate-pulse" />
              </div>

              {/* Kategori */}
              <div className="flex items-center">
                <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
              </div>

              {/* Bahan (chips) */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-6 w-14 rounded-full bg-slate-100 animate-pulse" />
                <div className="h-6 w-14 rounded-full bg-slate-100 animate-pulse" />
              </div>

              {/* Status badge */}
              <div className="flex items-center">
                <div className="h-6 w-14 rounded-full bg-emerald-100 animate-pulse" />
              </div>

              {/* Aksi (dots icon) */}
              <div className="flex items-center justify-end">
                <div className="h-6 w-6 rounded-full bg-slate-100 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
