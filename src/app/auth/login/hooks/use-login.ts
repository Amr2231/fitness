import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/login.service";
import { Toast } from "@/components/ui/toast";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      Toast.success("Logged in successfully");
    },
    onError: (error) => {
      Toast.error(error.message || "Something went wrong");
    },
  });
};
