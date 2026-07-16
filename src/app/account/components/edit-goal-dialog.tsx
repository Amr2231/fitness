import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useForm, FormProvider } from "react-hook-form";
import { type RegisterSchema } from "@/lib/schemas/auth.schema";
import GoalStep from "@/app/auth/register/steps/goal-step";
import { useUpdateUser } from "@/lib/hooks/use-update-user";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "use-intl";

type GoalType = RegisterSchema["goal"];

export function EditGoalDialog({ currentGoal }: { currentGoal: GoalType }) {
  const t = useTranslations("account");

  const form = useForm<RegisterSchema>({
    defaultValues: {
      goal: currentGoal,
    },
  });
  const { mutate } = useUpdateUser();
  const queryClient = useQueryClient();

  const handleUpdate = (goal: GoalType) => {
    console.log("Updated goal:", goal);

    mutate(
      { goal: goal },
      {
        onSuccess: () => {
          console.log("Goal updated");
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      },
    );
    form.reset({ goal });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="underline cursor-pointer">{t("tap-to-change")}</p>
      </DialogTrigger>

      <DialogContent>
        <FormProvider {...form}>
          <GoalStep isEdit onSubmit={handleUpdate} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
