export const getLastXDays = numOfDays => {
  const days = [];
  let day = Date.now();
  for (let i = 0; i < numOfDays; i++) {
    days.unshift(day);
    day = day - 86400000;
  }
  return days;
};
