import { useParams, useSearchParams } from "react-router-dom";
import SectionTitle from "@/components/shared/section-title";
import ExercisesContent from "./components/exercises-content";
import { useTranslations } from "use-intl";

export default function MuscleExercisesPage() {
  // Translation
  const t = useTranslations("home.workouts");

  // Hooks
  const { locale, primeMoverMuscleId } = useParams();
  const [searchParams] = useSearchParams();

  // Variables
  const selectedLevelId = searchParams.get("level") ?? undefined;

  return (
    <main className="px-4 pb-8 md:px-8 lg:px-10">
      <header className="mb-6 flex flex-col items-center justify-center">
        <SectionTitle
          background={t("title-text")}
          title={t("title-background")}
        />
      </header>

      <ExercisesContent
        locale={locale}
        primeMoverMuscleId={primeMoverMuscleId}
        difficultyLevelId={selectedLevelId}
      />
    </main>
  );
}
