import { MuscleCardSkeleton } from "./muscle-card-skeleton";

export function CarouselSkeleton() {
  return (
    <div className="flex gap-6 overflow-x-auto px-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <MuscleCardSkeleton key={i} />
      ))}
    </div>
  );
}
