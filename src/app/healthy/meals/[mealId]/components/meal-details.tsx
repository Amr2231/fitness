import { useMealDetails } from "@/lib/hooks/use-meal-details";
import type { MealDetails } from "@/lib/types/meals";
import { useParams } from "react-router-dom";
import { useTranslations } from "use-intl";

export default function MealDetailsPage() {
  // Translation
  const t = useTranslations("meal-details");

  // Navigation
  const { mealId } = useParams<{ mealId: string }>();

  // Queries
  const { data: mealData } = useMealDetails(mealId!);

  // Variables => This is a flexible choice
  const meal = mealData?.meals?.[0];

  // Extracting ingredients and measures
  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    ingredient: meal?.[`strIngredient${i + 1}` as keyof MealDetails] as string,
    measure: meal?.[`strMeasure${i + 1}` as keyof MealDetails] as string,
  })).filter((item) => item.ingredient && item.ingredient.trim() !== "");

  // Dummy nutritional info
  const infoList = [
    { id: 1, name: t("energy"), value: "100 k" },
    { id: 2, name: t("protein"), value: "156" },
    { id: 3, name: t("carbs"), value: "58 G" },
    { id: 4, name: t("fat"), value: "20 G" },
  ];

  return (
    <section>
      {/* Meal Image , Title , description and info list */}
      <div
        className="bg-cover bg-center rounded-2xl sm:rounded-none h-auto min-h-64 sm:min-h-96 lg:h-134 p-4 sm:p-6 lg:p-8 flex items-end"
        style={{ backgroundImage: `url(${meal?.strMealThumb})` }}
      >
        <div className="space-y-3 sm:space-y-4 w-full">
          <h3 className="text-center text-2xl sm:text-3xl lg:text-5xl font-medium sm:min-h-16 text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
            {meal?.strMeal}
          </h3>
          <p className="w-full sm:w-5/6 text-sm sm:text-base lg:text-lg max-h-24 sm:max-h-36 overflow-hidden text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
            {meal?.strInstructions}
          </p>
          {/* Nutritional Info */}
          <ul className="flex flex-wrap justify-center sm:justify-between gap-2">
            {infoList.map((item) => (
              <li
                key={item.id}
                className="border border-[#D3D3D3] bg-black/30 backdrop-blur-sm rounded-[20px] p-2 text-center text-sm sm:text-base"
              >
                <p className="text-white">{item.value}</p>
                <p className="font-bold text-primary">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* ingredients title */}
      <h5 className="text-xl sm:text-2xl lg:text-3xl font-medium mt-6 mb-4">
        {t("ingredients")}
      </h5>
      {/* ingredients list */}
      <ul className="py-4 px-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-[20%] gap-y-2.5">
        {ingredients.map((item, index) => (
          <li key={index} className="col-span-1 flex justify-between gap-4 border-b border-[#2D2D2D] pb-1">
            <h6 className="font-semibold">{item.ingredient}</h6>
            <p className="text-primary shrink-0">{item.measure}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
