import React, { Component } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  padding: 20px;
`;
class EntryForm extends Component {
  state = {
    newFoodEntry: {
      food: "",
      category: "",
      qty: "",
      date: ""
    }
  };

  onInputChange = e => {
    this.setState({
      newFoodEntry: {
        ...this.state.newFoodEntry,
        [e.target.name]: e.target.value
      }
    });
  };

  onEntrySubmit = e => {
    e.preventDefault();
    this.props.addEntry(this.state.newFoodEntry)
  }

  render() {
    return (
      <Form>
        <input
          className="form-field"
          type="text"
          placeholder="Add food here..."
          onChange={this.onInputChange}
          name="food" 
        />
        <select className="form-field" name="category" onChange={this.onInputChange}>
          <option value="" selected disabled>Select Meal Category</option>
          <option value="breakfast">breakfast</option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
          <option value="snack">snack</option>
        </select>
        <input className="form-field" type="number" name="qty" onChange={this.onInputChange}/>
        <input className="form-field" type="date" name="date" onChange={this.onInputChange} />
        <button className="form-field" type="submit">
          Add Entry
        </button>
      </Form>
    );
  }
}

export default EntryForm;
