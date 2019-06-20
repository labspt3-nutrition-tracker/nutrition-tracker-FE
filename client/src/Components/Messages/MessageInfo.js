import React from "react";
import UnreadIcon from "@material-ui/icons/MarkunreadMailbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  text: {
    fontSize: "1.8rem"
  },
  icon: {
    color: "#F4B4C3",
    fontSize: "2.2rem"
  }
});

const MessageInfo = props => {
  const { sender, messages, classes } = props;
  const messagesArr = messages.filter(message => message.sender.id === sender.id && message.type === "text");
  console.log({ messagesArr });

  return (
    <>
      {props.messages.length > 0 ? (
        <List>
          {messagesArr.map(message => (
            <ListItem key={message.id} button onClick={() => props.showMessage(message.id)}>
              {!message.read && (
                <ListItemIcon className={classes.icon}>
                  <UnreadIcon />
                </ListItemIcon>
              )}
              <ListItemText
                primary={message.text}
                classes={{
                  primary: classes.text
                }}
              />
              <ListItemText
                secondary={message.created_at}
                classes={{
                  secondary: classes.text
                }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <h2>No messages</h2>
      )}
    </>
  );
};

export default withStyles(styles)(MessageInfo);
