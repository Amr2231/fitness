import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import StepsHeader from "../components/steps-header";
import { useFormContext } from "react-hook-form";
import { type RegisterSchema } from "@/lib/schemas/auth.schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "use-intl";
import { getLevels } from "@/lib/constants/levels";

type Props = {
  isPending?: boolean;
  isEdit?: boolean;
  onSubmit?: (value: RegisterSchema["activityLevel"]) => void;
};

export default function ActivityLevelStep({
  isPending,
  isEdit = false,
  onSubmit,
}: Props) {
  const t = useTranslations("Register");
  const form = useFormContext<RegisterSchema>();
  const LEVELS = getLevels(t);
  const activityLevel = form.watch("activityLevel") ?? "";

  const handleAction = async () => {
    if (isEdit && onSubmit) {
      onSubmit(form.getValues("activityLevel"));
    }
  };
  return (
    <div className="text-center space-y-6">
      <StepsHeader header={t("level")} paragraph={t("step-header-paragraph")} />

      <RadioGroup
        value={activityLevel}
        onValueChange={(value) =>
          form.setValue(
            "activityLevel",
            value as RegisterSchema["activityLevel"],
          )
        }
        className="flex flex-col gap-4 mt-6 w-full max-w-md mx-auto"
      >
        {LEVELS.map((level) => (
          <FieldLabel htmlFor={level.value} key={level.value}>
            <Field
              orientation="horizontal"
              className="rounded-2xl px-2 py-1 transition-all
              peer-data-[state=checked]:border-orange-500
              peer-data-[state=checked]:text-primary"
            >
              <FieldContent>
                <FieldTitle>{level.label}</FieldTitle>
              </FieldContent>

              <RadioGroupItem
                value={level.value}
                id={level.value}
                className="peer"
              />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>

      <Button
        type={!isEdit ? "submit" : "button"}
        onClick={isEdit ? handleAction : undefined}
        disabled={!activityLevel}
        className="w-9/12"
      >
        {isPending ? <Spinner /> : isEdit ? t("save") : t("finish")}
      </Button>
    </div>
  );
}
