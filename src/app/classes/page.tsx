import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionTitle from "@/components/shared/section-title";
import MuscleGroupsTabs from "./components/muscle-groups-tabs";
import MusclesList from "./components/muscles-list";
import { useMusclesGroup } from "@/lib/hooks/use-muscles-group";
import { useTranslations } from "use-intl";

export default function Classes() {
  // Translation
  const t = useTranslations("classes-home.workouts");

  // Navigation
  const navigate = useNavigate();

  // Hooks
  const { locale, muscleGroupId } = useParams();

  // Queries
  const {
    data: muscleGroups = [],
    isLoading: isLoadingGroups,
    isError: isGroupsError,
    error: groupsError,
  } = useMusclesGroup(locale);

  // Redirects to the first muscle group as a default
  useEffect(() => {
    if (!muscleGroupId && muscleGroups.length > 0) {
      navigate(`/${locale}/classes/${muscleGroups[0]._id}`, {
        replace: true,
      });
    }
  }, [muscleGroupId, muscleGroups, navigate, locale]);

  if (isGroupsError) {
    return (
      <main className="flex flex-col items-center justify-center px-12 py-5">
        <p className="text-red-500">{groupsError.message}</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center px-12 py-5">
      {/* Page title and Description  */}
      <header className="flex flex-col items-center justify-center">
        <SectionTitle
          background={t("title-text")}
          title={t("title-background")}
        />
        <p className="font-bold font-baloo text-center text-xl md:text-3xl lg:text-5xl">
          <span className="block">{t("titleLineOne")}</span>
          <span className="text-primary block">{t("titleLineTwo")}</span>
        </p>
      </header>

      {/* Muscles Tabs & List  */}
      <section className="w-full">
        <MuscleGroupsTabs locale={locale} muscleGroupId={muscleGroupId} />
        {!isLoadingGroups && muscleGroupId && (
          <MusclesList locale={locale} muscleGroupId={muscleGroupId} />
        )}
      </section>
    </main>
  );
}
