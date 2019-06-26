import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ApolloClient from "apollo-boost";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import MessageList from "./MessageList";
import NewMessage from "./NewMessage";
import AlertsList from "./AlertsList";
import {
  GET_MESSAGES_QUERY,
  GET_CURRENT_USER_QUERY,
  GET_COACHES,
  GET_TRAINEES
} from "../../graphql/queries";
import {
  DELETE_MESSAGE_MUTATION,
  ADD_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  ADD_TRAINEE
} from "../../graphql/mutations";

const styles = theme => ({
  root: {
    display: "flex"
  },
  tab: {
    fontSize: "1.6rem",
    color: "#5E366A",
    fontFamily: "Oswald",
    margin: 10,
    padding: "1px 6px",
    width: "150px"
  },
  indicator: {
    backgroundColor: "#60B5A9"
  },
  icon: {
    fontSize: "1.5rem"
  },
  modal: {
    position: "absolute",
    top: "30%",
    left: "30%",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  },
  btn: {
    backgroundColor: "#F4B4C3",
    color: "white",
    margin: 10
  },
  text: {
    fontSize: "1.5rem",
    wordWrap: "break-word"
  }
});

class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      messages: [],
      coaches: [],
      trainees: [],
      option: 0,
      currentMessage: null,
      modalOpen: false
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.modalOpen !== this.state.modalOpen &&
      this.state.modalOpen === false
    )
      this.getData();
  }

  getData = async () => {
    const idToken = localStorage.getItem("token");

    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    try {
      const user = await client.query({ query: GET_CURRENT_USER_QUERY });
      const userId = user.data.getCurrentUser.id;
      const variables = { param: "recipient", value: userId };
      const messages = await client.query({
        query: GET_MESSAGES_QUERY,
        variables: variables
      });
      const coaches = await client.query({
        query: GET_COACHES,
        variables: { trainee_id: userId }
      });
      const trainees = await client.query({
        query: GET_TRAINEES,
        variables: { coach_id: userId }
      });
      this.setState({
        messages: messages.data.getMessagesBy,
        coaches: coaches.data.getCoaches,
        trainees: trainees.data.getTrainees,
        currentUser: user.data.getCurrentUser
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (event, newOption) => {
    this.setState({ option: newOption });
  };

  showMessage = async message => {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    // Update message to read
    try {
      const { text, recipient, sender, type } = message;
      const variables = {
        id: Number(message.id),
        input: {
          text,
          recipient: Number(recipient.id),
          sender: Number(sender.id),
          type,
          read: true
        }
      };
      await client.mutate({
        mutation: UPDATE_MESSAGE_MUTATION,
        variables: variables
      });
    } catch (err) {
      console.log(err);
    }
    //Show full message in a modal
    this.setState({ currentMessage: message, modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleAccept = async senderId => {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    try {
      //create a link (entry) between the sender and current user
      await client.mutate({
        mutation: ADD_TRAINEE,
        variables: { coach_id: senderId, trainee_id: this.state.currentUser.id }
      });
      //delete the alert message
      const variables = { id: this.state.currentMessage.id };
      await client.mutate({ mutation: DELETE_MESSAGE_MUTATION, variables });
      this.handleClose();
      this.getData();
    } catch (err) {
      console.log(err);
    }
  };

  handleReply = () => {
    this.setState({ option: 1 });
    this.handleClose();
  };

  handleCancel = () => {
    this.setState({ option: 0 });
  };

  sendMessage = async ({ recipient, message }) => {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    const NewMessage = {
      type: "text",
      text: message,
      read: false,
      sender: this.state.currentUser.id,
      recipient: recipient
    };
    try {
      const variables = { input: NewMessage };
      await client.mutate({ mutation: ADD_MESSAGE_MUTATION, variables });
      this.setState({ option: 0 });
      this.getData();
    } catch (err) {
      console.log(err);
    }
  };

  deleteMessageHandler = async (event, messageId) => {
    event.stopPropagation();
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    const variables = { id: messageId };
    try {
      await client.mutate({ mutation: DELETE_MESSAGE_MUTATION, variables });
      this.getData();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      messages,
      coaches,
      trainees,
      currentMessage,
      modalOpen
    } = this.state;
    let { option } = this.state;
    const { classes } = this.props;

    const alerts = messages.filter(message => message.type === "alert");
    if (option === 2 && alerts.length === 0) option = 0;
    return (
      <div>
        <Tabs
          value={option}
          onChange={this.handleChange}
          className={classes.tabs}
          centered
          classes={{
            indicator: classes.indicator
          }}
        >
          <Tab label="Inbox" className={classes.tab} />
          <Tab label="New Message" className={classes.tab} />
          {alerts.length > 0 && <Tab label="Alerts" className={classes.tab} />}
        </Tabs>
        {option === 0 ? (
          <MessageList
            messages={messages}
            coaches={coaches}
            trainees={trainees}
            showMessage={this.showMessage}
            deleteMessage={this.deleteMessageHandler}
          />
        ) : option === 1 ? (
          <NewMessage
            coaches={coaches}
            trainees={trainees}
            recipient={currentMessage && currentMessage.sender.id}
            handleCancel={this.handleCancel}
            sendMessage={this.sendMessage}
          />
        ) : (
          <AlertsList alerts={alerts} showMessage={this.showMessage} />
        )}
        {currentMessage && (
          <Modal
            aria-labelledby="display message"
            aria-describedby="display message"
            open={modalOpen}
            onClose={this.handleClose}
          >
            <div className={classes.modal}>
              <Typography variant="h6" id="modal-title">
                Sender: {currentMessage.sender.firstName}{" "}
                {currentMessage.sender.lastName}
              </Typography>
              <Typography
                variant="subtitle1"
                id="simple-modal-description"
                className={classes.text}
              >
                {currentMessage.text}
              </Typography>
              <Button onClick={this.handleClose} className={classes.btn}>
                Close
              </Button>
              {currentMessage.type === "alert" ? (
                <Button
                  onClick={() => this.handleAccept(currentMessage.sender.id)}
                  className={classes.btn}
                >
                  Accept
                </Button>
              ) : (
                <Button onClick={this.handleReply} className={classes.btn}>
                  Reply
                </Button>
              )}
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MessagePage);
