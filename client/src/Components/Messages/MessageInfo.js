import React from "react";
import UnreadIcon from "@material-ui/icons/MarkunreadMailbox";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core/styles";
import * as moment from "moment";

const styles = theme => ({
  text: {
    fontSize: "1.5rem"
  },
  icon: {
    color: "#F4B4C3",
    fontSize: "2.2rem"
  }
});
const MessageInfo = props => {
  const { messages, classes, option, coaches, trainees } = props;
  let messagesArr = [];
  if(option === 0) {
    coaches.forEach(coach => {
      const coachMessage = messages.filter(message => message.sender.id === coach.id && message.type === "text");
      messagesArr = [...messagesArr, ...coachMessage]
    })
  } else if(option === 1) {
    trainees.forEach(trainee => {
      const traineeMessage = messages.filter(message => message.sender.id === trainee.id && message.type === "text");
      messagesArr = [...messagesArr, ...traineeMessage]
    })
  }
  messagesArr.sort((a, b) => {
    if( moment(new Date(a.created_at)).isSameOrBefore(new Date(b.created_at))) return 1 
    else return -1;
  })

  return (
    <>
      {messagesArr.length > 0 ? (
        <List>
          {messagesArr.map(message => (
            <ListItem key={message.id} button onClick={() => props.showMessage(message)}>
              {!message.read && (
                <ListItemIcon className={classes.icon}>
                  <UnreadIcon />
                </ListItemIcon>
              )}
              <ListItemText
                primary={`${message.sender.firstName} ${message.sender.lastName}`}
                classes={{
                  primary: classes.text
                }}
              />
              <ListItemText
                primary={message.text}
                classes={{
                  primary: classes.text
                }}
              />
              <ListItemText secondary={message.created_at} />
              <ListItemIcon className={classes.icon}>
                <DeleteIcon onClick={(event) => props.deleteMessage(event, message.id)} />
              </ListItemIcon>
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
