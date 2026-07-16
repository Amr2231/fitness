"use client";

import Card from "@/components/shared/card";
import SectionTitle from "@/components/shared/section-title";
import { useTranslations } from "use-intl";
import { HealthyCards } from "./healthy-cards";
import { Link, useParams } from "react-router-dom";
import Background from "@/assets/images/healthy-background.jpg";

export default function HealthySection() {
  // Translation
  const t = useTranslations("HealthySection");

  // Hooks
  const { locale } = useParams();

  // Variables
  const cards = HealthyCards();

  return (
    <section
      className="relative bg-cover bg-center pb-10 px-6 md:px-16"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Overlay */}
      <div className="absolute  h-5/12 left-0 right-0 top-5  bg-white/60 dark:bg-black/30  backdrop-blur-xl" />

      {/* Section Header  */}
      <header className="flex flex-col justify-center items-center gap-4 py-3 mb-3">
        <SectionTitle title={t("title")} background={t("background")} />
        <h3 className="text-2xl relative md:text-4xl text-white lg:text-5xl font-bold font-baloo w-full md:w-4/5 lg:w-8/12 xl:w-[55%] text-center capitalize">
          {t("description.before")}
          <span className="text-primary">{t("description.highlight")}</span>
          {t("description.after")}
        </h3>
      </header>
      {/* // Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 w-full ">
        {cards.map((card) => (
          <Link to={`/${locale}/healthy`}>
            <Card
              key={card.index}
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
