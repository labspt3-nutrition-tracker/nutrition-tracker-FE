import React, { Component } from "react";
import styled from "styled-components";
import ExerEntry from './ExerEntry';
import ExerForm from './ExerForm';

class Exercise extends Component {
  state = {
    newExerEntry: {
      food: "",
      date: "",
      qty: 0,
      category: ""
    },

  };

  render() {
    return (
      <ExerciseContainer>
        <div className="container">
          <ExerTitle>Today's Exercise:</ExerTitle>
          <InfoCon>
            <ExerForm closeExerEntry={this.props.closeExerEntry} addExerEntry={this.props.addExerEntry}/>
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


const ExerTitle = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const InfoCon = styled.div`
  display: flex;
  justify-content: center;
`;
export default Exercise;
