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

const ENTRIES_QUERY = gql`
  query {
    getUsers {
      id
      firstName
      lastName
    }
  }
`;

class FoodEntry extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div>List of Users:</div>
          <Query query={ENTRIES_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching Entries</div>;
              if (error) return <div>Fetching Entries</div>;
              const entriesToRender = data.getUsers;
              console.log(entriesToRender);
              return (
                <div>
                  {entriesToRender.map(entry => (
                    <div key={entry.id}>{entry.firstName}</div>
                  ))}
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
