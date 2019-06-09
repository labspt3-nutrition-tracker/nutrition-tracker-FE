import React, { Component } from "react";
import Calories from "./Calories";
import EntryForm from "./EntryForm";
import FoodEntry from "./FoodEntry";
import Exercise from "./Exercise";
import ExerciseEntry from './ExerEntry';
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { ADD_EXERENTRY } from '../../graphql/mutations';
import moment from "moment";


class Dashboard extends Component {
  state = {
    showFoodForm: true,
    showExerForm: true
  };

  // addExerEntry = (newExerEntry) => {
  //   const client = new ApolloClient({
  //     uri: "https://nutrition-tracker-be.herokuapp.com"
  //   });

  //   client
  //     .mutate({
  //       mutation: ADD_EXERENTRY,
  //       variables: {
  //         input: newExerEntry
  //       }
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch(err => console.log(err));
  // };
  // maybe add ?
  // {this.props.selectedFood && !this.state.showFoodForm &&
  // <EntryForm
  //   selectedFood={this.props.selectedFood}
  // />
  // }
  // {!this.props.selectedFood && this.state.showFoodForm &&
  // <EntryForm closeFoodForm={this.closeFoodForm} />}
  // {this.state.showExerForm && <Exercise
  //   addExerEntry={this.addExerEntry}
  //   closeExerEntry={this.closeExerEntry} />}

  handleShowFood = () => {
    this.setState({
      showFoodForm: true
    })
  }

  closeFoodForm = () => {
    this.setState({
      showFoodForm: false
    })
  }

  openExerEntry = () =>{
    this.setState({
      showExerForm: true
    })
  }

  closeExerEntry = () =>{
    this.setState({
      showExerForm: false
    })
  }
  render() {
    const currentDate = moment(new Date()).format("MMMM Do YYYY");
    console.log(this.props.selectedFood ? this.props.selectedFood.label : this.props.selectedFood);
    return (
      <DashContainer>
        <DashTitle>{currentDate}</DashTitle>
        <Calories />
        {!this.state.showFoodForm && <button onClick={this.handleShowFood}> Add Food</button>}
        {!this.state.showExerForm && <button onClick={this.openExerEntry}> Add Exercise</button>}
        <DashDisplay className="container">
          <InfoCon>
            <FoodEntry/>
            <ExerciseEntry />
          </InfoCon>
          {this.state.showFoodForm &&
          <EntryForm
            selectedFood={this.props.selectedFood}
          />
          }
          {this.state.showExerForm && <Exercise
            closeExerEntry={this.closeExerEntry} />}
        </DashDisplay>
      </DashContainer>
    );
  }
}

const DashContainer = styled.div`
  width: 100%;
`;

const DashTitle = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const InfoCon = styled.div`
  display: flex;
  width: 40%;
`;

const DashDisplay = styled.div`
  width: 100%;
  display: flex;
  justifty-content: space-around;
`;

export default Dashboard;
