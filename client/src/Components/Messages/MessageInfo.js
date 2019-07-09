import React from "react";
import UnreadIcon from "@material-ui/icons/MarkunreadMailbox";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core/styles";
import * as moment from "moment";

const styles = theme => ({
  text: {
    fontSize: "1.3rem",
    wordWrap: "break-word",

    [theme.breakpoints.up("sm")]: {
      fontSize: "1.5rem",
      flexGrow: 2
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.7rem"
    }
  },
  secondaryText: {
    fontSize: "1rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.5rem"
    }
  },
  textRoot: {
    margin: "0 5px",
    width: "30%",
    [theme.breakpoints.up("md")]: {
      width: "45%"
    }
  },
  icon: {
    color: "#5E366A",
    fontSize: "1.8rem",
    minWidth: "30px"
  },
  delete: {
    fontSize: "2rem"
  }
});
const MessageInfo = props => {
  const { type, messages, classes, option, coaches, trainees } = props;
  let messagesArr = [];
  if (option === 0) {
    coaches.forEach(coach => {
      var coachMessage = [];
      if (type === "inbox") {
        coachMessage = messages.filter(
          message => message.sender.id === coach.id && message.type === "text"
        );
      } else if (type === "sent") {
        coachMessage = messages.filter(
          message =>
            message.recipient.id === coach.id && message.type === "text"
        );
      }
      messagesArr = [...messagesArr, ...coachMessage];
    });
  } else if (option === 1) {
    trainees.forEach(trainee => {
      var traineeMessage = [];
      if (type === "inbox") {
        traineeMessage = messages.filter(
          message => message.sender.id === trainee.id && message.type === "text"
        );
      } else if (type === "sent") {
        traineeMessage = messages.filter(
          message =>
            message.recipient.id === trainee.id && message.type === "text"
        );
      }
      messagesArr = [...messagesArr, ...traineeMessage];
    });
  }
  messagesArr.sort((a, b) => {
    if (moment(new Date(a.created_at)).isSameOrBefore(new Date(b.created_at)))
      return 1;
    else return -1;
  });

  return (
    <>
      {messagesArr.length > 0 ? (
        <List>
          {messagesArr.map(message => (
            <React.Fragment key={message.id}>
              <ListItem
                button
                onClick={() => props.showMessage(message)}
                classes={{ root: classes.message }}
              >
                {!message.read ? (
                  <ListItemIcon className={classes.icon}>
                    <UnreadIcon />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon className={classes.icon}>
                    <MailOutlinedIcon />
                  </ListItemIcon>
                )}
                {type === "inbox" ? (
                  <ListItemText
                    primary={`${message.sender.firstName} ${
                      message.sender.lastName
                    }`}
                    classes={{
                      primary: classes.text,
                      root: classes.textRoot
                    }}
                  />
                ) : (
                  type === "sent" && (
                    <ListItemText
                      primary={`${message.recipient.firstName} ${
                        message.recipient.lastName
                      }`}
                      classes={{
                        primary: classes.text,
                        root: classes.textRoot
                      }}
                    />
                  )
                )}
                <ListItemText
                  primary={message.text.substring(0, 20) + "..."}
                  classes={{
                    primary: classes.text,
                    root: classes.textRoot
                  }}
                />
                <ListItemText
                  secondary={message.created_at}
                  classes={{
                    secondary: classes.secondaryText,
                    root: classes.textRoot
                  }}
                />
                <ListItemIcon className={classes.icon}>
                  <DeleteIcon
                    onClick={event => props.deleteMessage(event, message.id)}
                    classes={{ root: classes.delete }}
                  />
                </ListItemIcon>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      ) : (
        <h2>No messages</h2>
      )}
    </>
  );
};

export default withStyles(styles)(MessageInfo);
