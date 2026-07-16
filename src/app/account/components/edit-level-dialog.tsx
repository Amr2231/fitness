import { useForm, FormProvider } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { type RegisterSchema } from "@/lib/schemas/auth.schema";
import ActivityLevelStep from "@/app/auth/register/steps/level-step";
import { useUpdateUser } from "@/lib/hooks/use-update-user";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "use-intl";

export function EditLevelDialog({
  currentLevel,
}: {
  currentLevel: RegisterSchema["activityLevel"];
}) {
  const t = useTranslations("account");

  const form = useForm<RegisterSchema>({
    defaultValues: {
      activityLevel: currentLevel,
    },
  });
  const { mutate } = useUpdateUser();
  const queryClient = useQueryClient();

  const handleUpdate = (value: RegisterSchema["activityLevel"]) => {
    console.log("Updated level:", value);
    mutate(
      { activityLevel: value },
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
          <ActivityLevelStep isEdit onSubmit={handleUpdate} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
