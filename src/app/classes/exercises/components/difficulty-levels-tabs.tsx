import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useLevels } from "@/lib/hooks/use-levels";

type Props = {
  locale?: string;
  selectedLevelId?: string;
};

export default function DifficultyLevelsTabs({
  locale,
  selectedLevelId,
}: Props) {
  //Queries
  const { data: levels = [], isLoading, isError, error } = useLevels(locale!);

  // Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  // Sets a default level in the URL when none is selected
  useEffect(() => {
    if (!selectedLevelId && levels.length > 0) {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.set("level", levels[0]._id);
      setSearchParams(nextSearchParams, { replace: true });
    }
  }, [levels, searchParams, selectedLevelId, setSearchParams]);

  const handleLevelClick = (levelId: string) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("level", levelId);
    setSearchParams(nextSearchParams);
  };

  if (isLoading) {
    return (
      <div className="mb-4 overflow-x-auto hide-scrollbar">
        <div className="flex min-w-max gap-2 pb-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-white/10"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-4 flex justify-center">
        <p className="text-sm text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="mb-4 overflow-hidden" ref={emblaRef}>
      <div className="flex gap-2">
        {levels.map((level) => {
          const isActive = selectedLevelId === level._id;
          return (
            <Button
              variant={"link"}
              key={level._id}
              type="button"
              onClick={() => handleLevelClick(level._id)}
              className={clsx(
                "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "bg-primary text-white"
                  : "bg-transparent text-white/70 hover:text-white",
              )}
            >
              {level.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
