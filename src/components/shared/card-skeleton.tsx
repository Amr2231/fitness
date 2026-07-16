export function CardSkeleton() {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg w-full h-90">
      {/* Image */}
      <div className="w-full h-full bg-white/10 animate-pulse" />

      {/* Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-[#24242480]/90 backdrop-blur-sm">
        <div className="h-4 w-3/4 bg-white/10 rounded mb-3 animate-pulse" />

        <div className="flex items-center gap-2">
          <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
          <div className="h-6 w-6 bg-white/10 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
