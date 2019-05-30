import { getDayDataByMealCat } from "./getCal";

export const getDailyData = (foodEntries, dataType) => {
  const breakfastCalories = getDayDataByMealCat(foodEntries, "Breakfast", dataType);
  const lunchCalories = getDayDataByMealCat(foodEntries, "Lunch", dataType);
  const snackCalories = getDayDataByMealCat(foodEntries, "Snack", dataType);
  const dinnerCalories = getDayDataByMealCat(foodEntries, "Dinner", dataType);
  return [breakfastCalories, lunchCalories, snackCalories, dinnerCalories];
};
