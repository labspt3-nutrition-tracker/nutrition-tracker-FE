import React from "react";
import moment from "moment";
import styled from "styled-components";
import Calendar from "./Calendar";
import JournalEntry from "./JournalEntry";
import gql from "graphql-tag";

import "@fullcalendar/core/main.css";

import { getCurrentUser } from "../../util/getCurrentUser";
import ApolloClient from "apollo-boost";

const JournalContainer = styled.div`
  margin: 3%;
  display: flex;
  justify-content: space-around;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const JournalEntryDiv = styled.div`
  width: 25%;
  margin-left: 3%;

  @media (max-width: 800px) {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const CalendarDiv = styled.div`
  width: 60%;
  border: 3px solid black;
  margin-right: 5%;

  @media (max-width: 800px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const DELETE_MEAL = gql`
  mutation deleteFoodEntry($id: ID!) {
    deleteFoodEntry(id: $id)
  }
`;

const UPDATE_FOOD_ENTRY = gql`
  mutation updateFoodEntry($id: ID!, $input: FoodEntryInput!) {
    updateFoodEntry(id: $id, input: $input) {
      id
    }
  }
`;

const UPDATE_FOOD = gql`
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

const FOODENTRYQUERY = gql`
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

class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      datePicked: ""
    };
  }

  handleDateClick = date => {
    this.setState({ datePicked: date });
  };

  componentDidMount = async () => {
    const idToken = localStorage.getItem("token");
    try {
      const user = await getCurrentUser(idToken);
      let date = moment().format("ddd MMMM D YYYY");
      this.setState({ datePicked: date, currentUser: user.id });
    } catch (err) {
      console.log(err);
      if (err.response.errors[0].message === "You must be logged in!") {
        localStorage.removeItem("token");
      }
    }

    this.loadFoodEntries()
  };

  loadFoodEntries = async () => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    await client
      .query({
        query: FOODENTRYQUERY,
        variables: {
          userId: this.state.currentUser
        }
      })
      .then(response => {
        this.setState({
          foodEntry: response.data.getFoodEntriesByUserId
        });
      })
      .catch(err => console.log(err))

    console.log(this.state.foodEntry);
  };

  deleteMealEntry = id => {
    console.log(id);
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .mutate({
        mutation: DELETE_MEAL,
        variables: { id }
      })
      .then(response => {
        console.log(response);
      })
      .then(response => {
        client.query({
          query: FOODENTRYQUERY,
          variables: {
            userId: this.state.currentUser
          }
        });
      })
      .catch(err => console.log(err));
  };

  editMealEntry = (entry_id, food_id, foodEntry) => {
    const foodInput = {
      foodName: foodEntry.foodName,
      caloriesPerServ: foodEntry.caloriesPerServ,
      fats: foodEntry.fats,
      carbs: foodEntry.carbs,
      proteins: foodEntry.proteins,
      edamam_id: foodEntry.edamam_id
    };

    const foodEntryInput = {
      date: foodEntry.date,
      food_id: food_id,
      user_id: foodEntry.user_id,
      servingQty: foodEntry.servingQty,
      meal_category_id: foodEntry.meal_category_id
    };
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .mutate({
        mutation: UPDATE_FOOD,
        variables: {
          id: food_id,
          input: foodInput
        }
      })
      .then(response => {
        client.mutate({
          mutation: UPDATE_FOOD_ENTRY,
          variables: {
            id: entry_id,
            input: foodEntryInput
          }
        });
      })
      .then(response => {
        client.query({
          query: FOODENTRYQUERY,
          variables: {
            userId: this.state.currentUser
          }
        });
      })
      .then(response => {
        this.setState({
          foodEntry: response.data.getFoodEntriesByUserId
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <JournalContainer>
        <JournalEntryDiv>
          <JournalEntry
            foodEntries={this.state.foodEntry}
            datePicked={this.state.datePicked}
            deleteMeal={this.deleteMealEntry}
            editMeal={this.editMealEntry}
          />
        </JournalEntryDiv>
        <CalendarDiv>
          <Calendar
            datePicked={this.state.datePicked}
            handleDateClick={this.handleDateClick}
          />
        </CalendarDiv>
      </JournalContainer>
    );
  }
}

export default Journal;
