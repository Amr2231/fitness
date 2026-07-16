import { z } from "zod";

export const GOALS = [
  "Gain weight",
  "Lose weight",
  "Get fitter",
  "Gain more Flexible",
  "Learn the basic",
] as const;

export const createRegisterSchema = (
  t: ReturnType<typeof import("use-intl").useTranslations>,
) =>
  z
    .object({
      firstName: z
        .string()
        .min(2, { message: t("Register.validation.firstName.required") })
        .max(50, { message: t("Register.validation.firstName.tooLong") }),
      lastName: z
        .string()
        .min(2, { message: t("Register.validation.lastName.required") })
        .max(50, { message: t("Register.validation.lastName.tooLong") }),
      email: z
        .string()
        .email({ message: t("Register.validation.email.invalid") }),
      password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
          message: t("Register.validation.password.strong"),
        }),
      rePassword: z
        .string()
        .min(1, { message: t("Register.validation.rePassword.required") }),

      gender: z.enum(["male", "female"] as const).refine(() => true, {
        message: t("Register.validation.gender.required"),
      }),
      age: z
        .number()
        .min(12, { message: t("Register.validation.age.min") })
        .max(90, { message: t("Register.validation.age.max") }),
      weight: z
        .number()
        .min(40, { message: t("Register.validation.weight.min") })
        .max(180, { message: t("Register.validation.weight.max") }),
      height: z
        .number()
        .min(120, { message: t("Register.validation.height.min") })
        .max(220, { message: t("Register.validation.height.max") }),

      goal: z.enum(GOALS).refine(() => true, {
        message: t("Register.validation.goal.required"),
      }),

      activityLevel: z
        .enum(["level1", "level2", "level3", "level4", "level5"] as const)
        .refine(() => true, {
          message: t("Register.validation.activityLevel.required"),
        }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("Register.validation.passwords.notMatch"),
      path: ["rePassword"],
    });

// Type inference
export type RegisterSchema = z.infer<ReturnType<typeof createRegisterSchema>>;

// login schema
export const createLoginSchema = (
  t: ReturnType<typeof import("use-intl").useTranslations>,
) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("Login.validation.email.required") })
      .email({ message: t("Login.validation.email.invalid") }),
    password: z
      .string()
      .min(1, { message: t("Login.validation.password.required") }),
  });

// Type inference
export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;

// send otp for email schema
export const emailStepSchema = (
  t: ReturnType<typeof import("use-intl").useTranslations>,
) =>
  z.object({
    email: z.string().email({ message: t("email-validation") }),
  });

// verify otp schema
export const otpStepSchema = (
  t: ReturnType<typeof import("use-intl").useTranslations>,
) =>
  z.object({
    otp: z.string().min(6, t("otp-required")),
  });

// reset password schema
export const resetPasswordStepSchema = (
  t: ReturnType<typeof import("use-intl").useTranslations>,
) =>
  z
    .object({
      password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
          message: t("password-required"),
        }),
      rePassword: z.string().min(1, { message: t("re-password-required") }),
    })
    .refine((values) => values.password === values.rePassword, {
      message: t("re-password-valid"),
      path: ["rePassword"],
    });
