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
  textRoot: {
    margin: "0 5px"
    // width: "30%"
    // [theme.breakpoints.up("md")]: {
    //   width: "45%"
    // }
  },
  secondaryText: {
    fontSize: "1.5rem"
    // [theme.breakpoints.up("sm")]: {
    //   fontSize: "1.5rem"
    // }
  },
  icon: {
    color: "#5E366A",
    fontSize: "2rem",
    minWidth: "30px"
  }
});

const AlertsList = props => {
  const { classes, alerts } = props;
  return (
    <Paper className={classes.root}>
      {alerts.length > 0 ? (
        <List>
          {alerts.map(alert => (
            <ListItem
              key={alert.id}
              button
              onClick={() => props.showMessage(alert)}
            >
              {!alert.read && (
                <ListItemIcon>
                  <NotificationIcon classes={{ root: classes.icon }} />
                </ListItemIcon>
              )}
              <ListItemText
                primary={`${alert.sender.firstName} ${alert.sender.lastName}`}
                classes={{
                  primary: classes.text,
                  root: classes.textRoot
                }}
              />
              <ListItemText
                primary={alert.text}
                classes={{
                  primary: classes.text,
                  root: classes.textRoot
                }}
              />
              <ListItemText
                secondary={alert.created_at}
                classes={{
                  secondary: classes.secondaryText,
                  root: classes.textRoot
                }}
              />
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
