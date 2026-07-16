import { useForm, FormProvider } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import WeightStep from "@/app/auth/register/steps/weight-step";
import { type RegisterSchema } from "@/lib/schemas/auth.schema";
import { useUpdateUser } from "@/lib/hooks/use-update-user";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "use-intl";

export function EditWeightDialog({
  currentWeight,
}: {
  currentWeight: RegisterSchema["weight"];
}) {
  const t = useTranslations("account");

  const form = useForm<RegisterSchema>({
    defaultValues: {
      weight: currentWeight,
    },
  });
  const { mutate } = useUpdateUser();
  const queryClient = useQueryClient();
  const handleUpdate = (value: RegisterSchema["weight"]) => {
    console.log("Updated weight:", value);
    mutate(
      { weight: value },
      {
        onSuccess: () => {
          console.log("Goal updated");
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      },
    );
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="underline cursor-pointer">{t("tap-to-change")}</p>
      </DialogTrigger>

      <DialogContent>
        <FormProvider {...form}>
          <WeightStep isEdit onSubmit={handleUpdate} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
