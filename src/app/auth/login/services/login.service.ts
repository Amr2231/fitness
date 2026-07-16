import axios, { AxiosError } from "axios";
import { type LoginSchema } from "@/lib/schemas/auth.schema";

const BASE_URL = "https://fitness.elevateegy.com/api/v1";

export const loginUser = async (data: LoginSchema) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, data);

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    const message =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      "Login failed";

    throw new Error(message);
  }
};
