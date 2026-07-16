import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/register.service";
import { Toast } from "@/components/ui/toast";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      Toast.success("Account created successfully");
    },
    onError: (error) => {
      Toast.error(error.message || "Something went wrong");
    },
  });
};
