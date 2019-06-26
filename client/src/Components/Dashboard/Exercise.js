import React, { Component } from "react";
import styled from "styled-components";
import ExerForm from "./ExerForm";
import Typography from "@material-ui/core/Typography";



class Exercise extends Component {
  render() {
    return (
      <ExerciseContainer>
        <div className="container">
        <Typography variant="h4">Add exercise entry</Typography>
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
  @media(max-width: 800px) {
    max-width: 500px;
    width: 100%;
  }
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
