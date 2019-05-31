import React, { Component } from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  padding: 20px;
`;

const ADD_EXERENTRY = gql`
  mutation addExerciseEntry($input: ExerciseEntryInput!) {
    addExerciseEntry(input: $input) {
      id
      exerciseName
      caloriesBurned
    }
  }
`;

const GET_CURRENT = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      email
    }
  }
`;

class ExerForm extends Component {
  state = {
    newExerEntry: {
      exerciseEntryDate: "",
      exerciseName: "",
      caloriesBurned: "",
      exercise_entry_user_id: 0
    }
  };

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT
      })
      .then(response => this.setState({
        newExerEntry: { 
          ...this.state.newExerEntry,
          exercise_entry_user_id: response.data.getCurrentUser.id
        }
      }))
      .catch(err => console.log(err));
  };

  addExerEntry = e => {
    e.preventDefault();
    console.log(this.state.newExerEntry);
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .mutate({
        mutation: ADD_EXERENTRY,
        variables: {
          input: this.state.newExerEntry
        }
      })
      // .then(response => console.log(response))
      .then(() => {
        console.log("yooooo");
        this.setState({
          newExerEntry: {
            exerciseEntryDate: "",
            exerciseName: "",
            caloriesBurned: null,
            exercise_entry_user_id: 2
          }
        });
      })
      .catch(err => console.log(err));
  };

  onInputChange = e => {
    this.setState({
      newExerEntry: {
        ...this.state.newExerEntry,
        [e.target.name]:
          e.target.type === "number" ? parseInt(e.target.value) : e.target.value
      }
    });
  };

  render() {
    this.getCurrentUser(localStorage.getItem("token"));
    return (
      <Form>
        <label htmlFor="exerciseName">Name of Exercise</label>
        <input
          className="form-field"
          type="text"
          name="exerciseName"
          value={this.state.newExerEntry.exerciseName}
          onChange={this.onInputChange}
        />
        <label htmlFor="date">Date</label>
        <input
          className="form-field"
          type="date"
          name="exerciseEntryDate"
          value={this.state.newExerEntry.exerciseEntryDate}
          onChange={this.onInputChange}
        />
        <label htmlFor="caloriesBurned">Calories Burned</label>
        <input
          className="form-field"
          type="number"
          step="1"
          name="caloriesBurned"
          value={this.state.newExerEntry.caloriesBurned}
          onChange={this.onInputChange}
        />
        <button
          className="form-field"
          type="submit"
          onClick={this.addExerEntry}
        >
          Add Entry
        </button>
      </Form>
    );
  }
}

export default ExerForm;
