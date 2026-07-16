export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type CategoriesResponse = {
  categories: Category[];
};

export type MealsResponse = {
  meals: Meal[];
};

type IngredientKeys = {
  [K in `strIngredient${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20}`]: string;
};

type MeasureKeys = {
  [K in `strMeasure${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20}`]: string;
};

export interface MealDetails extends IngredientKeys, MeasureKeys {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

export interface MealsDetailsResponse {
  meals: MealDetails[];
}
