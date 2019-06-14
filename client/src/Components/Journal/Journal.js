import React from "react";
import moment from "moment";
import styled from "styled-components";
import Calendar from "./Calendar";
import JournalEntry from "./JournalEntry";
import { Query } from "react-apollo";
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
  mutation deleteFoodEntry($id: ID!){
    deleteFoodEntry(id: $id)
  }
`;

const  UPDATE_MEAL = gql`
  mutation updateFoodEntry($id: ID!, $input: FoodEntryInput!){
    updateFoodEntry(id: $id, input: $input ){
      id
      date
      food_id
      user_id
      servingQty
      meal_category_id
    }
  }
`;

const FOODENTRYQUERY = gql`
  query getFoodEntry($userId: ID!){
    getFoodEntriesByUserId(userId: $userId){
      id
      date
      servingQty
      food_id{
        id
        foodName
        caloriesPerServ
        fats
        proteins
        carbs
      }
      meal_category_id{
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
  };

  deleteMealEntry = id => {
    console.log(id)
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .mutate({
        mutation: DELETE_MEAL,
        variables: {id}
      })
      .then( response => {
        console.log(response)
      })
      .then( response => {
        client
          .query({
            query: FOODENTRYQUERY,
            variables: {
              userId: this.state.currentUser
            }
          })
      })
      .catch(err => console.log(err));
  }

  editMealEntry = (id, foodEntry) => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    })

    client
      .mutate({
        mutation: UPDATE_MEAL,
        variables: {
          id,
          input: foodEntry
        }
      })
  }

  render() {
    const FOODENTRYQUERY = gql`
      query{
        getFoodEntriesByUserId(userId: ${this.state.currentUser}){
          id
          date
          servingQty
          food_id{
            id
            foodName
            caloriesPerServ
            fats
            proteins
            carbs
          }
          meal_category_id{
            id
            mealCategoryName
          }
        }
      }
`;
    return (
      <div>
        <Query query={FOODENTRYQUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching Entries</div>;
            if (error) return <div>Cannot Load</div>;

            const foodEntries = data.getFoodEntriesByUserId;

            return (
              <JournalContainer>
                <JournalEntryDiv>
                  <JournalEntry foodEntries={foodEntries} datePicked={this.state.datePicked} deleteMeal={this.deleteMealEntry} />
                </JournalEntryDiv>
                <CalendarDiv>
                  <Calendar datePicked={this.state.datePicked} handleDateClick={this.handleDateClick} />
                </CalendarDiv>
              </JournalContainer>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Journal;
