import { useQuery } from "@tanstack/react-query";
import { useLocale } from "use-intl";
import { getMuscleGroups } from "../services/workouts.service";

export const useMuscleGroups = () => {
  const local = useLocale();
  return useQuery({
    queryKey: ["muscle-groups", local],
    queryFn: () => getMuscleGroups(local === "ar" ? "ar" : "en"),
  });
};
