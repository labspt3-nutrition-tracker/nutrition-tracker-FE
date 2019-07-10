import { gql } from "apollo-boost";

// User
export const GET_FOOD_ENTRIES_BY_USER_QUERY = gql`
  query getFoodEntriesByUserId($userId: ID!) {
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
        id
        foodName
        caloriesPerServ
        fats
        proteins
        carbs
        edamam_id
      }
      meal_category_id {
        id
        mealCategoryName
      }
    }
  }
`;

export const GET_CURRENT_USER_QUERY = gql`
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

export const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!){
    getUserById(userId: $userId){
      id
      weight
    }
  }
`;

export const USER_EXIST_QUERY = gql`
  query getUserBy($param: String!, $value: String!) {
    getUserBy(param: $param, value: $value) {
      email
    }
  }
`;

export const SEARCH_USER_BY_EMAIL = gql`
  query getUserBy($param: String!, $value: String!) {
    getUserBy(param: $param, value: $value) {
      username
      email
      id
      firstName
      lastName
      calorieGoal
      weight
    }
  }
`;

// Weight
export const GET_WEIGHT_ENTRIES_QUERY = gql`
  query getWeightEntriesByUserId($userId: ID!) {
    getWeightEntriesByUserId(userId: $userId) {
      id
      date
      weight
    }
  }
`;

// Exercise
export const GET_EXERCISE_ENTRIES_QUERY = gql`
  query getExerciseEntriesByUserId($userId: ID!) {
    getExerciseEntriesByUserId(userId: $userId) {
      exerciseEntryDate
      exerciseName
      caloriesBurned
      id
    }
  }
`;

export const EXER_QUERY = gql`
  query getExerciseEntriesByUserId($userId: ID!) {
    getExerciseEntriesByUserId(userId: $userId) {
      exerciseEntryDate
      exerciseName
      caloriesBurned
      id
    }
  }
`;

//Food
export const GET_ALL_FOOD = gql`
  query {
    getFoods {
      id
      calorieGoal
      edamam_id
    }
  }
`;
export const GET_FOOD_BY_ID = gql`
  query getFoodById($foodId: ID!) {
    getFoodById(foodId: $foodId) {
      id
      edamam_id
    }
  }
`;

//Food Entry Query
export const FOOD_ENTRY_QUERY = gql`
  query getFoodEntry($userId: ID!) {
    getFoodEntriesByUserId(userId: $userId) {
      id
      date
      servingQty
      food_id {
        id
        foodName
        caloriesPerServ
        fats
        proteins
        carbs
        edamam_id
      }
      meal_category_id {
        id
        mealCategoryName
      }
    }
  }
`;

// Messages
export const GET_MESSAGES_QUERY = gql`
  query getMessagesBy($param: String!, $value: String!) {
    getMessagesBy(param: $param, value: $value) {
      id
      created_at
      type
      text
      read
      sender {
        id
        firstName
        lastName
      }
      recipient {
        id
        firstName
        lastName
      }
    }
  }
`;

// Coaches
export const GET_TRAINEES = gql`
  query getTrainees($coach_id: ID!){
    getTrainees(coach_id: $coach_id){
      username
      email
      id
      firstName
      lastName
      calorieGoal
      weight
    }
  }
`;

export const GET_COACHES = gql`
  query getCoaches($trainee_id: ID!) {
    getCoaches(trainee_id: $trainee_id) {
      id
      username
      firstName
      lastName
      email
      calorieGoal
      weight
    }
  }
`

// Subscription
export const GET_RECENT_BILLING = gql`
  query getRecentBilling($id: ID!){
    getRecentBilling(id: $id){
      date
    }
  }
`;

export const GET_BILLING_HISTORY = gql`
query getBillingHistory($id: ID!){
    getBillingHistory(id: $id){
        id
        date
        amount_paid
    }
  }
`;
