import React from "react";
import styled from "styled-components";

const TraineeDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  font-family: Oswald;
  color: #ffffff;
  font-size: 1.6rem;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 10px;
  height: 80px;
  -webkit-box-shadow: 6px 6px 15px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 6px 15px -5px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 6px 15px -5px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  text-align: center;
  padding-top: 10px;
  background: ${props => (props.selected ? "#40A798" : "#5e366a")};
`;

const TraineeContent = styled.div`
  display: flex;
  width: 75%;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
`;

const TraineeName = styled.h2`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
`;
const TraineeStatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
`;

const DeleteButton = styled.button`
  align-self: center;
  width: 21%;
  margin-right: 2%;
  color: #fff;
  font-family: Oswald;
  background: none;
  border: 1px solid white;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  :hover {
    background: #fff;
    color: #5e366a;
  }
`;

class Trainee extends React.Component {
  render() {
    const { data, selectedTrainee } = this.props;
    return (
      <TraineeDiv selected={selectedTrainee === data.id}>
        <TraineeContent
          onClick={() => {
            this.props.handleChooseUser(data);
          }}
        >
          <TraineeName>
            {data.firstName} {data.lastName}
          </TraineeName>
          <TraineeStatsContainer>
            <h2>Calories:</h2>
            <h3>{data.calorieGoal}</h3>
            <h2>Weight:</h2>
            <h3>{data.weight}</h3>
          </TraineeStatsContainer>
        </TraineeContent>
        <DeleteButton
          onClick={() => {
            this.props.deleteTrainee(this.props.data.id);
          }}
        >
          Remove
        </DeleteButton>
      </TraineeDiv>
    );
  }
}

export default Trainee;
