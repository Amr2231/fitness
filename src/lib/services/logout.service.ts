import axios from "axios";

const BASE_URL = "https://fitness.elevateegy.com/api/v1";

export const logoutService = async (): Promise<{ message: "success" }> => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${BASE_URL}/auth/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
