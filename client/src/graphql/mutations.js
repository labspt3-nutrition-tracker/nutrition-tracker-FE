import { gql } from "apollo-boost";

export const ADD_FOOD = gql`
  mutation  addFood($input: FoodInput!){
    addFood(input: $input){
      foodName
      caloriesPerServ
      fats
      carbs
      proteins
      edamam_id
    }
  }
`;

// export const DELETE_FOOD = gql`
//   mutation{
//     deleteFood($id: ID! )
//   }
// `;

// export const EDIT_FOOD = gql`
//   mutation{
//     updateFood($id: ID!, $input: FoodInput!){
//       id
//       foodName
//       caloriesPerServ
//       fats
//       carbs
//       proteins
//     }
//   }
// `;

export const ADD_FOOD_ENTRY = gql`
  mutation addFoodEntry($input: FoodEntryInput!){
    addFoodEntry(input: $input){
      date
      food_id{id, foodName}
      user_id{id, username}
      servingQty
      meal_category_id{id, mealCategoryName}
    }
  }
`;



// export const EDIT_FOOD_ENTRY = gql`
//   mutation{
//     updateFoodEntry($id: ID!, input: FoodEntryInput!){
//       id
//       date
//       food_id{
//         id
//       }
//       user_id{
//         id
//       }
//       servingQty
//       meal_category_id{
//         id
//       }
//     }
//   }
// `;

// export const DELETE_FOOD_ENTRY = gql`
//   mutation{
//     deleteFoodentry($id: ID!)
//   }
// `;
