import React, { Component } from "react";
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  padding: 20px;
`
class EntryForm extends Component {
state = {
  newFoodEntry: {
    food: '',
    category: '',
    qty: '',
    date: ''
  }
}

onInputChange = (e) => {
  this.setState({newFoodEntry: e.target.value})
}

  render() {
    return (
      <Form onsubmit={}>
        <input className="form-field" type="text" placeholder="Add food here..." />
        <select className="form-field" name="meal-category">
          <option value="breakfast">breakfast</option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
          <option value="snack">snack</option>
        </select>
        <input className="form-field" type="number" />
        <input className="form-field" type="date" />
        <button className="form-field" type="submit">Add Entry</button>
      </Form>
    );
  }
}

export default EntryForm;
