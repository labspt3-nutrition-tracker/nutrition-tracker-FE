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
import momentTz from "moment-timezone";
import { FadeInLeft, FadeInRight } from "animate-css-styled-components";

const styles = theme => ({
  text: {
    fontSize: "1.5rem"
  },
  secondaryText: {
    fontSize: "1.5rem"
  },
  textRoot: {
    margin: "0 5px",
    width: "30%",
    fontSize: "1.6rem",
    color: "#5E366A",
    fontFamily: "Oswald"
  },
  icon: {
    color: "#5E366A",
    fontSize: "1.8rem",
    minWidth: "30px"
  },
  delete: {
    fontSize: "2rem"
  },
  flexName: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: 10
    },
    [theme.breakpoints.between("sm", "xl")]: {
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
    [theme.breakpoints.between("sm", "xl")]: {
      width: "75%"
    }
  },
  message: {
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center"
    },
    [theme.breakpoints.between("sm", "xl")]: {
      flexDirection: "row"
    }
  }
});
const MessageInfo = props => {
  const { type, messages, classes, option, coaches, trainees } = props;
  let messagesArr = [];
  if (option === 0) {
    coaches.forEach(coach => {
      var coachMessage = [];
      if (type === "inbox") {
        coachMessage = messages.filter(message => message.sender.id === coach.id && message.type === "text");
      } else if (type === "sent") {
        coachMessage = messages.filter(message => message.recipient.id === coach.id && message.type === "text");
      }
      messagesArr = [...messagesArr, ...coachMessage];
    });
  } else if (option === 1) {
    trainees.forEach(trainee => {
      var traineeMessage = [];
      if (type === "inbox") {
        traineeMessage = messages.filter(message => message.sender.id === trainee.id && message.type === "text");
      } else if (type === "sent") {
        traineeMessage = messages.filter(message => message.recipient.id === trainee.id && message.type === "text");
      }
      messagesArr = [...messagesArr, ...traineeMessage];
    });
  }
  messagesArr.sort((a, b) => {
    if (moment(new Date(a.created_at)).isSameOrBefore(new Date(b.created_at))) return 1;
    else return -1;
  });

  return (
    <>
      {messagesArr.length > 0 ? (
        <List>
          {messagesArr.map(message => (
            <React.Fragment key={message.id}>
              <ListItem button onClick={() => props.showMessage(message)} classes={{ root: classes.message }}>
                <FadeInLeft duration='1s' className={classes.flexName}>
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
                      primary={`${message.sender.firstName} ${message.sender.lastName}`}
                      classes={{
                        primary: classes.textRoot
                      }}
                    />
                  ) : (
                    type === "sent" && (
                      <ListItemText
                        primary={`${message.recipient.firstName} ${message.recipient.lastName}`}
                        classes={{
                          primary: classes.textRoot
                        }}
                      />
                    )
                  )}
                </FadeInLeft>
                <FadeInRight duration='1s' className={classes.flexText}>
                  <ListItemText
                    primary={message.text.substring(0, 20) + "..."}
                    classes={{
                      primary: classes.text,
                      root: classes.textRoot
                    }}
                  />
                  <ListItemText
                    secondary={momentTz(message.created_at)
                      .tz("America/Chicago")
                      .format("DD-MMM-YYYY")}
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
                </FadeInRight>
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
