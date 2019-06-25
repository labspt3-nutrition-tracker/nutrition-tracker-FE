import React from 'react';
import styled from 'styled-components';

const TraineeDiv = styled.div`
  display: block;
  margin: 0 auto;
  width: 80%;
  height: 80px;
  text-align: center;
  padding-top: 10px;
`;


class Trainee extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const data = this.props.data;
    return(
      <TraineeDiv onClick={() => {this.props.handleChooseUser(this.props.data)}}>
        <h2> {data.firstName} {data.lastName}</h2>
        <h3> {data.calorieGoal}</h3>
        <h3> {data.weight} </h3>
      </TraineeDiv>
    )
  }
}

export default Trainee;
