import React from 'react';
import styled from 'styled-components';

const TraineeDiv = styled.div`
  display: block;
  width: 20%;
  height: 80px;
  border: 1px solid blue;
  text-align: center;
  padding-top: 10px;
`;


class Trainee extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    const data = this.props.data;
    return(
      <TraineeDiv>
        <h2> {data.firstName} {data.lastName}</h2>
        <h3> {data.calorieGoal}</h3>
        <h3> {data.weight} </h3>
      </TraineeDiv>
    )
  }
}

export default Trainee;
