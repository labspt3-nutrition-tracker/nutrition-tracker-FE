import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

const ExerciseActivity = styled.div`
  padding: 10px;
`;

const GET_CURRENT = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      email
    }
  }
`;

const EXER_QUERY = gql`
  query getExerciseEntriesByUserId($userId: ID!){
    getExerciseEntriesByUserId(userId: $userId) {
      exerciseEntryDate
      exerciseName
      caloriesBurned
      id
    }
  }
`;

class ExerEntry extends React.Component {
  state = {
    currentUser: 0
  };

  componentDidMount(){
    this.getCurrentUser(localStorage.getItem("token"));
  }

  getCurrentUser = idToken => {
    // console.log("idToken:", idToken)
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT
      })
      .then(response => this.setState({currentUser: response.data.getCurrentUser.id}))
      .catch(err => console.log(err));
  };

  userId = this.state.currentUser
  render() {

    return (
      <div>
        <div>
          <div>Today's Exercise:</div>
          <Query query={EXER_QUERY} variables={{userId: this.userId}}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching Entries</div>;
              if (error) return <div>Error</div>;
              const dateToday = new Date();
              const month = dateToday.getMonth();
              const day = dateToday.getDate();
              const year = dateToday.getFullYear();
              // console.log(data);
              let exerEntries = data.getExerciseEntriesByUserId;
              exerEntries = exerEntries.filter(entry => {
                const dateEntry = new Date(entry.exerciseEntryDate);
                const entryMonth = dateEntry.getMonth();
                const entryDay = dateEntry.getDate();
                const entryYear = dateEntry.getFullYear();
                return (
                  entryMonth === month && entryDay === day && entryYear === year
                );
              });
              // console.log(exerEntries);
              if (exerEntries.length === 0) {
                return <div>No exercise entered today.</div>;
              } else {
                return (
                  <div>
                    {exerEntries.map(entry => (
                      <ExerciseActivity key={entry.id}>
                        <div>Activity: {entry.exerciseName}</div>
                        <div>Calories burned: {entry.caloriesBurned}</div>
                      </ExerciseActivity>
                    ))}
                  </div>
                );
              }
            }}
          </Query>
        </div>
      </div>
    );
  }
}
export default ExerEntry;
