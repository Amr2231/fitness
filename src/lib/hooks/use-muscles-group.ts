import { useQuery } from "@tanstack/react-query";
import type { Locale, MuscleGroup } from "../types/muscles-group";
import { getAllMusclesGroup } from "../services/muscles-group.service";

export function useMusclesGroup(locale: Locale) {
  return useQuery<MuscleGroup[], Error>({
    queryKey: ["muscles-group", locale],
    queryFn: async () => {
      const response = await getAllMusclesGroup(locale);
      return response.musclesGroup;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
