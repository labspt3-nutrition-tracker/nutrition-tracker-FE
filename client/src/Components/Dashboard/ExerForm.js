import React, { Component } from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import moment from "moment";
import { GET_CURRENT_USER_QUERY } from "../../graphql/queries";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  formTitle: {
    fontFamily: "Oswald",
    fontWeight: 100,
    fontSize: "2.5rem",
    color: "#545454"
  },
  input: {
    fontSize: 16,
    width: "100%",
    minWidth: "100%",
    paddingTop: 17
  },
  formButton: {
    fontSize: 16
  }
});

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
  @media (max-width: 600px) {
    padding: 0 20px;
  }
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
    this.setState(prevState => {
      return {
        newExerEntry: {
          ...prevState.newExerEntry,
          exerciseEntryDate: moment().format("YYYY-MM-DD")
        }
      };
    });
  }

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com/",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT_USER_QUERY
      })
      .then(response =>
        this.setState({
          newExerEntry: {
            ...this.state.newExerEntry,
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
    const currentUser = this.state.newExerEntry.exercise_entry_user_id;
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    if (!this.state.errorMsg.error) {
      this.props.addExerEntry(this.state.newExerEntry);
      this.setState(prevState => {
        return {
          newExerEntry: {
            ...prevState.newExerEntry,
            exerciseEntryDate: currentDate,
            exerciseName: "",
            caloriesBurned: "",
            exercise_entry_user_id: currentUser
          }
        };
      });
    } else {
      return;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Form>
        <Typography className={classes.formTitle} variant="h4">
          Add exercise entry
        </Typography>
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
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
        />
        <FormHelperText id="errorName-text">
          {this.state.errorMsg.errorName}
        </FormHelperText>

        <TextField
          label="Date"
          type="date"
          name="exerciseEntryDate"
          onChange={this.onInputChange}
          defaultValue={moment().format("YYYY-MM-DD")}
          autoFocus
          value={
            this.state.newExerEntry.exerciseEntryDate
              ? this.state.newExerEntry.exerciseEntryDate
              : moment().format("YYYY-MM-DD")
          }
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
        />

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
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
        />
        <FormHelperText id="errorCal-text">
          {this.state.errorMsg.errorCal}
        </FormHelperText>

        <Button
          className={classes.formButton}
          type="submit"
          onClick={this.onSubmit}
        >
          Add Entry
        </Button>
        <Button
          className={classes.formButton}
          onClick={this.props.closeExerEntry}
        >
          Close{" "}
        </Button>
      </Form>
    );
  }
}

export default withStyles(styles)(ExerForm);
