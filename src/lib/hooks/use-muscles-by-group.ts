import { useQuery } from "@tanstack/react-query";
import { useLocale } from "use-intl";
import { getMusclesByGroup } from "../services/workouts.service";

export const useMusclesByGroup = (id?: string) => {
  const local = useLocale();
  return useQuery({
    queryKey: ["muscles", id, local],
    queryFn: () => getMusclesByGroup(local === "ar" ? "ar" : "en", id!),
    enabled: !!id,
  });
};
