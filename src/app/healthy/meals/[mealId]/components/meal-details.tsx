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
      <div className="bg-cover h-134 p-8 flex items-end" style={{ backgroundImage: `url(${meal?.strMealThumb})` }}>
        <div className="space-y-4">
          <h3 className="text-center text-5xl font-medium min-h-16">{meal?.strMeal}</h3>
          <p className="w-5/6 text-lg max-h-36 overflow-hidden">{meal?.strInstructions}</p>
          {/* Nutritional Info */}
          <ul className="flex justify-between">
            {infoList.map((item) => (
              <li key={item.id} className="border border-[#D3D3D3] rounded-[20px] p-2 text-center">
                <p>{item.value}</p>
                <p className="font-bold text-primary">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* ingredients title */}
      <h5 className="text-3xl font-medium h-11 mt-6 mb-4">{t("ingredients")}</h5>
      {/* ingredients list */}
      <ul className="py-4 px-2 grid grid-cols-2 gap-x-[20%] gap-y-2.5">
        {ingredients.map((item, index) => (
          <li key={index} className="col-span-1 flex justify-between border-b border-[#2D2D2D]">
            <h6 className="font-semibold">{item.ingredient}</h6>
            <p className="text-primary">{item.measure}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
