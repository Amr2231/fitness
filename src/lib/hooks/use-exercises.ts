import { useQuery } from "@tanstack/react-query";
import type { ExercisesSuccessResponse } from "../types/exercises";
import type { Locale } from "../types/muscles-group";
import { getExercisesByMuscleDifficulty } from "../services/exercises.service";

export function useExercisesByDifficulty(
  primeMoverMuscleId: string | undefined,
  difficultyLevelId: string | undefined,
  locale: Locale,
) {
  return useQuery<ExercisesSuccessResponse, Error>({
    queryKey: [
      "exercises-by-difficulty",
      locale,
      primeMoverMuscleId,
      difficultyLevelId,
    ],
    queryFn: async () => {
      if (!primeMoverMuscleId) {
        throw new Error("primeMoverMuscleId is required");
      }

      if (!difficultyLevelId) {
        throw new Error("difficultyLevelId is required");
      }

      return getExercisesByMuscleDifficulty({
        primeMoverMuscleId,
        difficultyLevelId,
        locale,
      });
    },
    enabled: !!primeMoverMuscleId && !!difficultyLevelId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
