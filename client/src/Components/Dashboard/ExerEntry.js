import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import { EXER_QUERY, GET_CURRENT_USERID } from "../../graphql/queries";

const ExerciseActivity = styled.div`
  padding: 10px;
`;

let currentUser;

class ExerEntry extends React.Component {
  state = {
    currentUser: 0
  }
  componentDidMount() {
    const idToken = localStorage.getItem("token");
    this.getCurrentUser(idToken);
  }

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    // client
    //   .query({
    //     query: GET_CURRENT_USERID
    //   })
    //   .then(response => {
    //     currentUser = response.data.getCurrentUser.id;
    //   })
    //   .catch(err => console.log(err));
    client
      .query({
        query: GET_CURRENT_USERID
      })
      .then(response => {
        this.setState({currentUser: response.data.getCurrentUser.id});
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div>
          <div>Today's Exercise:</div>
          <Query query={EXER_QUERY} variables={{ userId: this.state.currentUser }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching Entries</div>;
              if (error) return <div>Error</div>;
              const dateToday = new Date();
              const month = dateToday.getMonth();
              const day = dateToday.getDate();
              const year = dateToday.getFullYear();
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
