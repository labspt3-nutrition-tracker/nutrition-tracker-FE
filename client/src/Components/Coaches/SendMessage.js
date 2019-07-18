import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ApolloClient from "apollo-boost";

import { ADD_MESSAGE_MUTATION } from "../../graphql/mutations";

const styles = theme => ({
  btn: {
    padding: "5px 10px",
    fontSize: "1.4rem",
    color: "#FCFCFB",
    border: "2px solid #5E366A",
    backgroundColor: "#5E366A",
    "&:hover": {
      backgroundColor: "white",
      color: "#545454"
    }
  },
  message: {
    fontSize: "1.6rem",
    background: "#fff"
  },
  info: {
    fontSize: "2rem",
    textAlign: "center",
    margin: 10,
    color: "#40a798",
    fontFamily: "Oswald"
  }
});

class SendMessageFromCoach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      errorText: "",
      message: "",
      info: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.traineeID !== this.props.traineeID)
      this.setState({ info: "" });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, info: "" });
  };

  handleSubmit() {
    if (!this.state.message) {
      this.setState({ error: true, errorText: "Please enter a valid message" });
    } else {
      this.setState({ error: false, errorText: "", info: "" });
      this.sendMessage(this.state.message);
    }
  }

  sendMessage = message => {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    const NewMessage = {
      type: "text",
      text: this.state.message,
      read: false,
      sender: parseInt(this.props.currentUser.id),
      recipient: parseInt(this.props.traineeID)
    };

    client
      .mutate({
        mutation: ADD_MESSAGE_MUTATION,
        variables: {
          input: NewMessage
        }
      })
      .then(response => {
        this.setState({
          error: "",
          errorText: "",
          message: "",
          info: "Message sent"
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: "",
          errorText: "",
          message: ""
        });
      });
  };

  render() {
    const { classes, traineeID, firstName, lastName } = this.props;
    const { info } = this.state;
    return (
      <div
        style={{
          margin: 10,
          borderRadius: "10px",
          boxShadow: "6px 6px 15px -5px rgba(0,0,0,0.75)"
        }}
      >
        {traineeID && (
          <div style={{ padding: 10 }}>
            {info && <div className={classes.info}>{info}</div>}
            Send Message to: {firstName} {lastName}
            <TextField
              label="message"
              rows="10"
              error={this.state.error}
              helperText={this.state.errorText}
              multiline
              fullWidth
              onChange={this.handleChange}
              value={this.state.message}
              margin="normal"
              variant="outlined"
              InputProps={{
                name: "message",
                classes: {
                  input: classes.message
                }
              }}
            />
            <Button onClick={this.handleSubmit} className={classes.btn}>
              Send
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SendMessageFromCoach);
