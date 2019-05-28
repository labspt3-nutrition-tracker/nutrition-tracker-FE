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
      date: "",
      food_id: null,
      user_id: null,
      servingQty: null,
      meal_category_id: null 
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
          <option value="2">breakfast</option>
          <option value="3">lunch</option>
          <option value="4">dinner</option>
          <option value="5">snack</option>
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
