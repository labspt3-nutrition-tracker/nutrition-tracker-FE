import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    textAlign: "center"
  },
  formTextLabel: {
    fontFamily: "Oswald",
    fontSize: "2.2rem",
    color: "#5E366A"
  },
  formTextInput: {
    fontSize: "1.8rem",
    width: "100%"
  },
  btn: {
    fontFamily: "Oswald",
    fontSize: "1.4rem",
    color: "white",
    backgroundColor: "#40a798",
    border: "1px solid #40a798",
    marginTop: 35,
    "&:hover": {
      backgroundColor: "white",
      color: "#40a798"
    }
  },
  errors: {
    fontFamily: "Oswald",
    fontSize: "1.2rem",
    color: "#40a798"
  },
  input: {
    marginTop: 10,
    width: "100%"
  }
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calorieGoal: 0,
      weight: 0,
      error: []
    };
  }

  bundleUserInfo = e => {
    e.preventDefault();
    const errors = [];
    if (isNaN(this.state.calorieGoal) || Number(this.state.calorieGoal) === 0) {
      errors.push({
        field: "calorieGoal",
        text: "Please provide a valid calories goal"
      });
    }
    if (isNaN(this.state.weight)) {
      errors.push({ field: "weight", text: "Please provide a valid weight" });
    }
    if (errors.length === 0) {
      const userInfo = {
        calorieGoal: Number(this.state.calorieGoal),
        weight: Number(this.state.weight)
      };
      this.props.addUser(userInfo);
    } else {
      this.setState({ error: errors });
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const { error } = this.state;
    const caloriesGoalErr = error.find(err => err.field === "calorieGoal");
    const weightErr = error.find(err => err.field === "weight");
    return (
      <div>
        {this.props.addUser ? (
          <div className={classes.root}>
            <form onSubmit={this.bundleUserInfo}>
              <Grid container justify="flex-start" alignItems="flex-start">
                <Grid item xs={12} className={classes.input}>
                  <TextField
                    required
                    error={caloriesGoalErr !== undefined}
                    helperText={caloriesGoalErr && caloriesGoalErr.text}
                    id="calorieGoal"
                    name="calorieGoal"
                    label="Daily Calories Goal"
                    value={this.state.calorieGoal}
                    margin="dense"
                    onChange={this.handleChange}
                    InputLabelProps={{
                      classes: {
                        root: classes.formTextLabel
                      }
                    }}
                    InputProps={{
                      classes: {
                        input: classes.formTextInput
                      }
                    }}
                    FormHelperTextProps={{
                      classes: {
                        error: classes.errors
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} className={classes.input}>
                  <TextField
                    error={weightErr !== undefined}
                    helperText={weightErr && weightErr.text}
                    id="weight"
                    name="weight"
                    label="Current Weight"
                    value={this.state.weight}
                    margin="dense"
                    onChange={this.handleChange}
                    InputLabelProps={{
                      classes: {
                        root: classes.formTextLabel
                      }
                    }}
                    InputProps={{
                      classes: {
                        input: classes.formTextInput
                      }
                    }}
                    FormHelperTextProps={{
                      classes: {
                        error: classes.errors
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" className={classes.btn}>
                Submit
              </Button>
            </form>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);
