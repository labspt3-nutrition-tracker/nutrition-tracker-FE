import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    textAlign: "center"
  },
  title: {
    color: "#3685B5",
    fontSize: "2.5rem",
    fontFamily: "Oxygen",
    margin: "20px 0"
  },
  formTextLabel: {
    fontFamily: "Oxygen",
    fontSize: "2rem",
    color: "#3685B5"
  },
  formTextInput: {
    fontFamily: "Oxygen",
    fontSize: "1.8rem",
    width: "100%"
  },
  btn: {
    fontFamily: "Oxygen",
    fontSize: "1.4rem",
    color: "white",
    backgroundColor: "#F4B4C3",
    marginTop: 35
  },
  errors: {
    fontFamily: "Oxygen",
    fontSize: "1.5rem",
    color: "#F4B4C3"
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
      username: "",
      calorieGoal: 0,
      weight: 0,
      error: []
    };
  }

  bundleUserInfo = e => {
    e.preventDefault();
    const errors = [];
    if (!this.state.username.trim()) {
      errors.push({ field: "username", text: "Please provide a valid username" });
    }
    if (isNaN(this.state.calorieGoal) || Number(this.state.calorieGoal) === 0) {
      errors.push({ field: "calorieGoal", text: "Please provide a valid calories goal" });
    }
    if (isNaN(this.state.weight)) {
      errors.push({ field: "weight", text: "Please provide a valid weight" });
    }
    if (errors.length === 0) {
      const userInfo = {
        username: this.state.username,
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
    const usernameErr = error.find(err => err.field === "username");
    const caloriesGoalErr = error.find(err => err.field === "calorieGoal");
    const weightErr = error.find(err => err.field === "weight");
    return (
      <div>
        {this.props.addUser ? (
          <div className={classes.root}>
            <div className={classes.title}><a className={classes.href} href="https://nutrition-tracker-lambda.netlify.com/login">Sign Up</a></div>
            <form onSubmit={this.bundleUserInfo}>
              <Grid container justify='flex-start' alignItems='flex-start'>
                <Grid item xs={12} className={classes.input}>
                  <TextField
                    autoFocus
                    type='text'
                    required
                    error={usernameErr !== undefined}
                    helperText={usernameErr && usernameErr.text}
                    id='username'
                    name='username'
                    label='username'
                    value={this.state.username}
                    margin='dense'
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
                    required
                    error={caloriesGoalErr !== undefined}
                    helperText={caloriesGoalErr && caloriesGoalErr.text}
                    id='calorieGoal'
                    name='calorieGoal'
                    label='Daily Calories Goal'
                    value={this.state.calorieGoal}
                    margin='dense'
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
                    id='weight'
                    name='weight'
                    label='Current Weight'
                    value={this.state.weight}
                    margin='dense'
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
              <Button type='submit' variant='contained' className={classes.btn}>
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
