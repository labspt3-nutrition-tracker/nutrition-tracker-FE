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

  secondaryText: {
    fontSize: "1.5rem"
  },
  icon: {
    color: "#5E366A",
    fontSize: "2rem",
    minWidth: "30px"
  },
  flexName: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: 10
    },
    [theme.breakpoints.between("sm", "lg")]: {
      marginRight: 10,
      width: "30%"
    }
  },
  flexText: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      marginBottom: 20
    },
    [theme.breakpoints.between("sm", "lg")]: {
      width: "75%"
    }
  },
  message: {
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center"
    },
    [theme.breakpoints.between("sm", "lg")]: {
      flexDirection: "row"
    }
  },
  textRoot: {
    margin: "0 5px",
    width: "30%",
    fontSize: "1.6rem",
    color: "#5E366A",
    fontFamily: "Oswald"
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
              classes={{ root: classes.message }}
            >
              <div className={classes.flexName}>
                {!alert.read && (
                  <ListItemIcon>
                    <NotificationIcon classes={{ root: classes.icon }} />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={`${alert.sender.firstName} ${alert.sender.lastName}`}
                  classes={{
                    primary: classes.textRoot
                  }}
                />
              </div>
              <div className={classes.flexText}>
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
              </div>
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
