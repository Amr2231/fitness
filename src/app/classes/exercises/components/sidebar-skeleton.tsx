export default function SidebarSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-2xl bg-white/4 p-2"
        >
          <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
          </div>
          <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}
