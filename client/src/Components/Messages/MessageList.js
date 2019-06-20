import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonIcon from "@material-ui/icons/Person";

import { GET_MESSAGES_QUERY, GET_CURRENT_USER_QUERY } from "../../graphql/queries";
import MessageInfo from "./MessageInfo";

const styles = theme => ({
  root: {
    margin: "20px auto",
    maxWidth: "1200px",
    padding: 15,
    fontFamily: "Oxygen",
    height: "100vh"
  },
  tabs: {
    display: "flex",
    flexDirection: "column"
  },
  tab: {
    fontSize: "1.8rem",
    color: "#3685B5",
    fontFamily: "Oxygen",
    margin: "10px 0"
  },
  indicator: {
    backgroundColor: "#F4B4C3",
    color: "white"
  },
  noIndicator: {
    backgroundColor: "white"
  },
  icon: {
    fontSize: "2.5rem"
  }
});

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      coaches: [],
      selectedCoach: 0
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

  handleCoachChange = (event, newCoach) => {
    this.setState({ selectedCoach: newCoach });
  };

  showMessage = id => {
    console.log("Showing message with id: ", id);
  };

  render() {
    const { messages, coaches, selectedCoach } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Grid container justify='center' alignItems='center'>
          <Grid item md={4} xs={12}>
            {coaches.length > 0 ? (
              <>
                <Tabs
                  value={selectedCoach}
                  onChange={this.handleCoachChange}
                  className={classes.tabs}
                  centered
                  classes={{
                    indicator: classes.noIndicator,
                    flexContainer: classes.tabs
                  }}
                >
                  {coaches.map((coach, index) => (
                    <Tab
                      label={coach.name}
                      icon={<PersonIcon className={classes.icon} />}
                      className={classes.tab}
                      tabIndex={index}
                      key={coach.id}
                      classes={{
                        selected: classes.indicator
                      }}
                    />
                  ))}
                </Tabs>
              </>
            ) : (
              <div>You have no coaches.</div>
            )}
          </Grid>
          <Grid item md={8} xs={12}>
            {coaches.length > 0 ? (
              <MessageInfo messages={messages} sender={coaches[selectedCoach]} showMessage={this.showMessage} />
            ) : (
              <div>You have no coaches.</div>
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(MessageList);
