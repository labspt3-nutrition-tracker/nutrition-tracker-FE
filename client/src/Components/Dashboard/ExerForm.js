import React, { Component } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  padding: 20px;
`;
class ExerForm extends Component {
  state = {
    newExerEntry: {
      exerciseEntryDate: "",
      exerciseName: "",
      caloriesBurned: null
    }
  };

  onInputChange = e => {
    this.setState({
      newExerEntry: {
        ...this.state.newExerEntry,
        [e.target.name]: e.target.value
      }
    });
  };

  onEntrySubmit = e => {
    e.preventDefault();
    this.props.addEntry(this.state.newExerEntry);
  };

  render() {
    return (
      <Form>
        <label htmlFor="exerciseName">Name of Exercise</label>
        <input
          className="form-field"
          type="text"
          name="exerciseName"
          onChange={this.onInputChange}
        />
        <label htmlFor="date">Date</label>
        <input
          className="form-field"
          type="date"
          name="exerciseEntryDate"
          onChange={this.onInputChange}
        />
        <label htmlFor="caloriesBurned">Calories Burned</label>
        <input
          className="form-field"
          type="numnber"
          name="caloriesBurned"
          onChange={this.onInputChange}
        />
        <button className="form-field" type="submit">
          Add Entry
        </button>
      </Form>
    );
  }
}

export default ExerForm;
