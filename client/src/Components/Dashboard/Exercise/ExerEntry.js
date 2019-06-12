import React from "react";
import styled from "styled-components";
// import { Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import { EXER_QUERY, GET_CURRENT_USERID } from "../../../graphql/queries";

const ExerciseActivity = styled.div`
  padding: 10px;
`;

const ExerciseEntry = styled.div`

`;

class ExerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 0,
      exerEntries: []
    };
  }
  // componentDidMount = () => {
  //   const idToken = localStorage.getItem("token");
  //   const client = new ApolloClient({
  //     uri: "https://nutrition-tracker-be.herokuapp.com",
  //     headers: { authorization: idToken }
  //   });
  //   client
  //     .query({
  //       query: GET_CURRENT_USERID
  //     })
  //     .then(response => {
  //       this.setState({ currentUser: response.data.getCurrentUser.id });
  //       client
  //         .query({
  //           query: EXER_QUERY,
  //           variables: {
  //             userId: this.state.currentUser
  //           }
  //         })
  //         .then(response => {
  //           this.setState({
  //             exerEntries: response.data.getExerciseEntriesByUserId
  //           });
  //         });
  //     })
  //     .catch(err => console.log(err));
  // };

  componentDidUpdate(prevProps) {
    if (prevProps.exerEntries !== this.props.exerEntries) {
      this.setState({ exerEntries: this.props.exerEntries });
      
    }
  }

  render() {
    const dateToday = new Date();
    const month = dateToday.getMonth();
    const day = dateToday.getDate();
    const year = dateToday.getFullYear();
    let exerEntries = this.props.exerEntries;
    exerEntries = exerEntries.filter(entry => {
      const dateEntry = new Date(entry.exerciseEntryDate);
      const entryMonth = dateEntry.getMonth();
      const entryDay = dateEntry.getDate();
      const entryYear = dateEntry.getFullYear();
      return entryMonth === month && entryDay === day && entryYear === year;
    });
    if (exerEntries.length === 0) {
      return <div>No exercise entered today.</div>;
    } else {
      return (
        <ExerciseEntry>
          <div>Today's exercises: </div>
          {exerEntries.map(entry => (
            <ExerciseActivity key={entry.id}>
              <div>Activity: {entry.exerciseName}</div>
              <div>Calories burned: {entry.caloriesBurned}</div>
            </ExerciseActivity>
          ))}
        </ExerciseEntry>
      );
    }
  }
}
export default ExerEntry;
