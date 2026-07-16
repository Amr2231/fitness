import type {
  emailStepSchema,
  otpStepSchema,
  resetPasswordStepSchema,
} from "../schemas/auth.schema";

// email step Fields
export type EmailStepFields = z.infer<ReturnType<typeof emailStepSchema>>;

// otp step Fields
export type OtpStepFields = z.infer<ReturnType<typeof otpStepSchema>>;

// reset password step Fields
export type ResetPasswordStepFields = z.infer<
  ReturnType<typeof resetPasswordStepSchema>
>;
