import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import NotificationIcon from "@material-ui/icons/NotificationImportant";

import MessageList from "./MessageList";
import NewMessage from "./NewMessage";
import AlertsList from "./AlertsList";

const styles = theme => ({
  root: {
    display: "flex"
  },
  tabs: {
    display: "flex",
    flexDirection: "column",
    fontSize: "2rem"
  },
  tab: {
    fontSize: "1.8rem",
    color: "#3685B5",
    fontFamily: "Oxygen"
  },
  indicator: {
    backgroundColor: "#F4B4C3"
  },
  icon: {
    fontSize: "2.5rem"
  }
});

class MessagePage extends React.Component {
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
    const { classes } = this.props;

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
          <Tab label='Alerts' icon={<NotificationIcon className={classes.icon} />} className={classes.tab} />
        </Tabs>
        {option === 0 ? <MessageList /> : option === 1 ? <NewMessage /> : <AlertsList />}
      </div>
    );
  }
}

export default withStyles(styles)(MessagePage);
