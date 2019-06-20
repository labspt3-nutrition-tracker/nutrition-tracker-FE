import React from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core/styles";
import NotificationIcon from "@material-ui/icons/NotificationImportant";

const styles = theme => ({
  root: {
    margin: "20px auto",
    maxWidth: "1200px",
    padding: 15,
    fontFamily: "Oxygen",
    height: "100vh"
  },
  text: {
    fontSize: "1.5rem"
  },
  icon: {
    color: "#F4B4C3",
    fontSize: "2.2rem"
  }
});

const AlertsList = props => {
  const { classes, alerts } = props;
  return (
    <Paper className={classes.root}>
      {alerts.length > 0 ? (
        <List>
          {alerts.map(alert => (
            <ListItem key={alert.id} button onClick={() => props.showMessage(alert)}>
              {!alert.read && (
                <ListItemIcon className={classes.icon}>
                  <NotificationIcon />
                </ListItemIcon>
              )}
              <ListItemText secondary={`${alert.sender.firstName} ${alert.sender.lastName}`} />
              <ListItemText
                primary={alert.text}
                classes={{
                  primary: classes.text
                }}
              />
              <ListItemText secondary={alert.created_at} />
            </ListItem>
          ))}
        </List>
      ) : (
        <h2>No messages</h2>
      )}
    </Paper>
  );
};

export default withStyles(styles)(AlertsList);
