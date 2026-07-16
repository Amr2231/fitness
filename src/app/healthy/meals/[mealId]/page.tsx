import { useTranslations } from "use-intl";
import MealDetails from "./components/meal-details";
import MealsCategories from "./components/meals-categories";

export default function Meal() {
  // Translation
  const t = useTranslations("meal-details");

  return (
    <main className="flex justify-center">
      <div className="container grid grid-cols-3 gap-9">
        {/* #TODO : Waiting for Title Design */}
        <h2 className="col-span-3 text-3xl font-bold text-center">{t("title")}</h2>
        <div className="col-span-1 ">
          {/* show categories and meals of selected category */}
          <MealsCategories />
        </div>
        <div className="col-span-2 capitalize">
          {/* show meal details */}
          <MealDetails />
        </div>
      </div>
    </main>
  );
}
