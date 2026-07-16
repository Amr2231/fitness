import { useQuery } from "@tanstack/react-query";
import type { Locale } from "../types/muscles-group";
import { getPrimeMoverMusclesByGroupId } from "../services/muscles.service";
import type { Muscle } from "../types/muscles";

export function useMuscles(muscleGroupId: string | undefined, locale: Locale) {
  return useQuery<Muscle[], Error>({
    queryKey: ["prime-mover-muscles", locale, muscleGroupId],
    queryFn: async () => {
      if (!muscleGroupId) {
        throw new Error("muscleGroupId is required");
      }

      const response = await getPrimeMoverMusclesByGroupId({
        muscleGroupId,
        locale,
      });

      return response.muscles;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: !!muscleGroupId,

    retry: 1,
  });
}
