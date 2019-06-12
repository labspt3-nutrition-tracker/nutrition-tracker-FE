import * as moment from "moment";

export const getTotalExerCalories = (exerciseEntries, days) => {
  let result = 0;
  days.forEach(day => {
    const dayEntries = exerciseEntries
      .filter(
        entry => moment(new Date(entry.exerciseEntryDate)).format("MMM Do YYYY") === moment(day).format("MMM Do YYYY")
      )
      .reduce((total, entry) => total + entry.caloriesBurned, 0);
    result += dayEntries;
  });
  return result;
};
