export function MuscleCardSkeleton() {
  return (
    <div className="bg-white/30 dark:bg-black/30 backdrop-blur-lg rounded-3xl w-100 h-96 shadow-sm p-3 animate-pulse">
      {/* Image */}
      <div className="w-full h-3/4 bg-gray-300 dark:bg-gray-700 rounded-3xl" />

      {/* Title */}
      <div className="mt-3 ps-4 space-y-2">
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* Footer */}
      <div className="mt-4 ps-4">
        <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
