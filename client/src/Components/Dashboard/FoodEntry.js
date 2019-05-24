import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const MealCategory = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`;

const Meal = styled.div`
  padding: 10px;
`;

class FoodEntry extends React.Component {

  state = {
    currentUser: 2
  };
  
  render() {
    const ENTRIES_QUERY = gql`
      query {
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

              if (error) return <div>Fetching Entries</div>;

              const foodEntries = data.getFoodEntriesByUserId;
              console.log(foodEntries);

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
        {/* <Meal>
          <MealCategory>Latest Entry</MealCategory>
          <div className="meals meals-breakfast">
            {this.props.entries.breakfast.map(meal => {
              return <div className="food">{meal.food}</div>;
            })}
          </div>
        </Meal>
        <Meal>
          <MealCategory>Lunch</MealCategory>
          <div className="meals meals-lunch">
            {this.props.entries.lunch.map(meal => {
              return <div className="food">{meal.food}</div>;
            })}
          </div>
        </Meal>
        <Meal>
          <MealCategory>Dinner</MealCategory>
          <div className="meals meals-dinner">
            {this.props.entries.dinner.map(meal => {
              return <div className="food">{meal.food}</div>;
            })}
          </div>
        </Meal>
        <Meal>
          <MealCategory>Snacks</MealCategory>
          <div className="meals meals-snacks">
            {this.props.entries.snacks.map(meal => {
              return <div className="food">{meal.food}</div>;
            })}
          </div>
        </Meal> */}
      </div>
    );
  }
}

export default FoodEntry;
