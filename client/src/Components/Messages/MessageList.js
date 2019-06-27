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
    fontFamily: "Oswald",
    height: "100vh"
  },
  flex: {
    justifyContent: "space-evenly"
  },
  tab: {
    fontSize: "1.6rem",
    color: "#5E366A",
    fontFamily: "Oswald",
    margin: "20px 0",
    padding: "1px 6px",
    width: "100px",
    border: "1px solid #5E366A",
    "&:hover": {
      backgroundColor: "#5E366A",
      color: "white"
    }
  },
  indicator: {
    backgroundColor: "#5E366A",
    color: "white"
  },
  noIndicator: {
    backgroundColor: "white"
  }
});

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 0
    };
  }

  handleChange = (event, newOption) => {
    this.setState({ option: newOption });
  };

  render() {
    const { option } = this.state;
    const {
      messages,
      coaches,
      trainees,
      classes,
      showMessage,
      deleteMessage
    } = this.props;

    return (
      <Paper className={classes.root}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Tabs
              value={option}
              onChange={this.handleChange}
              classes={{
                indicator: classes.noIndicator,
                flexContainer: classes.flex
              }}
            >
              <Tab
                label="Coaches"
                className={classes.tab}
                classes={{
                  selected: classes.indicator
                }}
              />
              <Tab
                label="Trainees"
                className={classes.tab}
                classes={{
                  selected: classes.indicator
                }}
              />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            {messages.length > 0 ? (
              <MessageInfo
                messages={messages}
                option={option}
                coaches={coaches}
                trainees={trainees}
                showMessage={showMessage}
                deleteMessage={deleteMessage}
              />
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
