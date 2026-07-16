import axios from "axios";
import type { Locale } from "../types/muscles-group";
import type {
  LevelsErrorResponse,
  LevelsSuccessResponse,
} from "../types/levels";

const BASE_URL = "https://fitness.elevateegy.com/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

export async function getAllLevels(
  locale: Locale,
): Promise<LevelsSuccessResponse> {
  try {
    const response = await api.get<LevelsSuccessResponse>("/levels", {
      headers: {
        "Accept-Language": locale,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<LevelsErrorResponse>(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch difficulty levels";

      throw new Error(errorMessage);
    }

    throw new Error(
      "An unexpected error occurred while fetching difficulty levels",
    );
  }
}
