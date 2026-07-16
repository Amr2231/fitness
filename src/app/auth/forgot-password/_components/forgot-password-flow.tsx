import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant";
import { useState } from "react";
import EmailStep from "./email-step";
import OtpStep from "./otp-step";
import NewPasswordStep from "./new-password-step";
import { useTranslations } from "use-intl";

export type ForgotPasswordSteps =
  (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];

export default function ForgotPasswordFlow() {
  const t = useTranslations("forgot-password-step");

  const [step, setStep] = useState<ForgotPasswordSteps>(
    FORGOT_PASSWORD_STEPS.EMAIL,
  );
  const [email, setEmail] = useState<string>("");

  // variables
  const steps = {
    [FORGOT_PASSWORD_STEPS.EMAIL]: {
      title: t("step-one-title"),
      subTitle: t("step-one-subtitle"),
      form: <EmailStep email={email} setStep={setStep} setEmail={setEmail} />,
    },
    [FORGOT_PASSWORD_STEPS.OTP]: {
      title: t("step-two-title"),
      subTitle: t("step-two-subtitle"),
      form: <OtpStep email={email} setStep={setStep} />,
    },
    [FORGOT_PASSWORD_STEPS.NEW_PASSWORD]: {
      title: t("step-three-title"),
      subTitle: t("step-three-subtitle"),
      form: <NewPasswordStep email={email} />,
    },
  } as const;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-5xl font-bold mb-4 text-center text-white">
        {steps[step].title}
      </h1>
      <div className="w-full max-w-121.5 p-10 border border-[#D3D3D3] bg-main/10 backdrop-blur-3xl rounded-[50px] flex flex-col items-center justify-center gap-2">
        {/* Subtitle */}
        <p className="text-white text-2xl">{steps[step].subTitle}</p>
        {/* Form */}
        {steps[step].form}
      </div>
    </div>
  );
}
