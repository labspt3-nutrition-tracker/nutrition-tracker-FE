import React, { Component } from "react";
import styled from "styled-components";
import ExerForm from "./ExerForm";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

class Exercise extends Component {
  render() {
    return (
      <ExerciseContainer>
        <div className="container">
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
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  @media(max-width: 800px) {
    max-width: 500px;
    width: 100%;
  }
`;

const InfoCon = styled.div`
  display: flex;
  justify-content: center;
`;

export default Exercise;