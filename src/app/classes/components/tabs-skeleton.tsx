export default function TabsSkeleton() {
  return (
    <div className="my-6 flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className={`h-10 animate-pulse rounded-full bg-white/10 ${
            index % 3 === 0 ? "w-20" : index % 3 === 1 ? "w-28" : "w-24"
          }`}
        />
      ))}
    </div>
  );
}
