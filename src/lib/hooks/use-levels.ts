import { useQuery } from "@tanstack/react-query";
import type { Level } from "../types/levels";
import { getAllLevels } from "../services/levels.service";

export function useLevels(locale: string) {
  return useQuery<Level[], Error>({
    queryKey: ["levels", locale],
    queryFn: async () => {
      const response = await getAllLevels(locale);
      return response.levels;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
