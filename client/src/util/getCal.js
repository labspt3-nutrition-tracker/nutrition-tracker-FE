export const calFunctions = {
  getDayCalByMealCat: (entries, mealCat, forDay) => {
    return entries
      .filter(entry => {
        const day = forDay ? new Date(forDay).toDateString() : new Date().toDateString();
        const date = new Date(entry.date).toDateString();
        return date === day;
      })
      .filter(entry => entry.meal_category_id.mealCategoryName === mealCat)
      .map(entry => entry.servingQty * entry.food_id.caloriesPerServ)
      .reduce((total, cal) => total + cal, 0);
  }
};
