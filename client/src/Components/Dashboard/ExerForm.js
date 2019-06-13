import React, { Component } from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { GET_CURRENT_USERID } from "../../graphql/queries";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

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
    },
    errorMsg: {
      error: false,
      errorName: "",
      errorCal: "",
      errorDate: ""
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

  validate = () => {
    // debugger;
    const errorMsg = {
      error: false,
      errorName: "",
      errorCal: "",
      errorDate: ""
    };

    if (!this.state.newExerEntry.exerciseName) {
      errorMsg.errorName = "Please provide name of exercise.";
      errorMsg.error = true;
    }
    if (!this.state.newExerEntry.exerciseEntryDate) {
      errorMsg.errorDate = "Please provide date of exercise.";
      errorMsg.error = true;
    }
    if (!this.state.newExerEntry.caloriesBurned) {
      errorMsg.errorCal = "Please provide calories burned.";
      errorMsg.error = true;
    }

    this.setState({ errorMsg });
  };

  onSubmit = e => {
    e.preventDefault();
    this.validate();
    console.log(this.state.newExerEntry)
    if (!this.state.errorMsg.error) {
      this.props.addExerEntry(this.state.newExerEntry);
      this.setState({
        newExerEntry: {
          ...this.state.newExerEntry,
          exerciseEntryDate: "",
          exerciseName: "",
          caloriesBurned: "",
        }
      });
    } else {
      return;
    }
  };

  render() {
    return (
      <Form>
        <TextField
          required
          error={this.state.errorMsg.errorName}
          autoFocus
          margin="dense"
          label="Name of Exercise"
          className="form-field"
          type="text"
          placeholder="Add exercise here..."
          onChange={this.onInputChange}
          name="exerciseName"
          value={this.state.newExerEntry.exerciseName}
          aria-describedby="errorName-text"
        />
        <FormHelperText id="errorName-text">
          {this.state.errorMsg.errorName}
        </FormHelperText>

        <TextField
          label="Date"
          className="form-field"
          type="date"
          name="exerciseEntryDate"
          error={this.state.errorMsg.errorDate}
          onChange={this.onInputChange}
          required
          aria-describedby="errorDate-text"
          value={this.state.newExerEntry.exerciseEntryDate}
        />
        <FormHelperText id="errorDate-text">
          {this.state.errorMsg.errorDate}
        </FormHelperText>

        <TextField
          autoFocus
          margin="dense"
          error={this.state.errorMsg.errorCal}
          label="Calories Burned"
          className="form-field"
          type="number"
          name="caloriesBurned"
          onChange={this.onInputChange}
          value={this.state.newExerEntry.caloriesBurned}
          required
          step="1"
          aria-describedby="errorCal-text"
        />
        <FormHelperText id="errorCal-text">
          {this.state.errorMsg.errorCal}
        </FormHelperText>

        <Button className="form-field" type="submit" onClick={this.onSubmit}>
          Add Entry
        </Button>
        <Button onClick={this.props.closeExerEntry}>Close </Button>
      </Form>
    );
  }
}

export default ExerForm;
