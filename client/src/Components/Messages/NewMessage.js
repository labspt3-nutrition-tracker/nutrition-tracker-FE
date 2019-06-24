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
    fontFamily: "Oxygen",
    height: "100vh"
  },
  formWrapper: {
    maxWidth: "660px",
    margin: "20px auto"
  },
  textField: {
    width: "80%",
    marginTop: 20
  },
  select: {
    width: "90%",
    marginTop: 20
  },
  btn: {
    backgroundColor: "#F4B4C3",
    color: "white",
    margin: 30
  }
});

class NewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: this.props.recipient ? this.props.recipient : undefined,
      message: "",
      errorText: "",
      error: false,
      selectError: false,
      formErrorText: ""
    };
  }

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
        this.setState({ selectError: true, formErrorText: "Please select a recipient" });
      } else {
        this.setState({ selectError: false });
        console.log("Submitting message: ", this.state);
        this.props.sendMessage({ recipient: this.state.recipient, message: this.state.message });
      }
    }
  };

  render() {
    const { classes, coaches } = this.props;
    const { recipient, message } = this.state;
    return (
      <Paper className={classes.root}>
        {coaches.length > 0 ? (
          <div className={classes.formWrapper}>
            <Grid container justify='center' alignItems='center'>
              <Grid item xs={12}>
                <FormControl className={classes.select} error={this.state.selectError}>
                  <InputLabel htmlFor='recipient'>Recipient</InputLabel>
                  <Select
                    value={recipient}
                    onChange={this.handleChange}
                    className={classes.select}
                    inputProps={{
                      name: "recipient",
                      id: "recipient"
                    }}
                  >
                    {coaches.map(coach => (
                      <MenuItem value={coach.id} key={coach.id}>
                        {`${coach.firstName} ${coach.lastName}`} 
                      </MenuItem>
                    ))}
                    )
                  </Select>
                  <FormHelperText>{this.state.formErrorText}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={this.state.error}
                  helperText={this.state.errorText}
                  label='Message'
                  multiline
                  value={message}
                  onChange={this.handleChange}
                  className={classes.textField}
                  inputProps={{
                    name: "message"
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button className={classes.btn} onClick={this.props.handleCancel}>
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
          <h2>You do not have any coach. Please request a coach first to send a message.</h2>
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(NewMessage);
