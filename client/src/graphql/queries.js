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
      food_category_id {
        foodCategoryName
      }
    }
    meal_category_id {
      mealCategoryName
    }
  }
}
`;
