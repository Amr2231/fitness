import { Link } from "react-router-dom";
import { useMusclesGroup } from "@/lib/hooks/use-muscles-group";
import TabsSkeleton from "./tabs-skeleton";

type Props = {
  locale?: string;
  muscleGroupId?: string;
};

export default function MuscleGroupsTabs({ locale, muscleGroupId }: Props) {
  // Queries
  const {
    data: muscleGroups = [],
    isLoading,
    isError,
    error,
  } = useMusclesGroup(locale);

  // Variables
  const visibleTabs = muscleGroups.slice(0, 8);

  if (isLoading) return <TabsSkeleton />;

  if (isError) {
    return (
      <div className="mt-8 flex justify-center">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="font-bold my-6 flex flex-wrap items-center justify-center gap-1">
      {visibleTabs.map((group) => {
        const isActive = muscleGroupId === group._id;
        return (
          <Link
            key={group._id}
            to={`/${locale}/classes/${group._id}`}
            className={`rounded-full px-5 py-2 text-md font-medium transition ${
              isActive
                ? "bg-primary text-white"
                : "hover:border-primary hover:text-primary"
            }`}
          >
            {group.name}
          </Link>
        );
      })}
    </div>
  );
}
