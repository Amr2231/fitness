import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import type { Exercise } from "@/lib/types/exercises";
import { getYoutubeThumbnail } from "@/lib/utils/youtube";
import DifficultyLevelsTabs from "./difficulty-levels-tabs";
import SidebarSkeleton from "./sidebar-skeleton";
import clsx from "clsx";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/button";

type Props = {
  locale?: string;
  selectedLevelId?: string;
  exercises: Exercise[];
  selectedExerciseId?: string;
  onSelect: (exerciseId: string) => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
};

export default function ExercisesSidebar({
  locale,
  selectedLevelId,
  exercises,
  selectedExerciseId,
  onSelect,
  isLoading,
  isError,
  errorMessage,
}: Props) {
  // Translation
  const t = useTranslations("ExerciseDetails.sidebar");

  const fallbackWrapperClassName = "flex min-h-60 items-center justify-center";
  const playButtonClassName =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white";

  return (
    <aside className="rounded-[28px] border border-white/10 bg-white/3 p-4 backdrop-blur-sm">
      {/* Difficulty Levels */}
      <DifficultyLevelsTabs locale={locale} selectedLevelId={selectedLevelId} />

      {/* Exercises Youtube Videos */}
      <div className="max-h-180 overflow-y-auto pr-1 hide-scrollbar">
        {isLoading ? (
          <SidebarSkeleton />
        ) : isError ? (
          <div className={fallbackWrapperClassName}>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        ) : !exercises.length ? (
          <div className={fallbackWrapperClassName}>
            <p className="text-sm text-white/70">{t("noExercises")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {exercises.map((exercise) => {
              const isActive = selectedExerciseId === exercise._id;
              const videoLink =
                exercise.short_youtube_demonstration_link ||
                exercise.in_depth_youtube_explanation_link;
              const image = getYoutubeThumbnail(videoLink);
              return (
                <Button
                  variant={"link"}
                  key={exercise._id}
                  type="button"
                  onClick={() => onSelect(exercise._id)}
                  className={clsx(
                    "flex w-full items-center gap-3 rounded-2xl p-2 text-left transition",
                    isActive
                      ? "bg-white/10 ring-1 ring-primary/60"
                      : "hover:bg-white/5",
                  )}
                >
                  <img
                    src={image}
                    alt={exercise.exercise}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {exercise.exercise}
                    </h3>
                    <p className="mt-1 text-xs text-white/70">
                      {exercise.primary_equipment || t("bodyweight")} •{" "}
                      {exercise.mechanics || t("exercise")}
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      {exercise.posture || t("general")} •{" "}
                      {exercise.difficulty_level}
                    </p>
                  </div>

                  {videoLink ? (
                    <Link
                      to={videoLink}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className={clsx(playButtonClassName, "bg-primary")}
                      aria-label={t("watchOnYoutube", {
                        exercise: exercise.exercise,
                      })}
                    >
                      <Play className="h-4 w-4 fill-current" />
                    </Link>
                  ) : (
                    <div className={clsx(playButtonClassName, "bg-primary/60")}>
                      <Play className="h-4 w-4 fill-current" />
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
