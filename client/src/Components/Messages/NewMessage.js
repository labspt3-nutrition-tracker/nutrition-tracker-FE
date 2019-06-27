import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  root: {
    margin: "20px auto",
    maxWidth: "1200px",
    padding: 15,
    fontFamily: "Oswald",
    height: "100vh"
  },
  formWrapper: {
    maxWidth: "660px",
    margin: "20px auto"
  },
  textField: {
    width: "80%",
    marginTop: 20,
    fontSize: "1.6rem"
  },
  select: {
    width: "80%",
    marginTop: 5,
    fontSize: "1.4rem"
  },
  menuItem: {
    fontSize: "1.4rem"
  },
  label: {
    fontSize: "1.4rem",
    color: "#6CBBAF",
    fontFamily: "Oswald"
  },
  btn: {
    border: "1px solid #5E366A",
    backgroundColor: "#5E366A",
    color: "white",
    margin: 30,
    "&:hover": {
      border: "1px solid #5E366A",
      backgroundColor: "white",
      color: "#5E366A"
    }
  }
});

class NewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: null,
      message: "",
      errorText: "",
      error: false,
      selectError: false,
      formErrorText: ""
    };
  }

  componentDidMount = () => {
    if (this.props.recipient)
      this.setState({ recipient: this.props.recipient });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.message) {
      this.setState({ error: true, errorText: "Please enter a valid message" });
    } else {
      this.setState({ error: false });
      if (!this.state.recipient) {
        this.setState({
          selectError: true,
          formErrorText: "Please select a recipient"
        });
      } else {
        this.props.sendMessage({
          recipient: this.state.recipient,
          message: this.state.message
        });
        this.setState({
          selectError: false,
          recipient: undefined,
          message: ""
        });
      }
    }
  };

  render() {
    const { classes, coaches, trainees } = this.props;
    const { recipient, message } = this.state;
    //combine coaches and trainees in one array - no repeats
    const people = [...coaches];
    trainees.forEach(trainee => {
      const name = coaches.find(
        coach =>
          `${coach.firstName} ${coach.lastName}` ===
          `${trainee.firstName} ${trainee.lastName}`
      );
      if (!name) people.push(trainee);
    });
    return (
      <Paper className={classes.root}>
        {coaches.length > 0 || trainees.length > 0 ? (
          <div className={classes.formWrapper}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12}>
                <FormControl
                  className={classes.select}
                  error={this.state.selectError}
                >
                  <InputLabel
                    htmlFor="recipient"
                    classes={{ root: classes.label }}
                  >
                    Recipient
                  </InputLabel>
                  <Select
                    value={recipient}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "recipient",
                      id: "recipient",
                      style: { fontSize: "1.4rem" }
                    }}
                    classes={{ root: classes.select }}
                  >
                    {people.map(user => (
                      <MenuItem
                        value={user.id}
                        key={user.id}
                        classes={{ root: classes.menuItem }}
                      >
                        {`${user.firstName} ${user.lastName}`}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{this.state.formErrorText}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={this.state.error}
                  helperText={this.state.errorText}
                  label="Message"
                  multiline
                  value={message}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "message",
                    style: { fontSize: "1.4rem" }
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "1.4rem",
                      color: "#6CBBAF",
                      fontFamily: "Oswald",
                      marginBottom: 10
                    }
                  }}
                  classes={{ root: classes.textField, label: classes.label }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.btn}
                  onClick={this.props.handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button className={classes.btn} onClick={this.handleSubmit}>
                  Send
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : (
          <h2>
            You do not have any coach. Please request a coach first to send a
            message.
          </h2>
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(NewMessage);
