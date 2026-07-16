import { useQuery } from "@tanstack/react-query";
import {
  getMealCategories,
  getMealDetails,
  getMealsBySpecialCategory,
} from "../services/meal-details.service";

// Get Meal Categories
export const useMealCategories = () => {
  return useQuery({
    queryKey: ["meals-categories"],
    queryFn: () => getMealCategories(),
  });
};

//  Get meals by Special Category
export const useMealsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["meals", category],
    queryFn: () => getMealsBySpecialCategory(category),
  });
};

//  Get meal details by meal ID
export const useMealDetails = (mealId: string) => {
  return useQuery({
    queryKey: ["meals", mealId],
    queryFn: () => getMealDetails(mealId),
  });
};
