import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "use-intl";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import Feedback from "@/components/shared/feedback";
import { resetPasswordStepSchema } from "@/lib/schemas/auth.schema";
import type { ResetPasswordStepFields } from "@/lib/types/forgot-password";
import { resetPasswordAction } from "@/lib/actions/auth.action";

type ChangePasswordDialogProps = {
  email?: string;
  trigger: React.ReactNode;
};

export function ChangePasswordDialog({
  email,
  trigger,
}: ChangePasswordDialogProps) {
  const t = useTranslations("account");
  const tStep = useTranslations("forgot-password-step");
  const [open, setOpen] = useState(false);

  const form = useForm<ResetPasswordStepFields>({
    resolver: zodResolver(resetPasswordStepSchema(tStep)),
    defaultValues: { password: "", rePassword: "" },
  });

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: async (values: ResetPasswordStepFields) => {
      if (!email) throw new Error(t("missing-email"));
      return resetPasswordAction({ email, newPassword: values.password });
    },
    onSuccess: () => {
      toast.success(t("password-updated"));
      form.reset();
      setOpen(false);
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordStepFields> = (values) => {
    mutate(values);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          form.reset();
          reset();
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("change-password")}</DialogTitle>
          <DialogDescription>{t("change-password-desc")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full mt-2"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder={tStep("new-password")}
                      icon={<Lock className="h-5 w-5" />}
                      className="h-12 rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage className="text-primary text-center" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder={tStep("confirm-password")}
                      icon={<Lock className="h-5 w-5" />}
                      className="h-12 rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage className="text-primary text-center" />
                </FormItem>
              )}
            />

            <Feedback className="mt-3 mx-auto">{error?.message}</Feedback>

            <Button
              disabled={isPending || form.formState.isSubmitting}
              className="mt-4"
            >
              {isPending ? t("saving") : t("save-changes")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
