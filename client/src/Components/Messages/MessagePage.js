import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import NotificationIcon from "@material-ui/icons/NotificationImportant";
import ApolloClient from "apollo-boost";

import MessageList from "./MessageList";
import NewMessage from "./NewMessage";
import AlertsList from "./AlertsList";
import { GET_MESSAGES_QUERY, GET_CURRENT_USER_QUERY } from "../../graphql/queries";

const styles = theme => ({
  root: {
    display: "flex"
  },
  tabs: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.2rem"
  },
  tab: {
    fontSize: "1.5rem",
    color: "#3685B5",
    fontFamily: "Oxygen"
  },
  indicator: {
    backgroundColor: "#F4B4C3"
  },
  icon: {
    fontSize: "1.5rem"
  }
});

class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      coaches: [],
      option: 0
    };
  }

  componentDidMount = async () => {
    const idToken = localStorage.getItem("token");

    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    try {
      const user = await client.query({ query: GET_CURRENT_USER_QUERY });
      const userId = user.data.getCurrentUser.id;
      const variables = { param: "recipient", value: userId };
      let messages = await client.query({ query: GET_MESSAGES_QUERY, variables: variables });

      //**** */
      //get coaches - query not ready yet - doing it manually for now
      let senders = messages.data.getMessagesBy.map(message => {
        return {
          id: message.sender.id,
          name: `${message.sender.firstName} ${message.sender.lastName}`
        };
      });
      const coaches = [];
      senders.forEach(s => {
        if (!coaches.find(u => u.id === s.id)) coaches.push(s);
      });
      console.log({ coaches });
      //*** */

      this.setState({ messages: messages.data.getMessagesBy, coaches: coaches });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (event, newOption) => {
    this.setState({ option: newOption });
  };

  showMessage = id => {
    console.log("Showing message with id: ", id);
  };

  render() {
    const { option, messages, coaches } = this.state;
    const { classes } = this.props;

    const alerts = messages.filter(message => message.type === "alert");
    console.log({ alerts });

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
          <Tab label='Inbox' icon={<InboxIcon className={classes.icon} />} className={classes.tab} />
          <Tab label='New Message' icon={<MailIcon className={classes.icon} />} className={classes.tab} />
          {alerts.length > 0 && (
            <Tab label='Alerts' icon={<NotificationIcon className={classes.icon} />} className={classes.tab} />
          )}
        </Tabs>
        {option === 0 ? (
          <MessageList messages={messages} coaches={coaches} showMessage={this.showMessage} />
        ) : option === 1 ? (
          <NewMessage />
        ) : (
          <AlertsList alerts={alerts} showMessage={this.showMessage} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MessagePage);
