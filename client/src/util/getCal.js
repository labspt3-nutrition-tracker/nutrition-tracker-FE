export const getDayDataByMealCat = (entries, mealCat, data, forDay) => {
  return entries
    .filter(entry => {
      const day = forDay ? new Date(forDay).toDateString() : new Date().toDateString();
      const date = new Date(entry.date).toDateString();
      return date === day;
    })
    .filter(entry => entry.meal_category_id.mealCategoryName === mealCat)
    .map(entry => entry.servingQty * entry.food_id[data])
    .reduce((total, data) => total + data, 0);
};
