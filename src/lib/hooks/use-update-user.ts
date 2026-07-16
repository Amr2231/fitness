import { useMutation } from "@tanstack/react-query";
import { updateUserData } from "../services/update-user-data.service";

export function useUpdateUser() {
  return useMutation({
    mutationFn: updateUserData,
  });
}
