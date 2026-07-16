import { useMutation } from "@tanstack/react-query";
import type { EmailStepFields } from "../types/forgot-password";
import { sendOtpAction } from "../actions/auth.action";

export default function useSendOtp() {
  // mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (fields: EmailStepFields) => {
      const payload = await sendOtpAction(fields);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return { sendOtp: mutate, isPending, error };
}
