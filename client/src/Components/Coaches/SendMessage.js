import React from 'react';
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import ApolloClient from "apollo-boost";
import { ADD_MESSAGE_MUTATION } from "../../graphql/mutations";

const styles = theme => ({
  btn: {
    backgroundColor: "#F4B4C3",
    color: "white",
    margin: 30
  }
})


class SendMessageFromCoach extends React.Component{
  constructor(props){
    super(props)
    this.state={
      error: "",
      errorText: "",
      message: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log('message changing',
    this.state.message)
  };

  handleSubmit(){
    if (!this.state.message) {
      this.setState({ error: true, errorText: "Please enter a valid message" });
    } else{
      this.setState({ error: false, errorText: "" });
      this.sendMessage(this.state.message)
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
      recipient: parseInt(this.props.traineeID),
    };

    client
      .mutate({
        mutation: ADD_MESSAGE_MUTATION,
        variables:{
          input: NewMessage
        }
      })
      .then(response => {
        console.log(response)
        this.setState({
          error: "",
          errorText: "",
          message: "",
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: "",
          errorText: "",
          message: "",
        })
      })
  }

  render(){
    const { traineeID, firstName, lastName } = this.props
    return(
      <div style={{width:"80%", marginLeft:"10%", borderRadius:"10px", boxShadow: "6px 6px 15px -5px rgba(0,0,0,0.75)"}}>
        {traineeID &&
          <div style={{padding: 10}}>
            Send Message to: {firstName} {lastName}
            <TextField
              label="message"
              style={{background: "#fff"}}
              rows="10"
              error={this.state.error}
              helperText={this.state.errorText}
              multiline
              fullWidth
              onChange={this.handleChange}
              value={this.state.message}
              margin="normal"
              variant="outlined"
              inputProps={{
                name: "message"
              }}
            />
            <Button onClick={this.handleSubmit} style={{background: "#40A798"}}>
              Send
            </Button>
          </div>
        }
      </div>
    )
  }
}

export default SendMessageFromCoach;
