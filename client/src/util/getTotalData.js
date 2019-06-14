import * as moment from "moment";

export const getTotalData = (foodEntries, dataType, days) => {
  const result = [];
  days.forEach(day => {
    const total = foodEntries
      .filter(entry => moment(new Date(entry.date)).format("MMM Do YYYY") === moment(day).format("MMM Do YYYY"))
      .map(entry => entry.servingQty * entry.food_id[dataType])
      .reduce((total, entry) => total + entry, 0);
    result.push(total);
  });
  return result;
};
