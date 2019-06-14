import { getDayDataByMealCat } from "./getDayData";

export const getDailyData = (foodEntries, dataType, day) => {
  const result = [];
  const breakfast = getDayDataByMealCat(foodEntries, "Breakfast", dataType, day);
  result.push(breakfast);
  result.push(getDayDataByMealCat(foodEntries, "Lunch", dataType, day));
  result.push(getDayDataByMealCat(foodEntries, "Snack", dataType, day));
  result.push(getDayDataByMealCat(foodEntries, "Dinner", dataType, day));
  return result;
};
