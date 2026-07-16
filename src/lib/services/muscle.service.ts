import axios from "axios";
import type { Muscles, MusclesResponse } from "../types/muscle";

export async function getMuscles(locale: string = "en"): Promise<Muscles[]> {
  const { data } = await axios.get<MusclesResponse>(
    "https://fitness.elevateegy.com/api/v1/muscles",
    {
      headers: {
        "Accept-Language": locale,
      },
    },
  );

  return (
    data.musclesGroup?.map((item) => ({
      idMuscles: item._id,
      strMuscles: item.name,
    })) ?? []
  );
}
