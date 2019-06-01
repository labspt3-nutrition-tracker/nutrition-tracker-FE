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
    },
    newAddFood: {
      foodName: "",
      caloriesPerServ: null,
      fats: null,
      carbs: null,
      proteins: null,
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
    console.log('entryform', this.props.chosenItem)
    return (
      <Form>
        <label htmlFor="food">Food</label>
        <input
          className="form-field"
          type="text"
          placeholder="Add food here..."
          onChange={this.onInputChange}
          name="food"
        />
        <label htmlFor="category">Meal Category</label>
        <select className="form-field" name="category" onChange={this.onInputChange}>
          <option value="" defaultValue disabled>Select Meal Category</option>
          <option value="2">breakfast</option>
          <option value="3">lunch</option>
          <option value="4">dinner</option>
          <option value="5">snack</option>
        </select>
        <label htmlFor="qty">Serving Quantity</label>
        <input className="form-field" type="number" name="qty" onChange={this.onInputChange}/>
        <label htmlFor="proteins">Grams of Protein per Serving</label>
        <input className="form-field" type="number" name="proteins" onChange={this.onInputChange}/>
        <label htmlFor="carbs">Grams of Carbs per Serving</label>
        <input className="form-field" type="number" name="carbs" onChange={this.onInputChange}/>
        <label htmlFor="fats">Grams of Fat per Serving</label>
        <input className="form-field" type="number" name="fats" onChange={this.onInputChange}/>
        <label htmlFor="date">Date</label>
        <input className="form-field" type="date" name="date" onChange={this.onInputChange} />
        <button className="form-field" type="submit">
          Add Entry
        </button>
      </Form>
    );
  }
}

export default EntryForm;
