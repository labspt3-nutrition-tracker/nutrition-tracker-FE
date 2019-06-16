import { gql } from "apollo-boost";

export const ADD_FOOD = gql`
  mutation addFood($input: FoodInput!) {
    addFood(input: $input) {
      foodName
      caloriesPerServ
      fats
      carbs
      proteins
      edamam_id
      id
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
  mutation addFoodEntry($input: FoodEntryInput!) {
    addFoodEntry(input: $input) {
      date
      food_id {
        id
        foodName
      }
      user_id {
        id
        username
      }
      servingQty
      meal_category_id {
        id
        mealCategoryName
      }
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

export const ADD_WEIGHT_ENTRY_MUTATION = gql`
  mutation($input: WeightEntryInput!) {
    addWeightEntry(input: $input) {
      id
      weight
      date
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      id
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`;

export const DELETE_EXERENTRY = gql`
  mutation deleteExerciseEntry($id: ID!) {
    deleteExerciseEntry(id: $id)
  }
`;

export const DELETE_FOOD = gql`
  mutation deleteFood($id: ID!){
    deleteFood(id: $id)
  }
`;

export const DELETE_FOOD_ENTRY = gql`
  mutation deleteFoodEntry($id: ID!){
    deleteFoodEntry(id: $id)
  }
`;

// export const EDIT_EXER_ENTRY = gql`
//   mutation($id: ID!, $input: ExerciseEntryInput!){
//     updateExerciseEntry(id: $id, input: $input)
//     {
//       id
//       exerciseEntryDate
//       exerciseName
//       caloriesBurned
//       exercise_entry_user_id{
//         id
//       }
//     }
//   }
// `;

export const EDIT_EXER_ENTRY = gql`
  mutation($id: ID!, $input: ExerciseEntryInput!) {
    updateExerciseEntry(id: $id, input: $input) {
      id
      exerciseEntryDate
      exerciseName
      caloriesBurned
      exercise_entry_user_id {
        id
      }
    }
  }
`;

export const ADD_EXERENTRY = gql`
  mutation addExerciseEntry($input: ExerciseEntryInput!) {
    addExerciseEntry(input: $input) {
      id
      exerciseName
      caloriesBurned
    }
  }
`;
