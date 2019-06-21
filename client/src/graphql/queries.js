import { gql } from "apollo-boost";

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
        foodName
        caloriesPerServ
        fats
        proteins
        carbs
        edamam_id
      }
      meal_category_id {
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

export const GET_WEIGHT_ENTRIES_QUERY = gql`
  query getWeightEntriesByUserId($userId: ID!) {
    getWeightEntriesByUserId(userId: $userId) {
      id
      date
      weight
    }
  }
`;

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

export const GET_ALL_FOOD = gql`
  query {
    getFoods {
      id
      edamam_id
    }
  }
`;

export const GET_CURRENT_USERID = gql`
  query {
    getCurrentUser {
      id
      userType
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
