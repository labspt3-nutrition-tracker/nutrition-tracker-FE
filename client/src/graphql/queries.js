export const GET_FOOD_ENTRIES_BY_USER_QUERY = `
query($userId: ID!)
{
  getFoodEntriesByUserId(userId: $userId) {
    id
    date
    servingQty
    user_id {
      username
      firstName
      lastName
      email
      id
    }
    food_id {
      foodName
      caloriesPerServ
    }
    meal_category_id {
      mealCategoryName
    }
  }
}
`;

export const GET_CURRENT_USER_QUERY = `
{
  getCurrentUser {
    id
    username
    firstName
    lastName
    email
    userType
    calorieGoal
    weight
  }
}
`;
