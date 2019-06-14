import * as moment from "moment";

export const getDayDataByMealCat = (entries, mealCat, data, forDay) => {
  const result = entries
    .filter(entry => {
      const day = forDay ? moment(forDay).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
      const date = moment(new Date(entry.date)).format("YYYY-MM-DD");
      return date === day;
    })
    .filter(entry => entry.meal_category_id.mealCategoryName === mealCat)
    .map(entry => entry.servingQty * entry.food_id[data])
    .reduce((total, d) => total + d, 0);
  return result;
};
