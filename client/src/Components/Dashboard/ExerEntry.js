import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import moment from "moment";
import { GET_CURRENT_USERID } from "../../graphql/queries";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  title: {
    fontSize: 16,
    background: "#5E366A",
    padding: 10,
    color: "#ffffff"
  },
  mealCard: {
    minHeight: 100,
    width: '25%'
  },
  mealCon: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: 16,
  }
});

const ExerciseActivity = styled.div`
  padding: 10px;
`;

const ExerciseEntry = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

const ModalButton = styled.button`
  color: #fcfcfb;
  background: #f4b4c3;
  margin-bottom: 5px;
  padding: 5px 15px;
  font-size: 0.9em;
`;

const ExerciseModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10% 20%;
  padding: 10%;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
`;

class ExerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      showModal: false,
      exerEntry: [],
      errorMsg: {
        error: false,
        errorName: "",
        errorCal: "",
        errorDate: ""
      }
    };
  }

  componentDidMount() {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client
      .query({
        query: GET_CURRENT_USERID
      })
      .then(response => {
        this.setState({ currentUser: response.data.getCurrentUser.id });
      })
      .catch(error => console.log(error));
  }

  openModal = () => {
    this.setState({
      showModal: true
    });
  };

  passExerciseData = entry => {
    this.props.passExerData(entry);
    this.openModal();
  };

  editExerciseEntry = entry => {
    let exerEntry = {
      exerciseEntryDate: entry.exerciseEntryDate,
      exerciseName: entry.exerciseName,
      caloriesBurned: entry.caloriesBurned,
      exercise_entry_user_id: this.state.currentUser
    };
    this.props.editExerEntry(entry.id, exerEntry);
    this.closeModal();
  };

  deleteExercise = id => {
    this.props.deleteExerEntry(id);
    this.closeModal();
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.exerEntries !== this.props.exerEntries) {
      this.setState({
        exerEntries: this.props.exerEntries,
        exerEntry: this.props.exerEntry
      });
    }
  }

  render() {
    const { classes } = this.props;
    const dateToday = new Date();
    const month = dateToday.getMonth();
    const day = dateToday.getDate();
    const year = dateToday.getFullYear();
    let exerEntries = this.props.exerEntries;
    exerEntries = exerEntries.filter(entry => {
      const dateEntry = new Date(entry.exerciseEntryDate);
      const entryMonth = dateEntry.getMonth();
      const entryDay = dateEntry.getDate();
      const entryYear = dateEntry.getFullYear();
      return entryMonth === month && entryDay === day && entryYear === year;
    });
    if (exerEntries.length === 0) {
      return <div>No exercise entered today.</div>;
    } else {
      return (
        <Card>
          <CardContent>
            <Typography className={classes.title}>Today's Calories:</Typography>
          </CardContent>
          <div>Today's exercises: </div>
          {exerEntries.map(entry => (
            <div onClick={() => this.passExerciseData(entry)}>
              <div>
                <ExerciseActivity key={entry.id} entry={entry}>
                  <div>Activity: {entry.exerciseName}</div>
                  <div>Calories burned: {entry.caloriesBurned}</div>
                </ExerciseActivity>
              </div>
            </div>
          ))}
          <ExerciseModal isOpen={this.state.showModal}>
            {this.props.exerEntry && (
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
                  onChange={this.props.onInputChange}
                  name="exerciseName"
                  value={this.props.exerEntry.exerciseName}
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
                  onChange={this.props.onInputChange}
                  required
                  aria-describedby="errorDate-text"
                  // defaultValue={this.state.exerEntry.exerciseEntryDate}
                  value={moment(this.props.exerEntry.exerciseEntryDate).format(
                    "YYYY-MM-DD"
                  )}
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
                  onChange={this.props.onInputChange}
                  value={this.props.exerEntry.caloriesBurned}
                  required
                  step="1"
                  aria-describedby="errorCal-text"
                />

                <FormHelperText id="errorCal-text">
                  {this.state.errorMsg.errorCal}
                </FormHelperText>

                <Button
                  className="form-field"
                  type="submit"
                  onClick={() => this.editExerciseEntry(this.props.exerEntry)}
                >
                  Edit Entry
                </Button>
              </Form>
            )}

            <ModalButton onClick={this.closeModal}>No?</ModalButton>
            <ModalButton
              onClick={() => this.deleteExercise(this.props.exerEntry.id)}
            >
              Delete?
            </ModalButton>
          </ExerciseModal>
        </Card>
      );
    }
  }
}

export default withStyles(styles)(ExerEntry);
