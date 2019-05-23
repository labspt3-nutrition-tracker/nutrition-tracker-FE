import React, { Component } from "react";
import Header from "../Reusables/Header";
import Calories from "./Calories";
import EntryForm from "./EntryForm";
import FoodEntry from "./FoodEntry";
import styled from "styled-components";

class Dashboard extends Component {
  state = {
    newFoodEntry: {
      food: "",
      date: "",
      qty: 0,
      category: ""
    },
    
  };

  addEntry = e => {
    e.preventDefault();

  }

  render() {
    return (
      <div className="dashboard">
        <Header />
        <div className="container">
          <DashTitle>Today's Food Entries</DashTitle>
          <hr />
          <Calories />
          <InfoCon>
            <FoodEntry latest={this.props.latest}/>
            <EntryForm addEntry={this.addEntry}/>
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
