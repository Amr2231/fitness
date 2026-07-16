import {
  GitCompareArrows,
  Globe,
  GlobeLock,
  LifeBuoy,
  LogOut,
  Moon,
  ShieldAlert,
} from "lucide-react";
import { useGetUser } from "./hooks/use-get-user";
import ThemeToggle from "@/components/layout/navbar/theme-toggle";
import { useTheme } from "next-themes";
import { EditGoalDialog } from "./components/edit-goal-dialog";
import type { RegisterSchema } from "@/lib/schemas/auth.schema";
import { EditLevelDialog } from "./components/edit-level-dialog";
import { EditWeightDialog } from "./components/edit-weight-dialog";
import { ChangePasswordDialog } from "./components/change-password-dialog";
import { InfoDialog } from "./components/info-dialog";
import { useTranslations } from "use-intl";
import { getLevels } from "@/lib/constants/levels";
import { logoutService } from "@/lib/services/logout.service";
import { notifyAuthChanged } from "@/lib/hooks/use-auth-status";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils/tailwind-merge";

export default function Account() {
  const { data } = useGetUser();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { locale } = useParams();
  const t = useTranslations("account");

  const queryClient = useQueryClient();

  const userStats = [
    {
      key: "goal",
      label: t("your-goal"),
      value: data?.user.goal,
      editable: true,
    },
    {
      key: "activityLevel",
      label: t("level"),
      value: data?.user.activityLevel,
    },
    {
      key: "weight",
      label: t("weight"),
      value: data?.user.weight,
    },
  ];
  const actions = [
    {
      key: "change-password",
      icon: <GitCompareArrows color="#FF4100" />,
      label: t("change-password"),
    },
    {
      key: "language",
      icon: <Globe color="#FF4100" />,
      label: t("select-language"),
      extra: (
        <span>
          (
          <span className="text-primary cursor-pointer">
            {locale === "en" ? t("english") : t("arabic")}
          </span>
          )
        </span>
      ),
      action: () => {
        const newLocale = locale === "en" ? "ar" : "en";
        navigate(`/${newLocale}/account`);
      },
    },
    {
      key: "mode",
      icon: <Moon color="#FF4100" />,
      label: (
        <p>
          {t("mode")} (
          <span className="text-primary capitalize">
            {theme == "dark" ? t("dark") : t("light")}
          </span>
          )
        </p>
      ),
      extra: <ThemeToggle />,
    },
    {
      key: "security",
      icon: <GlobeLock color="#FF4100" />,
      label: t("security"),
    },
    {
      key: "privacy",
      icon: <ShieldAlert color="#FF4100" />,
      label: t("privacy"),
    },
    {
      key: "help",
      icon: <LifeBuoy color="#FF4100" />,
      label: t("help"),
    },
    {
      key: "logout",
      icon: <LogOut color="#FF4100" />,
      label: t("logout"),
      isLast: true,
      action: async () => {
        logoutService();
        localStorage.removeItem("token");
        notifyAuthChanged();

        queryClient.clear();
        navigate(`/${locale}/login`, { replace: true });
      },
    },
  ];

  const t2 = useTranslations("Register");
  const LEVELS = getLevels(t2);

  const getLevelLabel = (value?: string) => {
    return LEVELS.find((l) => l.value === value)?.label ?? value;
  };

  return (
    <div className="pt-25 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-10 dark:text-white text-black">
        {/* Stats */}
        <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-6 sm:gap-x-12 md:gap-x-20 w-full">
          {userStats.map((item) => (
            <span key={item.key} className="text-center">
              <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {item.label}
              </h4>

              {item.key === "goal" && (
                <EditGoalDialog
                  currentGoal={data?.user.goal as RegisterSchema["goal"]}
                />
              )}
              {item.key === "activityLevel" && (
                <EditLevelDialog
                  currentLevel={
                    data?.user.activityLevel as RegisterSchema["activityLevel"]
                  }
                />
              )}
              {item.key === "weight" && (
                <EditWeightDialog
                  currentWeight={data?.user.weight as RegisterSchema["weight"]}
                />
              )}

              <span className="bg-primary dark:text-white text-black py-2 px-4 rounded-2xl flex items-center justify-between gap-4 mt-4 w-36 sm:w-44 md:w-52 mx-auto">
                <span className="truncate">
                  {item.key === "activityLevel"
                    ? getLevelLabel(item.value?.toString())
                    : item.value}
                </span>
                <GitCompareArrows className="shrink-0" size={20} />
              </span>
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 w-full max-w-5xl">
          {actions.map((item, index) => {
            const cardClassName = cn(
              "min-h-32 sm:min-h-42 border border-black/10 dark:border-white/15 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-sm py-6 px-6 sm:py-9 sm:px-14 flex flex-col items-center justify-center gap-4 sm:gap-5 rounded-2xl text-center cursor-pointer transition-colors hover:bg-white/60 dark:hover:bg-white/10",
              item.isLast && "lg:col-start-2",
            );

            const cardBody = (
              <>
                {item.icon}
                {typeof item.label === "string" ? (
                  <p>{item.label}</p>
                ) : (
                  item.label
                )}
                {item.extra}
              </>
            );

            if (item.key === "change-password") {
              return (
                <ChangePasswordDialog
                  key={item.key}
                  email={data?.user.email}
                  trigger={<div className={cardClassName}>{cardBody}</div>}
                />
              );
            }

            if (
              item.key === "security" ||
              item.key === "privacy" ||
              item.key === "help"
            ) {
              return (
                <InfoDialog
                  key={item.key}
                  title={typeof item.label === "string" ? item.label : ""}
                  description={t(
                    `${item.key}-desc` as
                      | "security-desc"
                      | "privacy-desc"
                      | "help-desc",
                  )}
                  content={
                    t.raw(
                      `${item.key}-content` as
                        | "security-content"
                        | "privacy-content"
                        | "help-content",
                    ) as string[]
                  }
                  trigger={<div className={cardClassName}>{cardBody}</div>}
                />
              );
            }

            return (
              <div
                key={item.key ?? index}
                onClick={item.action}
                className={cardClassName}
              >
                {cardBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
