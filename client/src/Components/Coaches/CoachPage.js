import React from 'react';
import TraineeList from './TraineeList';
import styled from 'styled-components';
import { SEARCH_USER_BY_EMAIL } from "../../graphql/queries";
import ApolloClient from "apollo-boost";
import TraineeResultModal from './TraineeResultModal';

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
      selectedUser: [],
      noUserFoundError: ""
    }
  }

  updateTraineeSearch =  e => {
    this.setState({
      traineeSearchInput: e.target.value
    });
  };

  openSearchModal = () => {
    this.setState({
      isSearchModalOpen: true
    });
  };

  closeSearchModal = () => {
    this.setState({
      isSearchModalOpen: false
    });
  };

  handleChooseUser = user => {
    this.setState({
      selectedUser: user
    });
    this.closeModal();
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
        <TraineeResultModal
        isSearchModalOpen={this.state.isSearchModalOpen}
        traineeSearchResults={this.state.traineeSearchResults}
        noUserFoundError={this.state.noUserFoundError}
        openSearchModal={this.openSearchModal}
        closeSearchModal={this.closeSearchModal}
        handleChooseUser={this.handleChooseUser} />
        <h1> Coach Page</h1>
        <TraineeList
          traineeSearchInput={this.state.traineeSearchInput}
          updateTraineeSearch={this.updateTraineeSearch}
          getUserData={this.getUserData}/>
      </CoachPageContainer>
    )
  }
}

export default CoachPage;
