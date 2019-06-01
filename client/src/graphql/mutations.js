export const ADD_FOOD = `
  mutation{
    addFood{
      foodName
      caloriesPerServ
      fats
      carbs
      proteins
      edamam_id
    }
  }
`

export const ADD_FOOD_ENTRY = `
  mutation{
    addFoodEntry{
      date
      food_id
      user_id
      servingQty
      meal_category_id
    }
  }
`
