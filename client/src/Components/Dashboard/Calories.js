import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const CalCon = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
`;

const CalTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`;

const CalAmt = styled.div`
  font-size: 4rem;
`;

class Calories extends React.Component {
  state = {
    currentUser: 2,
    calGoal: 2000
  };

  render() {
    const CAL_QUERY = gql`
    query {
      getFoodEntriesByUserId(userId: ${this.state.currentUser}) {
        date
        servingQty
        food_id {
          caloriesPerServ
        }
      }
    }
    `;

    return (
      <div>
        <Query query={CAL_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
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

            const calGoal = this.state.calGoal;
            // console.log("calGoal:", calGoal);
            let mealCal = [];
            // console.log(foodEntries)
            foodEntries.map(entry =>
              mealCal.push(entry.food_id.caloriesPerServ * entry.servingQty)
            );
            mealCal = mealCal.reduce((a, b) => {
              return a + b;
            });
            const remainCal = calGoal - mealCal;
            return (
              <CalCon>
                <div className="cal-current">
                  <CalTitle>Current Calories Today</CalTitle>
                  <CalAmt>{mealCal}</CalAmt>
                </div>
                <div className="cal-remain">
                  <CalTitle>Remaining Calories Today</CalTitle>
                  <CalAmt>{remainCal}</CalAmt>
                </div>
                <div className="cal-goal">
                  <CalTitle>Daily Calorie Goal</CalTitle>
                  <CalAmt>{calGoal}</CalAmt>
                </div>
              </CalCon>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Calories;
