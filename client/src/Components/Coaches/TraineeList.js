import React from 'react';
import Trainee from './Trainee';
import styled from 'styled-components';

const TraineeListDiv = styled.div`
  padding: 20px 0px;
  width: 100%;
  height: 50%;

  & h1{
    text-align: center;
    font-size: 1.5em;
  }
`;

class TraineeList extends React.Component{

  render(){
    const { trainees } = this.props;
    return(
      <TraineeListDiv>
        <h1> Trainee List </h1>
        { trainees && trainees.map(data => {
          return <Trainee key={data.id} deleteTrainee={this.props.deleteTrainee} handleChooseUser={this.props.handleChooseUser} data={data}/>
        })}
      </TraineeListDiv>
    ) 
  }
};

export default TraineeList;
