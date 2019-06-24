import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonIcon from "@material-ui/icons/Person";

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
    fontSize: "1.2rem",
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
    fontSize: "1.5rem"
  }
});

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCoach: 0
    };
  }

  handleCoachChange = (event, newCoach) => {
    this.setState({ selectedCoach: newCoach });
  };

  render() {
    const { selectedCoach } = this.state;
    const { messages, coaches, classes, showMessage } = this.props;
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
                      label={`${coach.firstName} ${coach.lastName}`}
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
              <div>You have no coaches</div>
            )}
          </Grid>
          <Grid item md={8} xs={12}>
            {messages.length > 0 ? (
              <MessageInfo messages={messages} sender={coaches[selectedCoach]} showMessage={showMessage} />
            ) : (
              <div>You have no messages</div>
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(MessageList);
