import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { GET_CURRENT_USERID } from "../../graphql/queries";;

const MealCategory = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`;

const Meal = styled.div`
  padding: 10px;
`;

class FoodEntry extends React.Component {
  state = {
    currentUser: null
  };

  componentDidMount(){
    const idToken = localStorage.getItem("token");
    this.getCurrentUser(idToken);
  }

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT_USERID
      })
      .then(response => {
        this.setState({currentUser: response.data.getCurrentUser.id});
        console.log(this.state.currentUser)
      })
      .catch(err => console.log(err));
  };

  render() {
    const ENTRIES_QUERY = gql`
      query getFoodEntriesByUserId{
        getFoodEntriesByUserId(userId: ${this.state.currentUser}) {
          date
          food_id {
            id
            foodName
          }
          meal_category_id {
            id
            mealCategoryName
          }
        }
      }
    `;

    return (
      <div>
        <div>
          <div>Today's Meals:</div>
          <Query query={ENTRIES_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching Entries</div>;

              if (error) return <div>Error</div>;

              const dateToday = new Date();
              const month = dateToday.getMonth();
              const day = dateToday.getDate();
              const year = dateToday.getFullYear();
              let foodEntries = data.getFoodEntriesByUserId;

              foodEntries = foodEntries.filter(entry => {
                const dateEntry = new Date(entry.date);
                const entryMonth = dateEntry.getMonth();
                const entryDay = dateEntry.getDate();
                const entryYear = dateEntry.getFullYear();
                return (
                  entryMonth === month && entryDay === day && entryYear === year
                );
              });

              const Breakfast = foodEntries.filter(function(entry) {
                return entry.meal_category_id.mealCategoryName === "Breakfast";
              });

              const Lunch = foodEntries.filter(function(entry) {
                return entry.meal_category_id.mealCategoryName === "Lunch";
              });

              const Dinner = foodEntries.filter(function(entry) {
                return entry.meal_category_id.mealCategoryName === "Dinner";
              });

              const Snack = foodEntries.filter(function(entry) {
                return entry.meal_category_id.mealCategoryName === "Snack";
              });

              return (
                <div>
                  <Meal>
                    <MealCategory>Breakfast</MealCategory>
                    {Breakfast.map(entry => (
                      <div key={entry.id}>{entry.food_id.foodName}</div>
                    ))}
                  </Meal>
                  <Meal>
                    <MealCategory>Lunch</MealCategory>
                    {Lunch.map(entry => (
                      <div key={entry.id}>{entry.food_id.foodName}</div>
                    ))}
                  </Meal>
                  <Meal>
                    <MealCategory>Dinner</MealCategory>
                    {Dinner.map(entry => (
                      <div key={entry.id}>{entry.food_id.foodName}</div>
                    ))}
                  </Meal>
                  <Meal>
                    <MealCategory>Snack</MealCategory>
                    {Snack.map(entry => (
                      <div key={entry.id}>{entry.food_id.foodName}</div>
                    ))}
                  </Meal>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default FoodEntry;
