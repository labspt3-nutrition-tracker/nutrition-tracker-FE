import React from 'react';
import TraineeList from './TraineeList';
import styled from 'styled-components';
import { SEARCH_USER_BY_EMAIL } from "../../graphql/queries";
import ApolloClient from "apollo-boost";
import TraineeResult from './TraineeResult';
import TraineeSearch from './TraineeSearch';

const CoachPageContainer = styled.div`
  padding: 2% 4%;
  min-height: 90vh;
  width: 100%;
  border: 1px solid blue;
`;

class CoachPage extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      traineeSearchInput: '',
      traineeSearchResults: [],
      isSearchModalOpen: false,
      selectedTrainee: [],
      noUserFoundError: ""
    }
  }

  updateTraineeSearch =  e => {
    this.setState({
      traineeSearchInput: e.target.value
    });
  };

  handleChooseUser = user => {
    console.log('user', user)
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
        variables:{
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
        })
      })
      .catch(error => {
        this.setState({
          traineeSearchInput: '',
          traineeSearchResults: [],
          isSearchModalOpen: true,
          noUserFoundError: "No user by that email found"
        })
      })

  }

  render(){
    return(
      <CoachPageContainer>
        <TraineeSearch
          traineeSearchInput={this.state.traineeSearchInput}
          updateTraineeSearch={this.updateTraineeSearch}
          getUserData={this.getUserData} />
        <TraineeResult
          traineeSearchResults={this.state.traineeSearchResults}
          noUserFoundError={this.state.noUserFoundError} />
        <TraineeList/>
      </CoachPageContainer>
    )
  }
}

export default CoachPage;
