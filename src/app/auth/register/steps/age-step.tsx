import { NumberPicker } from "@/components/ui/number-picker";
import StepsHeader from "../components/steps-header";
import { Controller, useFormContext } from "react-hook-form";
import type { RegisterSchema } from "@/lib/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";

export default function AgeStep({ nextStep }: RegisterFormProps) {
  // Translation
  const t = useTranslations("Register");

  // Form context
  const form = useFormContext<RegisterSchema>();

  // constants
  const age = form.watch("age");

  // Handle next step
  const handleNext = async () => {
    const isValid = await form.trigger(["age"]);
    if (isValid) {
      nextStep?.();
    }
  };

  return (
    <div className="text-center space-y-6">
      <StepsHeader
        header={t("how-old-are-you")}
        paragraph={t("step-header-paragraph")}
      />

      <Controller
        name="age"
        control={form.control}
        render={({ field }) => (
          <NumberPicker
            min={12}
            max={90}
            defaultValue={field.value}
            unit="Years Old"
            onChange={field.onChange}
            name={field.name}
          />
        )}
      />

      <Button
        disabled={age == undefined}
        onClick={handleNext}
        className="w-2/3"
      >
        {t("next")}
      </Button>
    </div>
  );
}
