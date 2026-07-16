export function TabsSkeleton() {
  return (
    <div className="flex gap-2 overflow-x-auto w-180 mx-auto">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-28 rounded-3xl bg-gray-300 dark:bg-gray-700 animate-pulse"
        />
      ))}
    </div>
  );
}
