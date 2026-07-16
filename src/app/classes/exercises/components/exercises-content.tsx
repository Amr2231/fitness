import { useEffect, useMemo, useState } from "react";
import ExercisesSidebar from "./exercises-sidebar";
import { useExercisesByDifficulty } from "@/lib/hooks/use-exercises";
import ExercisePreviewPanel from "./exercise-preview-panel";
import Card from "@/components/shared/card";
import { HealthyCards } from "@/app/home/healthy-section/healthy-cards";
import { Link } from "react-router-dom";
import { useTranslations } from "use-intl";

type Props = {
  locale?: string;
  primeMoverMuscleId?: string;
  difficultyLevelId?: string;
};

export default function ExercisesContent({
  locale,
  primeMoverMuscleId,
  difficultyLevelId,
}: Props) {
  // Translation
  const t = useTranslations("ExerciseDetails.content");

  // states
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>();

  // Queries
  const { data, isLoading, isError, error } = useExercisesByDifficulty(
    primeMoverMuscleId,
    difficultyLevelId,
    locale!,
  );

  // Varibales
  const cards = HealthyCards();
  const exercises = data?.exercises ?? [];

  useEffect(() => {
    if (
      exercises.length > 0 &&
      (!selectedExerciseId ||
        !exercises.some((exercise) => exercise._id === selectedExerciseId))
    ) {
      setSelectedExerciseId(exercises[0]._id);
    }
  }, [exercises, selectedExerciseId]);

  const selectedExercise = useMemo(() => {
    return (
      exercises.find((exercise) => exercise._id === selectedExerciseId) ??
      exercises[0] ??
      null
    );
  }, [exercises, selectedExerciseId]);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* // Sidebar  */}
      <div className="col-span-3">
        <ExercisesSidebar
          locale={locale}
          selectedLevelId={difficultyLevelId}
          exercises={exercises}
          selectedExerciseId={selectedExercise?._id}
          onSelect={setSelectedExerciseId}
          isLoading={isLoading}
          isError={isError}
          errorMessage={error?.message}
        />
      </div>

      {/* // Iframe & Recommendations */}
      <div className="col-span-9">
        <div>
          {isLoading ? (
            <div className="h-130 animate-pulse rounded-4xl bg-white/5" />
          ) : isError ? (
            <div className="flex min-h-130 items-center justify-center rounded-4xl border border-white/10 bg-white/3">
              <p className="text-red-500">{error.message}</p>
            </div>
          ) : !difficultyLevelId ? (
            <div className="flex min-h-130 items-center justify-center rounded-4xl border border-white/10 bg-white/3">
              <p className="text-white/70">{t("chooseLevel")}</p>
            </div>
          ) : !exercises.length || !selectedExercise ? (
            <div className="flex min-h-130 items-center justify-center rounded-4xl border border-white/10 bg-white/3">
              <p className="text-white/70">{t("noExercises")}</p>
            </div>
          ) : (
            <ExercisePreviewPanel exercise={selectedExercise} />
          )}
        </div>
        <div className="mt-5">
          <h3 className="mb-5 text-3xl font-medium">
            {t("recommendationTitle")}
          </h3>
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Link to={`/${locale}/healthy`}>
                <Card
                  key={card.index}
                  image={card.image}
                  title={card.title}
                  buttonText={card.buttonText}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
