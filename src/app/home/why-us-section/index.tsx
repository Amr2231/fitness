import SectionTitle from "@/components/shared/section-title";
import { useTranslations } from "use-intl";
import hero1 from "@/assets/images/hero1.jpg";
import hero2 from "@/assets/images/hero2.png";
import hero3 from "@/assets/images/hero3.jpg";
import hero4 from "@/assets/images/hero4.png";

export default function WhyUsSection() {
  // Translation
  const t = useTranslations("WhyUs");

  // Variables
  const images = [hero2, hero1, hero3, hero4];

  const whyUsData = [
    {
      id: "01",
      title: t("items.personalized.title"),
      description: t("items.personalized.description"),
    },
    {
      id: "02",
      title: t("items.results.title"),
      description: t("items.results.description"),
    },
    {
      id: "03",
      title: t("items.support.title"),
      description: t("items.support.description"),
    },
  ];

  return (
    <section className="w-full py-10 px-6 md:px-16 bg-white dark:bg-main">
      <div className="flex flex-col lg:flex-row gap-12 w-full">
        {/* Left Content */}
        <div className="lg:w-1/2 flex flex-col gap-8">
          <SectionTitle title={t("title")} background={t("title")} />

          <h3 className="text-4xl md:text-5xl font-bold font-baloo text-main dark:text-white">
            {t("description.before")}
            <span className="text-primary">{t("description.highlight")}</span>
            {t("description.after")}
          </h3>

          <p className="text-main/70 dark:text-zinc-300 text-lg">
            {t("paragraph")}
          </p>

          <ul className="flex flex-col gap-6 mt-6">
            {whyUsData.map((item) => (
              <li key={item.id} className="flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center my-auto font-bold text-white">
                  {item.id}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-main dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-main/70 dark:text-zinc-300 mt-1">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Images Grid */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={images[0]}
                alt="Fitness training"
                className="w-full h-56 sm:h-72 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={images[2]}
                alt="Gym equipment"
                className="w-full h-56 sm:h-72 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Right column, offset down for a staggered gallery look */}
          <div className="flex flex-col gap-4 md:mt-10">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={images[1]}
                alt="Weight lifting"
                className="w-full h-56 sm:h-72 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={images[3]}
                alt="Stretching"
                className="w-full h-56 sm:h-72 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
