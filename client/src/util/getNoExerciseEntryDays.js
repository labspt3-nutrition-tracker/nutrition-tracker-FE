import * as moment from "moment";

export const getNoExerciseEntryDays = (exerciseEntries, days) => {
  let result = [];
  days.forEach(day => {
    const dayEntries = exerciseEntries.filter(
      entry => moment(new Date(entry.exerciseEntryDate)).format("MMM Do YYYY") === moment(day).format("MMM Do YYYY")
    );
    if (dayEntries.length === 0) result.push(day);
  });
  return result;
};
