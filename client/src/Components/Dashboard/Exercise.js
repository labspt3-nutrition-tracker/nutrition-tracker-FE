import React, { Component } from "react";
import styled from "styled-components";
import ExerForm from "./ExerForm";


class Exercise extends Component {
  render() {
    return (
      <ExerciseContainer>
        <div className="container">
          <ExerTitle>Add Exercise Entry</ExerTitle>
          <InfoCon>
            <ExerForm
              closeExerEntry={this.props.closeExerEntry}
              addExerEntry={this.props.addExerEntry}
            />
          </InfoCon>
        </div>
      </ExerciseContainer>
    );
  }
}

const ExerciseContainer = styled.div`
  width: 30%;
  padding: 20px;
`;

const ExerTitle = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  padding-bottom: 30px;
  text-align: center;
  color: blue;
`;

const InfoCon = styled.div`
  display: flex;
  justify-content: center;
`;
export default Exercise;
