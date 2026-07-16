import {
  createRegisterSchema,
  type RegisterSchema,
} from "@/lib/schemas/auth.schema";
import RegisterForm from "./components/register-form";
import GenderStep from "./steps/gender-step";
import AgeStep from "./steps/age-step";
import WeightStep from "./steps/weight-step";
import HeightStep from "./steps/height-step";
import GoalStep from "./steps/goal-step";
import ActivityLevelStep from "./steps/level-step";
import CircularProgress from "./components/circular-progress";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRegister } from "./hooks/use-register";
import { useNavigate } from "react-router-dom";
import { useTranslations } from "use-intl";
import { useLocaleNavigation } from "@/lib/hooks/use-navigation";

const STEP_FIELDS: Record<number, (keyof RegisterSchema)[]> = {
  0: ["firstName", "lastName", "email", "password", "rePassword"],
  1: ["gender"],
  2: ["age"],
  3: ["weight"],
  4: ["height"],
  5: ["goal"],
  6: ["activityLevel"],
};

export default function Register() {
  // Translation
  const t = useTranslations();

  // states
  const [currentStep, setCurrentStep] = useState(0);

  // Navigation
  const navigate = useNavigate();

  // Locale
  const { currentLocale } = useLocaleNavigation();

  // Form setup with zod validation
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(createRegisterSchema(t)),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      gender: undefined,
      age: 30,
      weight: 70,
      height: 170,
      goal: undefined,
      activityLevel: undefined,
    },
  });

  // Register mutation
  const { mutate, isPending } = useRegister();

  // Handle next step with validation
  const nextStep = async () => {
    const fields = STEP_FIELDS[currentStep] || [];
    const isValid = await form.trigger(fields);
    if (isValid) {
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };

  // Submit handler
  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    mutate(data, {
      onSuccess: () => navigate(`/${currentLocale}/login`),

      onError: () => {
        setTimeout(() => {
          setCurrentStep(0);
        }, 1500);
      },
    });
  };

  // Steps
  const steps = [
    <RegisterForm key="step-0" nextStep={nextStep} />,
    <GenderStep key="step-1" nextStep={nextStep} />,
    <AgeStep key="step-2" nextStep={nextStep} />,
    <WeightStep key="step-3" nextStep={nextStep} />,
    <HeightStep key="step-4" nextStep={nextStep} />,
    <GoalStep key="step-5" nextStep={nextStep} />,
    <ActivityLevelStep key="step-6" isPending={isPending} />,
  ];

  return (
    <FormProvider {...form}>
      <div className="flex flex-col justify-center items-center w-full">
        {/* Progress */}
        {currentStep !== 0 && (
          <div className="relative flex items-center justify-center mb-6">
            <CircularProgress
              currentStep={currentStep}
              totalSteps={steps.length - 1}
            />
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center"
        >
          {steps[currentStep]}
        </form>
      </div>
    </FormProvider>
  );
}
