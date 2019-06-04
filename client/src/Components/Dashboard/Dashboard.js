import React, { Component } from "react";
import Calories from "./Calories";
import EntryForm from "./EntryForm";
import FoodEntry from "./FoodEntry";
import Exercise from "./Exercise";
import styled from "styled-components";

class Dashboard extends Component {
  state = {
    // newFoodEntry: {
    //   food: "",
    //   date: "",
    //   qty: 0,
    //   category: ""
    // },
    adddedFood: ""
  };

  // addEntry = e => {
  //   e.preventDefault();
  //   const addedFood = this.props.location.state;
  //   this.setState({
  //    [e.target.name]: e.target.value
  //   })
  //   console.log('addedFood', addedFood)
  // };

  render() {
    console.log(this.props.selectedFood)
    return (
      <div className="dashboard">
        <div className="container">
          <DashTitle>Today's Food Entries</DashTitle>
          <hr />
          <Calories />
          <InfoCon>
            <FoodEntry latest={this.props.latest} />
            <EntryForm chosenItem={this.props.location.state} 
              addEntry={this.addEntry} 
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
