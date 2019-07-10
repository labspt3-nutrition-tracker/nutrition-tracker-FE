import React from 'react';
import styled from 'styled-components';

const TraineeDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  font-family: Oswald;
  color: #ffffff;
  font-size: 2rem;
  flex-wrap:wrap;
  margin: auto;
  margin-top:10px;
  width: 80%;
  height: 80px;
  background: #5E366A;
  -webkit-box-shadow: 6px 6px 15px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 6px 6px 15px -5px rgba(0,0,0,0.75);
  box-shadow: 6px 6px 15px -5px rgba(0,0,0,0.75);
  border-radius:10px;
  text-align: center;
  padding-top: 10px;
`;

const TraineeContent = styled.div`
  display:flex;
  width: 75%;
  flex-wrap:wrap;
  justify-content: center;
`;

const TraineeName = styled.h2`
  display:flex;
  justify-content:center;
  width:100%;
  flex-wrap:wrap;
`
const TraineeStatsContainer = styled.div`
  display:flex;
  justify-content: space-around;
  width:100%;
  flex-wrap:wrap;
`;

const DeleteButton= styled.button`
  align-self: center;
  width: 21%;
  margin-right: 2%;
  color: #FFF;
  font-family: Oswald;
  background: none;
  font-size: 1em;
`;

class Trainee extends React.Component{

  render(){
    const data = this.props.data;
    return(
      <TraineeDiv>
        <TraineeContent  onClick={() => {this.props.handleChooseUser(this.props.data)}}>
          <TraineeName>{data.firstName} {data.lastName}</TraineeName>
          <TraineeStatsContainer>
            <h2>Calories:</h2>
              <h3>{data.calorieGoal}</h3>
            <h2>Weight:</h2>
              <h3>{data.weight}</h3>
          </TraineeStatsContainer>
        </TraineeContent>
        <DeleteButton onClick={() => {this.props.deleteTrainee(this.props.data.id)}}>remove trainee</DeleteButton>
      </TraineeDiv>
    )
  }
}

export default Trainee;
