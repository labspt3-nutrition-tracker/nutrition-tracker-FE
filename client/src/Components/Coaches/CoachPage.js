import React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";

import TraineeList from "./TraineeList";
import TraineeResult from "./TraineeResult";
import TraineeSearch from "./TraineeSearch";
import TraineeInfo from "./TraineeInfo";
import { SEARCH_USER_BY_EMAIL, GET_CURRENT_USER_QUERY, GET_TRAINEES } from "../../graphql/queries";
import { ADD_MESSAGE_MUTATION } from "../../graphql/mutations";

const CoachPageContainer = styled.div`
  padding: 2% 4%;
  min-height: 90vh;
  width: 100%;
  border: 1px solid pink;
  display: flex;
`;

const TraineeBasic = styled.div`
  width: 50%;
  height: 90vh;
`;
const TraineeDetailed = styled.div`
  width: 50%;
  height: 90vh;
`;

class CoachPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      traineeSearchInput: "",
      traineeSearchResults: [],
      isSearchModalOpen: false,
      trainees: [],
      selectedTrainee: [],
      noUserFoundError: ""
    };
  }

  updateTraineeSearch = e => {
    this.setState({
      traineeSearchInput: e.target.value
    });
  };

  handleChooseUser = async user => {
    await this.setState({
      selectedTrainee: user
    });
    console.log(this.state.selectedTrainee);
  };

  componentDidMount(){
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT_USER_QUERY
      })
      .then(response => {
        this.setState({
          currentUser: response.data.getCurrentUser
        })
        client
          .query({
            query: GET_TRAINEES,
            variables:{
              coach_id: this.state.currentUser.id
            }
          })
          .then(response => {
            this.setState({
              trainees: response.data.getTrainees
            })
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getUserData = email => {
    email = this.state.traineeSearchInput;
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client
      .query({
        query: SEARCH_USER_BY_EMAIL,
        variables: {
          param: "email",
          value: email
        }
      })
      .then(response => {
        this.setState({
          traineeSearchResults: response.data.getUserBy,
          isSearchModalOpen: true,
          noUserFoundError: "",
          traineeSearchInput: ""
        });
      })
      .catch(error => {
        this.setState({
          traineeSearchInput: "",
          traineeSearchResults: [],
          isSearchModalOpen: true,
          noUserFoundError: "No user by that email found"
        });
      });
  };

  handleRequest = async () => {
    //send request message to traineeSearchResults.id
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    //   const user = await client.query({ query: GET_CURRENT_USER_QUERY });
    const userId = this.state.currentUser.id;
    const name = `${this.state.currentUser.firstName} ${this.state.currentUser.lastName}`;
    const variables = {
      input: {
        type: "alert",
        text: `This is a request from ${name} to follow your nutrition.`,
        read: false,
        sender: userId,
        recipient: this.state.traineeSearchResults.id
      }
    };
    try {
      await client.mutate({ mutation: ADD_MESSAGE_MUTATION, variables });
      this.setState({ traineeSearchResults: [] }); //reset after sending request
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <CoachPageContainer>
        <TraineeBasic>
          <TraineeSearch
            traineeSearchInput={this.state.traineeSearchInput}
            updateTraineeSearch={this.updateTraineeSearch}
            getUserData={this.getUserData}
          />
          <TraineeResult
            traineeSearchResults={this.state.traineeSearchResults}
            noUserFoundError={this.state.noUserFoundError}
            request={this.handleRequest}
            currentUser={this.state.currentUser}
            trainees={this.state.trainees}
          />
        <TraineeList
          trainees={this.state.trainees} handleChooseUser={this.handleChooseUser} />
        </TraineeBasic>
        <TraineeDetailed>
          <TraineeInfo traineeID={this.state.selectedTrainee.id} />
        </TraineeDetailed>
      </CoachPageContainer>
    );
  }
}

export default CoachPage;
