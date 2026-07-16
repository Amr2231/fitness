// states
import { useEffect, useState } from "react";

// services
import { getMealsByCategory } from "../../../lib/services/meals.service";
import { getCategories } from "../../../lib/services/categories.service";

// types
import type { Category, Meal } from "../../../lib/types/meals";

// components
import CarouselDots from "./carousel-dots";

// ui carousel
import type { EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// icons
import { ArrowRight } from "lucide-react";

// images
import dumble from "../../../assets/images/dumble.png";
import { useTranslations, useLocale } from "use-intl";
import { useNavigate } from "react-router-dom";

export default function Healthy() {
  // Router
  const navigate = useNavigate();
  // states
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [api, setApi] = useState<EmblaCarouselType | undefined>(undefined);
  // translations
  const t = useTranslations("meal-page");
  // locale
  const locale = useLocale();

  // split categories
  function chunkArray(array: Category[], size: number): Category[][] {
    const result: Category[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  const chunkedCategories = chunkArray(categories, 3);

  // load categories
  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }

    loadCategories();
  }, []);

  // load meals
  useEffect(() => {
    async function loadMeals() {
      const data = await getMealsByCategory(selectedCategory);
      setMeals(data);
    }

    loadMeals();
  }, [selectedCategory]);

  // Only ever show up to 6 meal cards (2 rows x 3 cols) per design
  const visibleMeals = meals.slice(0, 6);

  return (
    <div className="relative w-full mt-48 overflow-hidden bg-background text-foreground">
      {/* subtle radial glow behind the header, purely decorative */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,_rgba(255,65,0,0.12),_transparent_65%)]" />

      <div className="relative px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        {/* watermark title */}
        <h2
          className={`pointer-events-none relative -z-0 hidden text-center text-6xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.06)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.08)] sm:block ${
            locale === "ar" ? "-mb-6" : "-mb-8"
          }`}
        >
          {t("title")}
        </h2>

        {/* header */}
        <div className="relative">
          <div className="mb-4 flex items-center justify-center gap-2">
            <img src={dumble} alt="img-dumble" className="w-7 sm:w-9" />
            <h4 className="text-sm font-semibold uppercase tracking-wide text-orange-500 sm:text-base">
              {t("small-title")}
            </h4>
          </div>

          <h2 className="mx-auto mb-10 max-w-3xl text-center text-2xl font-bold uppercase leading-tight text-foreground sm:text-3xl sm:leading-snug lg:text-4xl">
            <span className="block">{t("first-line")}</span>
            <span className="block">
              {t("customized")}{" "}
              <span className="text-orange-500">{t("special-meal")}</span>{" "}
              {t("for-you")}
            </span>
          </h2>
        </div>

        <Carousel
          setApi={setApi}
          className="mx-auto w-full lg:w-2/3"
          opts={{
            direction: locale === "en" ? "ltr" : "rtl",
          }}
        >
          <CarouselContent>
            {chunkedCategories.map((group, index) => (
              <CarouselItem key={index}>
                {/* categories */}
                <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
                  {group.map((cat) => (
                    <button
                      key={cat.idCategory}
                      onClick={() => setSelectedCategory(cat.strCategory)}
                      className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition sm:text-base ${
                        selectedCategory === cat.strCategory
                          ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                          : "text-zinc-500 hover:text-foreground dark:text-gray-400 dark:hover:text-white"
                      }`}
                    >
                      {cat.strCategory}
                    </button>
                  ))}
                </div>

                {/* meals */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleMeals.map((meal) => (
                    <div
                      key={meal.idMeal}
                      className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                    >
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h3 className="mb-2 truncate text-lg font-bold uppercase tracking-wide text-white">
                          {meal.strMeal}
                        </h3>

                        <button
                          onClick={() =>
                            navigate(`/${locale}/healthy/meals/${meal.idMeal}`)
                          }
                          className="flex items-center gap-2 text-sm font-semibold text-orange-500 cursor-pointer"
                        >
                          <span>Explore</span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-black">
                            <ArrowRight size={12} />
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <CarouselDots api={api} count={chunkedCategories.length} />
      </div>
    </div>
  );
}
