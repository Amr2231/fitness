import axios from "axios";
import type { CategoriesResponse, Category } from "../types/meals";

export async function getCategories(): Promise<Category[]> {
  const { data } = await axios.get<CategoriesResponse>(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );

  return data.categories ?? [];
}
