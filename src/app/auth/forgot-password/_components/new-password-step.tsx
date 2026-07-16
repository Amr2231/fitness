import Feedback from "@/components/shared/feedback";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import useResetPassword from "@/lib/hooks/use-reset-password";
import { resetPasswordStepSchema } from "@/lib/schemas/auth.schema";
import type { ResetPasswordStepFields } from "@/lib/types/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslations } from "use-intl";

export default function NewPasswordStep({ email }: { email: string }) {
  //translation
  const t = useTranslations("forgot-password-step");

  // mutation
  const { resetpassword, isPending, error } = useResetPassword();

  // form
  const form = useForm<ResetPasswordStepFields>({
    resolver: zodResolver(resetPasswordStepSchema(t)),
    defaultValues: {
      password: "",
      rePassword: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordStepFields> = (values) => {
    resetpassword({ ...values, email });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-80 mt-2"
      >
        {/* new password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-2">
              {/* Field */}
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder={t("new-password")}
                  icon={<Lock className="h-5 w-5" />}
                  className="h-12 rounded-2xl"
                />
              </FormControl>
              {/* message */}
              <FormMessage className="text-primary text-center" />
            </FormItem>
          )}
        />
        {/* confirmPassword */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem className="col-span-2">
              {/* Field */}
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder={t("confirm-password")}
                  icon={<Lock className="h-5 w-5" />}
                  className="h-12 rounded-2xl"
                />
              </FormControl>
              {/* message */}
              <FormMessage className="text-primary text-center" />
            </FormItem>
          )}
        />
        {/* feedback */}
        <Feedback className="mt-3">{error?.message}</Feedback>
        {/* submit button */}
        <Button
          disabled={isPending || form.formState.isSubmitting}
          className="mt-4"
        >
          {t("create-new-password")}
        </Button>
      </form>
    </Form>
  );
}
