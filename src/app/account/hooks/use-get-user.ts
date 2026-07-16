import { getUserData } from "@/lib/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(),
  });
};
