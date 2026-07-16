import axios from "axios";
import type {
  Locale,
  MusclesGroupSuccessResponse,
} from "../types/muscles-group";

const BASE_URL = "https://fitness.elevateegy.com/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

export async function getAllMusclesGroup(
  locale: Locale,
): Promise<MusclesGroupSuccessResponse> {
  try {
    const response = await api.get<MusclesGroupSuccessResponse>("/muscles", {
      headers: {
        "accept-language": locale,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch muscles groups";

      throw new Error(errorMessage);
    }

    throw new Error(
      "An unexpected error occurred while fetching muscles groups",
    );
  }
}
