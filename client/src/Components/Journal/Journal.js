import React from "react";
import moment from "moment";
import styled from "styled-components";
import Calendar from "./Calendar";
import JournalEntry from "./JournalEntry";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import "@fullcalendar/core/main.css";

import { getCurrentUser } from "../../util/getCurrentUser";

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
                  <JournalEntry foodEntries={foodEntries} datePicked={this.state.datePicked} />
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
