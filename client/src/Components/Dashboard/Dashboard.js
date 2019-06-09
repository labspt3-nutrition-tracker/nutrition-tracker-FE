import React, { Component } from "react";
import Calories from "./Calories";
import EntryForm from "./EntryForm";
import FoodEntry from "./FoodEntry";
import Exercise from "./Exercise";
import styled from "styled-components";
import ApolloClient from "apollo-boost";


class Dashboard extends Component {
  state = {
    adddedFood: ""
  };

  render() {
    console.log(this.props.selectedFood ? this.props.selectedFood.label : this.props.selectedFood);
    return (
      <div className="dashboard">
        <div className="container">
          <DashTitle>Today's Food Entries</DashTitle>
          <hr />
          <Calories />
          <InfoCon>
            <FoodEntry latest={this.props.latest} />
            <EntryForm
              chosenItem={this.props.location.state}
              selectedFood={this.props.selectedFood}
            />
          </InfoCon>
          <InfoCon>
            <Exercise />
          </InfoCon>
        </div>
      </div>
    );
  }
}

const DashTitle = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const InfoCon = styled.div`
  display: flex;
  justify-content: center;
`;

export default Dashboard;
