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
      <div className="Exercise">
        <div className="container">
          <ExerTitle>Today's Exercise:</ExerTitle>
          <hr />
          <InfoCon>
            <ExerEntry />
            <ExerForm addExerEntry={this.props.addExerEntry}/>
          </InfoCon>
        </div>
      </div>
    );
  }
}

const ExerTitle = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const InfoCon = styled.div`
  display: flex;
  justify-content: center;
`;
export default Exercise;
