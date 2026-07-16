import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { User, Mail, Lock } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { type RegisterSchema } from "@/lib/schemas/auth.schema";
import SocialLinks from "./social-links";
import { useTranslations } from "use-intl";
import { useLocaleNavigation } from "@/lib/hooks/use-navigation";

export default function RegisterForm({ nextStep }: RegisterFormProps) {
  const t = useTranslations("Register");
  const { localizePath } = useLocaleNavigation();
  const form = useFormContext<RegisterSchema>();

  const handleNext = async () => {
    // Validate ONLY this step fields
    const isValid = await form.trigger([
      "firstName",
      "lastName",
      "email",
      "password",
      "rePassword",
    ]);

    if (isValid) {
      nextStep?.();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* Header */}
      <header className="flex flex-col items-center gap-0.5 mb-4">
        <span className="text-lg text-white">{t("hey-there")}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white capitalize">
          {t("create-account")}
        </h1>
      </header>

      {/* Fields */}
      <div className="w-full max-w-121.5 flex flex-col gap-2.5 rounded-[50px] border border-[#D3D3D3] bg-main/10 backdrop-blur-3xl p-8">
        <h2 className="text-xl font-bold text-center text-white mb-1">
          {t("register")}
        </h2>

        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("first-name")}
                  icon={<User className="h-5 w-5 text-gray-400" />}
                  className="h-11 rounded-2xl"
                />
              </FormControl>
              <FormMessage className="text-red-500 ms-2" />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("last-name")}
                  icon={<User className="h-5 w-5 text-gray-400" />}
                  className="h-11 rounded-2xl"
                />
              </FormControl>
              <FormMessage className="text-red-500 ms-2" />
            </FormItem>
          )}
        />

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
                  className="h-11 rounded-2xl"
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
                  className="h-11 rounded-2xl"
                />
              </FormControl>
              <FormMessage className="text-red-500 ms-2" />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder={t("confirm-password")}
                  icon={<Lock className="h-5 w-5" />}
                  className="h-11 rounded-2xl"
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
        <div className="flex flex-col gap-2.5 mt-2">
          <Button
            type="button"
            onClick={handleNext}
            className="rounded-3xl text-lg w-full"
          >
            {t("register")}
          </Button>

          <p className="text-center text-sm text-white">
            {t("have-account")}{" "}
            <Link
              to={localizePath("login")}
              className="text-primary font-bold underline"
            >
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
