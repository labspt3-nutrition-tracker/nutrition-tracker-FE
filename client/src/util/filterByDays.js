import * as moment from "moment";

export const filterByDays = (data, days, dayField) => {
  if (!data || !days || !dayField) return [];
  const result = [];
  days.forEach(day => {
    result.push(
      data.filter(d => moment(new Date(d[dayField])).format("MM/DD") === moment(new Date(day)).format("MM/DD"))
    );
  });
  return result;
};
