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
      option: 0
    };
  }

  handleChange = (event, newOption) => {
    this.setState({ option: newOption });
  };

  render() {
    const { option } = this.state;
    const { messages, coaches, trainees, classes, showMessage, deleteMessage } = this.props;
 
    return (
      <Paper className={classes.root}>
        <Grid container justify='center' alignItems='center'>
          <Grid item md={4} xs={12}>
                <Tabs
                  value={option}
                  onChange={this.handleChange}
                  className={classes.tabs}
                  centered
                  classes={{
                    indicator: classes.noIndicator,
                    flexContainer: classes.tabs
                  }}
                >
                  <Tab
                    label="Coaches"
                    icon={<PersonIcon className={classes.icon} />}
                    className={classes.tab}
                    classes={{
                      selected: classes.indicator
                    }}
                  />
                  <Tab
                    label="Trainees"
                    icon={<PersonIcon className={classes.icon} />}
                    className={classes.tab}
                    classes={{
                      selected: classes.indicator
                    }}
                  />
                </Tabs>
          </Grid>
          <Grid item md={8} xs={12}>
            {messages.length > 0 ? (
              <MessageInfo 
                messages={messages} 
                option={option}
                coaches={coaches}
                trainees={trainees}
                showMessage={showMessage}
                deleteMessage={deleteMessage} />
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
