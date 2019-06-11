import * as moment from "moment";

export const getExercises = (exerciseEntries, days) => {
  const result = [];
  days.forEach(day => {
    const exerciseCalories = exerciseEntries
      .filter(
        entry => moment(new Date(entry.exerciseEntryDate)).format("MMM Do YYYY") === moment(day).format("MMM Do YYYY")
      )
      .reduce((total, entry) => total + entry.caloriesBurned, 0);
    result.push(exerciseCalories);
  });
  return result;
};
