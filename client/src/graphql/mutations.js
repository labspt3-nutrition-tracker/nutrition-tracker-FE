import { gql } from "apollo-boost";

//Users
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

//Food
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

export const EDIT_FOOD = gql`
  mutation updateFood($id: ID!, $input: FoodInput!) {
    updateFood(id: $id, input: $input) {
      id
      foodName
      caloriesPerServ
      fats
      carbs
      proteins
      edamam_id
    }
  }
`;

export const DELETE_FOOD = gql`
  mutation deleteFood($id: ID!) {
    deleteFood(id: $id)
  }
`;

//Food Entry
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

export const EDIT_FOOD_ENTRY = gql`
  mutation updateFoodEntry($id: ID!, $input: FoodEntryInput!) {
    updateFoodEntry(id: $id, input: $input) {
      id
      food_id {
        foodName
        caloriesPerServ
        fats
        carbs
        proteins
        edamam_id
      }
      meal_category_id {
        id
      }
    }
  }
`;

export const DELETE_FOOD_ENTRY = gql`
  mutation deleteFoodEntry($id: ID!) {
    deleteFoodEntry(id: $id)
  }
`;

// Weight
export const ADD_WEIGHT_ENTRY_MUTATION = gql`
  mutation($input: WeightEntryInput!) {
    addWeightEntry(input: $input) {
      id
      weight
      date
    }
  }
`;

// Exercise entry
export const DELETE_EXERENTRY = gql`
  mutation deleteExerciseEntry($id: ID!) {
    deleteExerciseEntry(id: $id)
  }
`;

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

//Messages
export const DELETE_MESSAGE_MUTATION = gql`
  mutation deleteMessage($id: ID!) {
    deleteMessage(id: $id)
  }
`;

export const ADD_MESSAGE_MUTATION = gql`
  mutation addMessage($input: MessageInput!) {
    addMessage(input: $input) {
      id
      created_at
      type
      text
      read
      sender {
        id
        firstName
        lastName
        email
      }
      recipient {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_MESSAGE_MUTATION = gql`
  mutation updateMessage($id: ID!, $input: MessageInput!) {
    updateMessage(id: $id, input: $input) {
      id
      text
      type
      recipient {
        id
        username
        firstName
        lastName
        email
      }
      sender {
        id
        username
        firstName
        lastName
        email
      }
      read
    }
  }
`;

//Coaches
export const ADD_TRAINEE = gql`
  mutation addTrainees($coach_id: ID!, $trainee_id: ID!) {
    addTrainees(coach_id: $coach_id, trainee_id: $trainee_id) {
      id
      username
      firstName
      lastName
      email
      calorieGoal
      weight
    }
  }
`;

export const DELETE_TRAINEE = gql`
  mutation deleteTrainees($coach_id: ID!, $trainee_id: ID!) {
    deleteTrainees(coach_id: $coach_id, trainee_id: $trainee_id)
  }
`;

//Subscriptions
export const CREATE_SUBSCRIPTION = gql`
  mutation createSubscription(
    $source: String!
    $email: String!
    $amount: Int!
  ) {
    createSubscription(source: $source, email: $email, amount: $amount) {
      id
    }
  }
`;
