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
`;

export const DELETE_FOOD = `
  mutation{
    deleteFood($id: ID! )
  }
`;

export const EDIT_FOOD = `
  mutation{
    updateFood($id: ID!, $input: FoodInput!){
      id
      foodName
      caloriesPerServ
      fats
      carbs
      proteins
    }
  }
`;

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
export const EDIT_FOOD_ENTRY = `
  mutation{
    updateFoodEntry($id: ID!, input: FoodEntryInput!){
      id
      date
      food_id{
        id
      }
      user_id{
        id
      }
      servingQty
      meal_category_id{
        id
      }
    }
  }
`;

export const DELETE_FOOD_ENTRY = `
  mutation{
    deleteFoodentry($id: ID!)
  }
`;
