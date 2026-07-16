import { useState } from "react";
import { useMealCategories, useMealsByCategory } from "@/lib/hooks/use-meal-details";
import MealItem from "./meal-item";
import { cn } from "@/lib/utils/tailwind-merge";

export default function MealsCategories() {
  // State
  const [category, setCategory] = useState<string>("");

  // Queries
  const { data: categories } = useMealCategories();

  const selectedCategory = category || categories?.categories?.[0]?.strCategory || "";

  const { data: meals } = useMealsByCategory(selectedCategory);

  return (
    <section className="border-2 border-[#282828] rounded-2xl p-4 h-fit overflow-hidden">
      {/* show categories */}
      <ul className="my-2 pb-2 px-4 flex items-center gap-6 text-xl font-bold w-[95%] overflow-x-scroll">
        {categories?.categories?.map((category) => (
          <li key={category.idCategory} className={cn(category.strCategory === selectedCategory && "bg-primary p-2 rounded-[20px]")}>
            <button onClick={() => setCategory(category.strCategory)}>{category.strCategory}</button>
          </li>
        ))}
      </ul>
      {/* show Meals by special Category */}
      <ul className="flex flex-col gap-6 overflow-y-auto max-h-166">
        {(meals?.meals ?? []).map((meal) => (
          <li key={meal.idMeal}>
            <MealItem idMeal={meal.idMeal} strMeal={meal.strMeal} strMealThumb={meal.strMealThumb} />
          </li>
        ))}
      </ul>
    </section>
  );
}
