import type { Dispatch, SetStateAction } from "react";
import type { ForgotPasswordSteps } from "./forgot-password-flow";
import { useTranslations } from "use-intl";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailStepSchema } from "@/lib/schemas/auth.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant";
import type { EmailStepFields } from "@/lib/types/forgot-password";
import useSendOtp from "@/lib/hooks/use-send-opt";
import Feedback from "@/components/shared/feedback";

// props type
type EmailStepProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<ForgotPasswordSteps>>;
};

export default function EmailStep({
  email,
  setStep,
  setEmail,
}: EmailStepProps) {
  // Translation
  const t = useTranslations("forgot-password-step");

  // Mutation
  const { sendOtp, isPending, error } = useSendOtp();

  // Form & validation
  const form = useForm<EmailStepFields>({
    resolver: zodResolver(emailStepSchema(t)),
    defaultValues: {
      email: email || "",
    },
  });

  // Functions
  const onSubmit: SubmitHandler<EmailStepFields> = (values) => {
    sendOtp(values, {
      onSuccess: () => {
        setStep(FORGOT_PASSWORD_STEPS.OTP);
        setEmail(values.email);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6 items-center"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t("email")}
                  icon={<Mail className="h-5 w-5 text-gray-400" />} // for email icon
                  className="h-12 rounded-2xl w-full"
                />
              </FormControl>
              {/* show error message */}
              <FormMessage className="text-primary text-center" />
            </FormItem>
          )}
        />
        {/* feedback */}
        <Feedback className="mt-3">{error?.message}</Feedback>
        {/* submit button */}
        <Button
          disabled={isPending || form.formState.isSubmitting}
          className="w-full"
        >
          {t("sent-otp")}
        </Button>
      </form>
    </Form>
  );
}
