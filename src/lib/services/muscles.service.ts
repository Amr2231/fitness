import axios from "axios";
import type { Locale } from "../types/muscles-group";
import type {
  MusclesErrorResponse,
  MusclesSuccessResponse,
} from "../types/muscles";

const BASE_URL = "https://fitness.elevateegy.com/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

type GetPrimeMoverMusclesByGroupIdParams = {
  muscleGroupId: string;
  locale: Locale;
};

export async function getPrimeMoverMusclesByGroupId({
  muscleGroupId,
  locale,
}: GetPrimeMoverMusclesByGroupIdParams): Promise<MusclesSuccessResponse> {
  try {
    const response = await api.get<MusclesSuccessResponse>(
      "/musclesGroup/by-muscle-group",
      {
        params: {
          muscleGroupId,
        },
        headers: {
          "Accept-Language": locale,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<MusclesErrorResponse>(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch prime mover muscles";

      throw new Error(errorMessage);
    }

    throw new Error(
      "An unexpected error occurred while fetching prime mover muscles",
    );
  }
}
