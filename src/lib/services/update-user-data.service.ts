import axios from "axios";

const BASE_URL = "https://fitness.elevateegy.com/api/v1";

export const updateUserData = async (data: Partial<UserResponse["user"]>) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(`${BASE_URL}/auth/editProfile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
