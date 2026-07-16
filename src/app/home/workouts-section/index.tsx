import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import MuscleTabs from "./components/muscle-tabs";
import { useTranslations } from "use-intl";
import { CarouselSkeleton } from "./components/skeletons/carousel-skeleton";
import SectionTitle from "@/components/shared/section-title";
import { useMuscleGroups } from "@/lib/hooks/use-muscle-groups";
import { useMusclesByGroup } from "@/lib/hooks/use-muscles-by-group";
import workoutsImg from "@/assets/images/workouts.jpg";
import { TabsSkeleton } from "./components/skeletons/tabs-skeletons";
import MuscleCarousel from "./components/muscle-carousel";

export default function WorkoutSection() {
  const t = useTranslations("home.workouts");
  const { locale } = useParams();

  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const {
    data: groupsData,
    isLoading: groupsLoading,
    isError: groupsError,
  } = useMuscleGroups();

  const groups = useMemo(() => {
    return groupsData?.musclesGroup || [];
  }, [groupsData]);

  const effectiveSelectedGroup = useMemo(() => {
    return selectedGroup || groups[0]?._id || "";
  }, [selectedGroup, groups]);

  const {
    data: musclesData,
    isLoading: musclesLoading,
    isError: musclesError,
  } = useMusclesByGroup(effectiveSelectedGroup);

  return (
    <section className="relative space-y-8 w-full px-6 pb-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${workoutsImg})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute  h-3/5 left-0 right-0 top-1/12  bg-white/60 dark:bg-black/30  backdrop-blur-xl" />
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <h3 className="flex items-center justify-center mt-2">
          <SectionTitle
            background={t("title-text")}
            title={t("title-background")}
          />
        </h3>

        <p className="text-xl md:text-[2.5rem] mb-2 text-start md:text-center space-y-2 mt-3 font-bold  text-black dark:text-white leading-tight">
          {t.rich("title", {
            br: () => <br />,
            highlight: (chunks) => (
              <span className="text-primary">{chunks}</span>
            ),
          })}
        </p>
        {/* Error State */}
        {groupsError && (
          <p className="text-center text-red-500">
            Failed to load muscle groups
          </p>
        )}
        {/* Tabs */}
        {groupsLoading ? (
          <TabsSkeleton />
        ) : groupsError ? (
          <p className="text-center text-red-500">
            Failed to load muscle groups
          </p>
        ) : (
          <MuscleTabs
            groups={groups}
            value={effectiveSelectedGroup}
            onChange={setSelectedGroup}
          />
        )}
        {/* Muscles Section */}
        <div className="min-h-62.5 flex items-center justify-center my-8">
          {musclesLoading ? (
            <CarouselSkeleton />
          ) : musclesError ? (
            <p className="text-red-500">Failed to load exercises</p>
          ) : (
            <MuscleCarousel
              muscles={musclesData?.muscles || []}
              locale={locale}
              groupId={effectiveSelectedGroup}
            />
          )}
        </div>
      </div>
    </section>
  );
}
