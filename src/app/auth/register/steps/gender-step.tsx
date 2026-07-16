import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mars, Venus } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { type RegisterSchema } from "@/lib/schemas/auth.schema";
import StepsHeader from "../components/steps-header";
import { useTranslations } from "use-intl";

export default function GenderStep({ nextStep }: RegisterFormProps) {
  // Translation
  const t = useTranslations("Register");

  // Form context
  const form = useFormContext<RegisterSchema>();

  // constants
  const gender = form.watch("gender") ?? "";

  // Handle next step
  const handleNext = async () => {
    const isValid = await form.trigger(["gender"]);
    if (isValid) {
      nextStep?.();
    }
  };

  return (
    <div className="text-center space-y-6">
      <StepsHeader
        header={t("tell-us-about-yourself")}
        paragraph={t("we-need-to-know-your-gender")}
      />

      {/* Controlled RadioGroup */}
      <RadioGroup
        value={gender}
        onValueChange={(value) =>
          form.setValue("gender", value as "male" | "female")
        }
        className="flex items-center justify-center gap-6 mt-4"
      >
        {/* Male */}
        <label className="cursor-pointer">
          <RadioGroupItem
            value="male"
            id="male-gender"
            className="peer hidden"
          />

          <div
            className="w-24 h-24 rounded-full border  text-black dark:text-white border-black/50 dark:border-white/50 flex flex-col items-center justify-center transition-all duration-200
            peer-data-[state=checked]:border-orange-500
            peer-data-[state=checked]:text-primary"
          >
            <Mars size={40} className="-rotate-45" />
            <span className="text-xs mt-1">{t("male")}</span>
          </div>
        </label>

        {/* Female */}
        <label className="cursor-pointer">
          <RadioGroupItem
            value="female"
            id="female-gender"
            className="peer hidden"
          />

          <div
            className="w-24 h-24 rounded-full border  text-black dark:text-white border-black/50 dark:border-white/50 flex flex-col items-center justify-center transition-all duration-200
            peer-data-[state=checked]:border-orange-500
            peer-data-[state=checked]:text-primary"
          >
            <Venus size={40} />
            <span className="text-xs mt-1">{t("female")}</span>
          </div>
        </label>
      </RadioGroup>

      {/* Error message */}
      {form.formState.errors.gender && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.gender.message}
        </p>
      )}

      <Button disabled={!gender} onClick={handleNext} className="w-2/3">
        {t("next")}
      </Button>
    </div>
  );
}
