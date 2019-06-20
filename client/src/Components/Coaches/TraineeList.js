import React from 'react';
import Trainee from './Trainee';
import TraineeSearch from './TraineeSearch';
import styled from 'styled-components';

const TraineeListDiv = styled.div`
  padding: 20px 0px;
`;

const data = {
    "getUsers": [
      {
        "id": "1",
        "username": "amazingMax",
        "email": "maxdoe@gmail.com",
        "firstName": "Max",
        "lastName": "Doe",
        "calorieGoal": 2400,
        "weight": 200
      },
      {
        "id": "2",
        "username": "JaneForGains",
        "email": "janedoe@gmail.com",
        "firstName": "Jane",
        "lastName": "Doe",
        "calorieGoal": 2000,
        "weight": 115
      }
    ]
}

class TraineeList extends React.Component{

  constructor(props){
    super(props)
    this.state = {}
  };

  render(){
    return(
      <TraineeListDiv>
        <TraineeSearch
          traineeSearchInput={this.props.traineeSearchInput}
          updateTraineeSearch={this.props.updateTraineeSearch}
          getUserData={this.props.getUserData}
          />
        <h1> Trainee List </h1>
        { data && data.getUsers.map(data => {
          return <Trainee key={data.id} handleChooseUser={this.props.handleChooseUser} data={data}/>
        })}
      </TraineeListDiv>
  )
  }
};

export default TraineeList;
