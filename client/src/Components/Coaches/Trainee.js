import React from 'react';
import styled from 'styled-components';

const TraineeDiv = styled.div`
  display: flex;
  justify-content:center;
  font-family: Oswald;
  color: #ffffff;
  font-size: 1rem;
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


class Trainee extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const data = this.props.data;
    return(
      <TraineeDiv onClick={() => {this.props.handleChooseUser(this.props.data)}}>
        <TraineeContent>
          <TraineeName>{data.firstName} {data.lastName}</TraineeName>
          <TraineeStatsContainer>
            <h2>Calories:</h2>
              <h3>{data.calorieGoal}</h3>
            <h2>Weight:</h2>
              <h3>{data.weight}</h3>
          </TraineeStatsContainer>
        </TraineeContent>
      </TraineeDiv>
    )
  }
}

export default Trainee;
