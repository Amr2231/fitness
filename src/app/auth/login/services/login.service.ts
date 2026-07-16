import axios, { AxiosError } from "axios";
import { type LoginSchema } from "@/lib/schemas/auth.schema";
import { notifyAuthChanged } from "@/lib/hooks/use-auth-status";

const BASE_URL = "https://fitness.elevateegy.com/api/v1";

export const loginUser = async (data: LoginSchema) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, data);

    localStorage.setItem("token", response.data.token);
    notifyAuthChanged();
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    // Wrong email or wrong password both come back as 400/401 from the API,
    // sometimes with backend-specific wording (e.g. "user not found" vs
    // "wrong password"). We normalize both to one sentinel so the UI always
    // shows a single, non-revealing "email or password is incorrect"
    // message instead of confirming which field was wrong.
    if (
      axiosError.response?.status === 400 ||
      axiosError.response?.status === 401
    ) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const message =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      "NETWORK_ERROR";

    throw new Error(message);
  }
};
