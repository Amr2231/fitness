import type { HealthyCard } from "@/lib/types/healthy";
import { useTranslations } from "use-intl";
import healthy1 from "@/assets/images/healthy1.jpg";
import healthy2 from "@/assets/images/healthy2.jpg";
import healthy3 from "@/assets/images/healthy3.jpg";

export function HealthyCards(): HealthyCard[] {
  // Translation
  const t = useTranslations("HealthySection");

  return [
    {
      image: healthy1,
      title: t("cards.breakfast.title"),
      buttonText: t("cards.breakfast.buttonText"),
      index: 1,
      category: "breakfast",
    },
    {
      image: healthy2,
      title: t("cards.lunch.title"),
      buttonText: t("cards.lunch.buttonText"),
      index: 2,
      category: "lunch",
    },
    {
      image: healthy3,
      title: t("cards.dinner.title"),
      buttonText: t("cards.dinner.buttonText"),
      index: 3,
      category: "dinner",
    },
  ];
}
