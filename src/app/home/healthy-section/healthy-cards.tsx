import type { HealthyCard } from "@/lib/types/healthy";
import { useTranslations } from "use-intl";

export function HealthyCards(): HealthyCard[] {
  // Translation
  const t = useTranslations("HealthySection");

  return [
    {
      image: "/src/assets/images/healthy1.jpg",
      title: t("cards.breakfast.title"),
      buttonText: t("cards.breakfast.buttonText"),
      index: 1,
    },
    {
      image: "/src/assets/images/healthy2.jpg",
      title: t("cards.lunch.title"),
      buttonText: t("cards.lunch.buttonText"),
      index: 2,
    },
    {
      image: "/src/assets/images/healthy3.jpg",
      title: t("cards.dinner.title"),
      buttonText: t("cards.dinner.buttonText"),
      index: 3,
    },
  ];
}
