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
mutation  addExerciseEntry($input: ExerciseEntryInput!) {
  addExerciseEntry(input: $input) {
    id
    exerciseName
    caloriesBurned
  }
}
`;

class ExerForm extends Component {
  state = {
    newExerEntry: {
      exerciseEntryDate: "",
      exerciseName: "",
      caloriesBurned: null,
      exercise_entry_user_id: 2
    }
  };

  addExerEntry = e => {
    e.preventDefault();
    console.log(this.state.newExerEntry)
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
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  onInputChange = e => {
    this.setState({
      newExerEntry: {
        ...this.state.newExerEntry,
        [e.target.name]: e.target.type === "number" ? parseInt(e.target.value) : e.target.value
      }
    });
  };

  // onEntrySubmit = e => {
  //   e.preventDefault();
  //   this.props.addEntry(this.state.newExerEntry);
  // };

  render() {
    return (
      <Form>
        <label for="exerciseName">Name of Exercise</label>
        <input
          className="form-field"
          type="text"
          name="exerciseName"
          onChange={this.onInputChange}
        />
        <label for="date">Date</label>
        <input
          className="form-field"
          type="date"
          name="exerciseEntryDate"
          onChange={this.onInputChange}
        />
        <label for="caloriesBurned">Calories Burned</label>
        <input
          className="form-field"
          type="number"
          step="1"
          name="caloriesBurned"
          onChange={this.onInputChange}
        />
        <button className="form-field" type="submit" onClick={this.addExerEntry}>
          Add Entry
        </button>
      </Form>
    );
  }
}

export default ExerForm;
