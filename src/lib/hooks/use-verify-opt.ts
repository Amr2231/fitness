import { useMutation } from "@tanstack/react-query";
import type { OtpStepFields } from "../types/forgot-password";
import { verifyOtpAction } from "../actions/auth.action";

export default function useVerifyOtp() {
  // mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (fields: OtpStepFields) => {
      const payload = await verifyOtpAction(fields);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return { verifyOtp: mutate, isPending, error };
}
