import axios from "axios";
import type { Locale } from "../types/muscles-group";
import type {
  ExercisesErrorResponse,
  ExercisesSuccessResponse,
} from "../types/exercises";

const BASE_URL = "https://fitness.elevateegy.com/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

type GetExercisesByMuscleDifficultyParams = {
  primeMoverMuscleId: string;
  difficultyLevelId: string;
  locale: Locale;
};

export async function getExercisesByMuscleDifficulty({
  primeMoverMuscleId,
  difficultyLevelId,
  locale,
}: GetExercisesByMuscleDifficultyParams): Promise<ExercisesSuccessResponse> {
  try {
    const response = await api.get<ExercisesSuccessResponse>(
      "/exercises/by-muscle-difficulty",
      {
        params: {
          primeMoverMuscleId,
          difficultyLevelId,
        },
        headers: {
          "Accept-Language": locale,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ExercisesErrorResponse>(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch exercises";

      throw new Error(errorMessage);
    }

    throw new Error("An unexpected error occurred while fetching exercises");
  }
}
