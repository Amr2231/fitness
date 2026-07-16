import { useMutation } from "@tanstack/react-query";
import type { ResetPasswordStepFields } from "../types/forgot-password";
import { toast } from "sonner";
import { resetPasswordAction } from "../actions/auth.action";
import { useNavigate, useParams } from "react-router-dom";

export default function useResetPassword() {
  // navigation
  const navigate = useNavigate();
  const { locale } = useParams();

  // mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (fields: ResetPasswordStepFields & { email: string }) => {
      const payload = await resetPasswordAction({
        email: fields.email,
        newPassword: fields.password,
      });

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      // show success message
      toast.success("Successful Reset New Password");
      // navagate to login page
      navigate(`/${locale}/login`);
    },
  });

  return { resetpassword: mutate, isPending, error };
}
