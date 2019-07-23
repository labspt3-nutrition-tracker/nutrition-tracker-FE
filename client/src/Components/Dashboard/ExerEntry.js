import React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import moment from "moment";
import { GET_CURRENT_USER_QUERY } from "../../graphql/queries";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  title: {
    fontFamily: "Oswald",
    fontSize: "3rem",
    color: "#5E366A",
    padding: "0 12px"
  },
  mealCard: {
    minHeight: 100,
    width: "25%"
  },
  mealCon: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: 16
  },
  exerCon: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  actTitle: {
    fontFamily: "Oswald",
    fontSize: 20,
    textTransform: "capitalize"
  },
  dialogBox: {
    display: "flex",
    flexDirection: "column"
  },
  exer: {
    fontFamily: "Oswald",
    fontSize: "2.5rem",
    color: "#5E366A",
    margin: 0
  },
  btn: {
    fontSize: "1.4rem",
    color: "#FCFCFB",
    border: "2px solid #5E366A",
    backgroundColor: "#5E366A",
    padding: "5px 8px",
    "&:hover": {
      backgroundColor: "white",
      color: "#545454"
    },
    fontFamily: "Oswald"
  },
  buttons: { justifyContent: "space-around" },
  del: {
    fontSize: "1.4rem",
    color: "#FCFCFB",
    border: "2px solid #40A798",
    padding: "5px 8px",
    "&:hover": {
      backgroundColor: "white",
      color: "#40A798"
    },
    fontFamily: "Oswald",
    backgroundColor: "#40A798"
  }
});

const ExerciseActivity = styled.div`
  padding: 10px;
  width: 100%;
  max-width: 200px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
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
      uri: "http://localhost:4000",
      headers: { authorization: idToken }
    });
    client
      .query({
        query: GET_CURRENT_USER_QUERY
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

  editExerciseEntry = (event, entry) => {
    event.preventDefault();
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
      return (
        <div>
          <hr />
          <CardContent className={classes.exerCon}>
            <p>No exercise entered today.</p>
          </CardContent>
        </div>
      );
    } else {
      return (
        <CardContent>
          <CardContent className={classes.exerCon}>
            {exerEntries.map(entry => (
              <div onClick={() => this.passExerciseData(entry)}>
                <ExerciseActivity key={entry.id} entry={entry}>
                  <Typography className={classes.actTitle}>
                    {entry.exerciseName}
                  </Typography>
                  <hr />
                  <div>Calories burned: {entry.caloriesBurned}</div>
                </ExerciseActivity>
              </div>
            ))}
            <Dialog
              open={this.state.showModal}
              onClose={this.closeModal}
              aria-labelledby="form-dialog-title"
              PaperProps={{
                style: {
                  minWidth: "300px"
                }
              }}
            >
              <DialogContent classes={{ root: classes.dialogBox }} dividers>
                <DialogContentText classes={{ root: classes.exer }}>
                  {this.props.exerEntry && (
                    <Form>
                      <DialogTitle
                        id="form-dialog-title"
                        classes={{ root: classes.title }}
                      >
                        <span className={classes.title}>
                          {" "}
                          Edit Exercise Entry
                        </span>
                      </DialogTitle>
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
                        value={moment(
                          this.props.exerEntry.exerciseEntryDate
                        ).format("YYYY-MM-DD")}
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
                        className={classes.btn}
                        type="submit"
                        onClick={e =>
                          this.editExerciseEntry(e, this.props.exerEntry)
                        }
                      >
                        Edit Entry
                      </Button>
                    </Form>
                  )}
                </DialogContentText>
              </DialogContent>
              <DialogActions className={classes.buttons}>
                <Button onClick={this.closeModal} className={classes.btn}>
                  Cancel
                </Button>
                <Button
                  onClick={() => this.deleteExercise(this.props.exerEntry.id)}
                  className={classes.del}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </CardContent>
      );
    }
  }
}

export default withStyles(styles)(ExerEntry);
