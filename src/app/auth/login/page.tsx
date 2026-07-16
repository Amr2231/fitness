import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useTranslations } from "use-intl";
import { createLoginSchema, type LoginSchema } from "@/lib/schemas/auth.schema";
import SocialLinks from "@/app/auth/register/components/social-links";
import { useLocaleNavigation } from "@/lib/hooks/use-navigation";
import { useLogin } from "./hooks/use-login";

export default function Login() {
  // Translation
  const t = useTranslations("Login");

  // Navigation
  const navigate = useNavigate();
  const { currentLocale, localizePath } = useLocaleNavigation();

  // Form setup with zod validation
  const form = useForm<LoginSchema>({
    resolver: zodResolver(createLoginSchema(t)),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Login mutation
  const { mutate, isPending } = useLogin();

  // Submit handler
  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    mutate(data, {
      onSuccess: () => navigate(`/${currentLocale}`),
    });
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col justify-center items-center w-full">
        {/* Header */}
        <header className="flex flex-col items-center gap-1 mb-6 px-4 text-center">
          <span className="text-base sm:text-lg text-white">{t("hey-there")}</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-white">
            {t("welcome-back")}
          </h1>
        </header>

        {/* Card */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-121.5 flex flex-col gap-3 rounded-[32px] sm:rounded-[50px] border border-[#D3D3D3] bg-main/10 backdrop-blur-3xl p-6 sm:p-10"
        >
          <h2 className="text-xl font-bold text-center text-white">
            {t("title")}
          </h2>

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
                    icon={<Mail className="h-5 w-5 text-gray-400" />}
                    className="h-12 rounded-2xl"
                  />
                </FormControl>
                <FormMessage className="text-red-500 ms-2" />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder={t("password")}
                    icon={<Lock className="h-5 w-5" />}
                    className="h-12 rounded-2xl"
                  />
                </FormControl>
                <FormMessage className="text-red-500 ms-2" />
              </FormItem>
            )}
          />

          {/* Forgot Password link */}
          <Link
            to={localizePath("forgot-password")}
            className="text-sm font-semibold text-primary underline self-end"
          >
            {t("forgot-password")}
          </Link>

          {/* Social Links */}
          <SocialLinks />

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-3xl text-lg w-full"
            >
              {isPending ? t("logging-in") : t("login")}
            </Button>

            <p className="text-center text-sm text-white">
              {t("no-account")}{" "}
              <Link
                to={localizePath("register")}
                className="text-primary font-bold underline"
              >
                {t("register")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
