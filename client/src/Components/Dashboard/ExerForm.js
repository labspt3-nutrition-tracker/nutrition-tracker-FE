import React, { Component } from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import moment from "moment";
import { GET_CURRENT_USERID } from "../../graphql/queries";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
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

  componentDidMount() {
    const idToken = localStorage.getItem("token");
    this.getCurrentUser(idToken);
  }

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT_USERID
      })
      .then(response =>
        this.setState({
          newExerEntry: {
            exercise_entry_user_id: response.data.getCurrentUser.id
          }
        })
      )
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

  onSubmit = e => {
    e.preventDefault();
    const currentUser = this.state.newExerEntry.exercise_entry_user_id
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    this.props.addExerEntry(this.state.newExerEntry);
    this.setState({
      newExerEntry: {
        exerciseEntryDate: currentDate,
        exerciseName: "",
        caloriesBurned: "",
        exercise_entry_user_id: currentUser
      }
    });
  };

  render() {
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
        <button className="form-field" type="submit" onClick={this.onSubmit}>
          Add Entry
        </button>
        <button
        onClick={this.props.closeExerEntry}
        >Close </button>
      </Form>
    );
  }
}

export default ExerForm;
