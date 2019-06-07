import * as moment from "moment";

export const getWeights = (weightEntries, days) => {
  const result = [];
  let current = 0;
  days.forEach(day => {
    let weight = weightEntries
      .filter(entry => moment(new Date(entry.date)).format("MMM Do YYYY") === moment(day).format("MMM Do YYYY"))
      .map(entry => entry.weight);
    weight = weight.length > 0 ? weight.pop() : 0;
    if (weight === 0) weight = current;
    else current = weight;
    result.push(weight);
  });
  return result;
};
