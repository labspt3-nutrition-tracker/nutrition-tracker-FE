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
  render() {
    return (
      <Form>
        <input type="text" placeholder="Add food here..." />
        <select name="meal-category">
          <option value="breakfast">breakfast</option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
          <option value="snack">snack</option>
        </select>
        <input type="number" />
        <input type="date" />
      </Form>
    );
  }
}

export default EntryForm;
