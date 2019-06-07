import React, { Component } from "react";
import Calories from "./Calories";
import EntryForm from "./EntryForm";
import FoodEntry from "./FoodEntry";
import Exercise from "./Exercise";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { ADD_EXERENTRY } from '../../graphql/mutations'


class Dashboard extends Component {
  state = {
    adddedFood: ""
  };


  addExerEntry = (newExerEntry) => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .mutate({
        mutation: ADD_EXERENTRY,
        variables: {
          input: newExerEntry
        }
      })
      // .then(response => console.log(response))
      .then((response) => {
        console.log(response);
        // this.setState({
        //   newExerEntry: {
        //     exerciseEntryDate: "",
        //     exerciseName: "",
        //     caloriesBurned: null,
        //     exercise_entry_user_id: 2
        //   }
        // });
      })
      .catch(err => console.log(err));
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
            {/* <EntryForm chosenItem={this.props.location.state} 
              addEntry={this.addEntry} 
              selectedFood={this.props.selectedFood}
            /> */}
          </InfoCon>
          <InfoCon>
            <Exercise addExerEntry={this.addExerEntry} />
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
