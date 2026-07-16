import axios from "axios";
import type {
  CategoriesResponse,
  MealsDetailsResponse,
  MealsResponse,
} from "../types/meals";

// Base URL for API requests
const BASE_URL = import.meta.env.VITE_API_URL_SECOND;

// Get Meal Categories
export const getMealCategories = async (): Promise<CategoriesResponse> => {
  const { data } = await axios.get(`${BASE_URL}/1/categories.php`);
  return data;
};

// Get Meals by Special Category
export const getMealsBySpecialCategory = async (
  category: string,
): Promise<MealsResponse> => {
  const { data } = await axios.get(`${BASE_URL}/1/filter.php?c=${category}`);
  return data;
};

// Get meal details by meal ID
export const getMealDetails = async (
  mealId: string,
): Promise<MealsDetailsResponse> => {
  const { data } = await axios.get(`${BASE_URL}/1/lookup.php?i=${mealId}`);
  return data;
};
