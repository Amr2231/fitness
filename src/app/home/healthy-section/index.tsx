"use client";

import Card from "@/components/shared/card";
import SectionTitle from "@/components/shared/section-title";
import { useTranslations } from "use-intl";
import { HealthyCards } from "./healthy-cards";
import { Link, useParams } from "react-router-dom";
import Background from "@/assets/images/healthy-background.jpg";
import { useState } from "react";
import type { HealthyCard } from "@/lib/types/healthy";

type Category = HealthyCard["category"] | "all";

export default function HealthySection() {
  // Translation
  const t = useTranslations("HealthySection");

  // Hooks
  const { locale } = useParams();

  // State
  const [activeTab, setActiveTab] = useState<Category>("all");

  // Variables
  const cards = HealthyCards();

  const tabs: { key: Category; label: string }[] = [
    { key: "all", label: t("tabAll") },
    { key: "breakfast", label: t("cards.breakfast.title") },
    { key: "lunch", label: t("cards.lunch.title") },
    { key: "dinner", label: t("cards.dinner.title") },
  ];

  const visibleCards =
    activeTab === "all" ? cards : cards.filter((c) => c.category === activeTab);

  return (
    <section
      className="relative bg-cover bg-center pb-10 px-6 md:px-16"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Overlay */}
      <div className="absolute  h-5/12 left-0 right-0 top-5  bg-white/60 dark:bg-black/30  backdrop-blur-xl" />

      {/* Section Header  */}
      <header className="relative flex flex-col justify-center items-center gap-4 py-3 mb-3">
        <SectionTitle title={t("title")} background={t("background")} />
        <h3 className="text-2xl relative md:text-4xl text-white lg:text-5xl font-bold font-baloo w-full md:w-4/5 lg:w-8/12 xl:w-[55%] text-center capitalize">
          {t("description.before")}
          <span className="text-primary">{t("description.highlight")}</span>
          {t("description.after")}
        </h3>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mt-2 flex-wrap justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? "bg-primary text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* // Cards Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 w-full ">
        {visibleCards.map((card) => (
          <Link key={card.index} to={`/${locale}/healthy`}>
            <Card
              image={card.image}
              title={card.title}
              buttonText={card.buttonText}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
