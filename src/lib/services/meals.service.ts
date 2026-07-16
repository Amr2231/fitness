import axios from "axios";
import type { MealsResponse, Meal } from "../../lib/types/meals";

export async function getMealsByCategory(category: string): Promise<Meal[]> {
  const { data } = await axios.get<MealsResponse>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  );

  return data.meals ?? [];
}
