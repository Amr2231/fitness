import { NumberPicker } from "@/components/ui/number-picker";
import StepsHeader from "../components/steps-header";
import { Controller, useFormContext } from "react-hook-form";
import type { RegisterSchema } from "@/lib/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";

type Props = {
  nextStep?: () => void;
  isEdit?: boolean;
  onSubmit?: (value: RegisterSchema["weight"]) => void;
};

export default function WeightStep({
  nextStep,
  isEdit = false,
  onSubmit,
}: Props) {
  const t = useTranslations("Register");
  const form = useFormContext<RegisterSchema>();

  const weight = form.watch("weight");

  const handleAction = async () => {
    const isValid = await form.trigger(["weight"]);
    if (!isValid) return;

    if (isEdit && onSubmit) {
      onSubmit(form.getValues("weight"));
    } else {
      nextStep?.();
    }
  };

  return (
    <div className="text-center space-y-6">
      <StepsHeader
        header={t("what-is-your-weight")}
        paragraph={t("step-header-paragraph")}
      />

      <Controller
        name="weight"
        control={form.control}
        render={({ field }) => (
          <NumberPicker
            min={40}
            max={180}
            defaultValue={field.value}
            unit="KG"
            onChange={field.onChange}
            name={field.name}
          />
        )}
      />

      <Button
        disabled={weight == undefined}
        onClick={handleAction}
        className="w-2/3"
      >
        {isEdit ? t("save") : t("next")}
      </Button>
    </div>
  );
}
