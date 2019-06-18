export const getGoalReached = (user, caloriesEntries) => {
  const goal = user.calorieGoal;
  const result = caloriesEntries.map(entry => {
    if (entry === 0) return 0;
    if (entry > goal) return -1;
    else if (entry <= goal) return 1;
    return 0;
  });
  return result;
};
