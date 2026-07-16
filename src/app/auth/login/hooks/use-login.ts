import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/login.service";
import { Toast } from "@/components/ui/toast";
import { useTranslations } from "use-intl";

export const useLogin = () => {
  const t = useTranslations("Login");

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      Toast.success(t("login-success"));
    },
    onError: (error) => {
      if (error.message === "INVALID_CREDENTIALS") {
        Toast.error(t("invalid-credentials"));
        return;
      }

      if (error.message === "NETWORK_ERROR") {
        Toast.error(t("login-failed"));
        return;
      }

      // Any other backend-provided message is shown as-is
      Toast.error(error.message);
    },
  });
};
