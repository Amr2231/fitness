import type {
  MuscleGroupsResponse,
  MusclesByGroupResponse,
} from "@/lib/types/workouts";
import axios from "axios";

const BASE_URL = "https://fitness.elevateegy.com/api/v1";

export const getMuscleGroups = async (
  lang: string,
): Promise<MuscleGroupsResponse> => {
  const { data } = await axios.get(`${BASE_URL}/muscles`, {
    headers: {
      "accept-language": lang,
    },
  });
  return data;
};

export const getMusclesByGroup = async (
  lang: string,
  id: string,
): Promise<MusclesByGroupResponse> => {
  const { data } = await axios.get(`${BASE_URL}/musclesGroup/${id}`, {
    headers: {
      "accept-language": lang,
    },
  });
  return data;
};
