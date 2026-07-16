import axios from "axios";

const BASE_URL = "https://fitness.elevateegy.com/api/v1";

export const getUserData = async (): Promise<UserResponse> => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${BASE_URL}/auth/profile-data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);

  return data;
};
