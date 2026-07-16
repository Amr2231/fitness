import type { Meal } from "@/lib/types/meals";
import { useNavigate } from "react-router-dom";
import { useLocale } from "use-intl";

export default function MealItem({ idMeal, strMeal, strMealThumb }: Meal) {
  // locale
  const locale = useLocale();
  // Router
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-4 px-4 py-2 border-b border-[#2D2D2D] cursor-pointer"
      onClick={() => navigate(`/${locale}/healthy/meals/${idMeal}`)}
    >
      <img src={strMealThumb} alt={strMeal} className="w-20 h-22 rounded-2xl" loading="lazy" />
      <div className="space-y-1">
        <h6 className="text-lg font-medium ">{strMeal}</h6>
        <p className="text-sm h-10 overflow-hidden ">
          Lorem ipsum dolor sit amet consectetur. Tempus Lorem ipsum dolor sit amet consectetur. Tempus
        </p>
      </div>
    </div>
  );
}
