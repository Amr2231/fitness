import axios, { AxiosError } from "axios";
import { type RegisterSchema } from "@/lib/schemas/auth.schema";
import { notifyAuthChanged } from "@/lib/hooks/use-auth-status";

export const registerUser = async (data: RegisterSchema) => {
  try {
    const response = await axios.post(
      "https://fitness.elevateegy.com/api/v1/auth/signup",
      data,
    );

    localStorage.setItem("token", response.data.token);
    notifyAuthChanged();
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    const message =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      "Registration failed";

    throw new Error(message);
  }
};
