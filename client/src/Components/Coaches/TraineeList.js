import React from "react";
import Trainee from "./Trainee";
import styled from "styled-components";

const TraineeListDiv = styled.div`
  padding: 20px 0px;
  margin: 10px;

  & h1 {
    text-align: center;
    font-size: 1.5em;
  }
`;

class TraineeList extends React.Component {
  render() {
    const { trainees, traineeID } = this.props;
    return (
      <>
        {trainees && trainees.length > 0 && (
          <TraineeListDiv>
            <h1> Trainee List </h1>
            {trainees.map(data => {
              return (
                <Trainee
                  key={data.id}
                  deleteTrainee={this.props.deleteTrainee}
                  handleChooseUser={this.props.handleChooseUser}
                  data={data}
                  selectedTrainee={traineeID}
                />
              );
            })}
          </TraineeListDiv>
        )}
      </>
    );
  }
}

export default TraineeList;
