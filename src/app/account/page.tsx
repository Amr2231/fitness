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
import { useTranslations } from "use-intl";
import { getLevels } from "@/lib/constants/levels";
import { logoutService } from "@/lib/services/logout.service";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

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
      icon: <GitCompareArrows color="#FF4100" />,
      label: t("change-password"),
    },
    {
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
      icon: <GlobeLock color="#FF4100" />,
      label: t("security"),
    },
    {
      icon: <ShieldAlert color="#FF4100" />,
      label: t("privacy"),
    },
    {
      icon: <LifeBuoy color="#FF4100" />,
      label: t("help"),
    },
    {
      icon: <LogOut color="#FF4100" />,
      label: t("logout"),
      isLast: true,
      action: async () => {
        logoutService();
        localStorage.removeItem("token");

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
    <div className="pt-25 pb-10">
      <div className="flex flex-col items-center gap-10 dark:text-white text-black">
        {/* Stats */}
        <div className="flex items-center justify-between gap-20">
          {userStats.map((item) => (
            <span key={item.key} className="text-center">
              <h4 className="text-4xl font-bold">{item.label}</h4>

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

              <span className="bg-primary dark:text-white text-black py-2 px-4 rounded-2xl flex items-center justify-between gap-20 mt-4">
                {item.key === "activityLevel"
                  ? getLevelLabel(item.value?.toString())
                  : item.value}
                <GitCompareArrows />
              </span>
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl">
          {actions.map((item, index) => (
            <div
              onClick={item.action}
              key={index}
              className={`
                min-h-42 border dark:border-white  py-9 px-14 flex flex-col items-center justify-center gap-5 rounded-2xl
                ${item.isLast ? "lg:col-start-2" : ""}
              `}
            >
              {item.icon}
              {typeof item.label === "string" ? (
                <p>{item.label}</p>
              ) : (
                item.label
              )}
              {item.extra}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
