import Card from "@/components/shared/card";
import { CardSkeleton } from "@/components/shared/card-skeleton";
import { useMuscles } from "@/lib/hooks/use-muscles";
import { Link } from "react-router-dom";

type Props = {
  locale?: string;
  muscleGroupId?: string;
};

export default function MusclesList({ locale, muscleGroupId }: Props) {
  // Queries
  const {
    data: muscles,
    isLoading,
    isError,
    error,
  } = useMuscles(muscleGroupId, locale);

  if (isLoading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-4 px-10 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-8 flex justify-center">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  if (!muscles?.length) {
    return (
      <div className="mt-8 flex justify-center">
        <p>No muscles found for this group</p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 px-5 md:px-7 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
      {muscles.map((muscle) => (
        <Link
          key={muscle._id}
          to={`/${locale}/classes/${muscleGroupId}/muscles/${muscle._id}`}
        >
          <Card
            image={muscle.image || ""}
            title={muscle.name}
            buttonText="Explore"
          />
        </Link>
      ))}
    </div>
  );
}
