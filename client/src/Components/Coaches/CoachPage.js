import React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";

import TraineeList from "./TraineeList";
import TraineeResult from "./TraineeResult";
import TraineeSearch from "./TraineeSearch";
import TraineeInfo from "./TraineeInfo";
import SendMessageFromCoach from "./SendMessage";
import { SEARCH_USER_BY_EMAIL, GET_CURRENT_USER_QUERY, GET_TRAINEES } from "../../graphql/queries";
import { ADD_MESSAGE_MUTATION, DELETE_TRAINEE } from "../../graphql/mutations";

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
      traineeExist: false,
      isSearchModalOpen: false,
      trainees: [],
      selectedTrainee: [],
      noUserFoundError: "",
      errorText: "",
      error: false,
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
          currentUser: response.data.getCurrentUser,
          errorText: ''
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
        this.setState({
          errorText: 'Unable to get data'
        })
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

  deleteTrainee = async (traineeId) => {
    const idToken = localStorage.getItem("token");
    const userId = this.state.currentUser.id;
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    try {
      await client.mutate({ mutation: DELETE_TRAINEE, variables: {coach_id: userId, trainee_id: traineeId} });
      const trainees = await client.query({
        query: GET_TRAINEES,
        variables: {
          coach_id: userId
        }
      });
      this.setState({ trainees: trainees.data.getTrainees });
    } catch (err) {
      this.setState({
        errorText: 'Unable to delete your trainee'
      })
    }
  }

  traineeExistCheck = async (coachId, traineeId) => {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    const trainees = await client.query({
      query: GET_TRAINEES,
      variables: {
        coach_id: coachId
      }
    });

    const filteredTrainees = trainees.data.getTrainees.some(trainee => {
      return trainee.id === traineeId;
    });

    if (filteredTrainees === true){
      this.setState({
        traineeExist: true
      })
    } else {
      this.setState({
        traineeExist: false
      })
    }
  }

  handleRequest = async () => {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
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
    await this.traineeExistCheck(userId, this.state.traineeSearchResults.id)

    if (this.state.traineeExist){
      console.log('user exist already')
      this.setState({
        errorText: "User has already been added"
      })
    } else {
      try {
        await client.mutate({ mutation: ADD_MESSAGE_MUTATION, variables });
        this.setState({ traineeSearchResults: [] });
      } catch (err) {
        this.setState({
          errorText: 'Unable to send SendMessage'
        })
      }
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
          trainees={this.state.trainees}
          deleteTrainee={this.deleteTrainee}
          handleChooseUser={this.handleChooseUser} />
        <SendMessageFromCoach traineeID={this.state.selectedTrainee.id} firstName={this.state.selectedTrainee.firstName} lastName={this.state.selectedTrainee.lastName}
        currentUser={this.state.currentUser} />
        </TraineeBasic>
        <TraineeDetailed>
          <TraineeInfo traineeID={this.state.selectedTrainee.id} />
        </TraineeDetailed>
      </CoachPageContainer>
    );
  }
}

export default CoachPage;
