import React, { Component } from "react";
import styled from "styled-components";
import ExerEntry from "./ExerEntry";
import ExerForm from "./ExerForm";
import ApolloClient from "apollo-boost";
import { EXER_QUERY, GET_CURRENT_USERID } from "../../graphql/queries";
import { ADD_EXERENTRY } from "../../graphql/mutations";

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

  addExerEntry = newExerEntry => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .mutate({
        mutation: ADD_EXERENTRY,
        variables: {
          input: newExerEntry
        }
      })
      .then(response => {
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

  render() {
    return (
      <div className="Exercise">
        <div className="container">
          <ExerTitle>Today's Exercise:</ExerTitle>
          <hr />
          <InfoCon>
            <ExerEntry exerEntries={this.state.exerEntries} />
            <ExerForm addExerEntry={this.addExerEntry} />
          </InfoCon>
        </div>
      </div>
    );
  }
}

const ExerTitle = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const InfoCon = styled.div`
  display: flex;
  justify-content: center;
`;
export default Exercise;
