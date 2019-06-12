import React, { Component } from "react";
import styled from "styled-components";
import ExerForm from "./ExerForm";
import ApolloClient from "apollo-boost";
import { EXER_QUERY, GET_CURRENT_USERID } from "../../graphql/queries";

class Exercise extends Component {
  state = {
    newExerEntry: {
      food: "",
      date: "",
      qty: 0,
      category: ""
    },
    exerEntries: []
  };

  componentDidMount = () => {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client
      .query({
        query: GET_CURRENT_USERID
      })
      .then(response => {
        this.setState({ currentUser: response.data.getCurrentUser.id });
        client
          .query({
            query: EXER_QUERY,
            variables: {
              userId: this.state.currentUser
            }
          })
          .then(response => {
            this.setState({
              exerEntries: response.data.getExerciseEntriesByUserId
            });
          });
      })
      .catch(err => console.log(err));
  };

  // addExerEntry = newExerEntry => {
  //   const client = new ApolloClient({
  //     uri: "https://nutrition-tracker-be.herokuapp.com"
  //   });

  //   client
  //     .mutate({
  //       mutation: ADD_EXERENTRY,
  //       variables: {
  //         input: newExerEntry
  //       }
  //     })
  //     .then(response => {
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

  render() {
    return (
      <ExerciseContainer>
        <div className="container">
          <ExerTitle>Add Exercise Entry</ExerTitle>
          <InfoCon>
            {/* <ExerEntry exerEntries={this.state.exerEntries} /> */}
            <ExerForm
              closeExerEntry={this.props.closeExerEntry}
              addExerEntry={this.props.addExerEntry}
            />
          </InfoCon>
        </div>
      </ExerciseContainer>
    );
  }
}

const ExerciseContainer = styled.div`
  width: 30%;
  padding: 20px;
`;

const ExerTitle = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  padding-bottom: 30px;
  text-align: center;
  color: blue;
`;

const InfoCon = styled.div`
  display: flex;
  justify-content: center;
`;
export default Exercise;
