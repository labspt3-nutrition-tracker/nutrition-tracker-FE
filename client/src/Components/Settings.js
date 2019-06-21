import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import EditIcon from "@material-ui/icons/Edit";

import { getCurrentUser } from "../util/getCurrentUser";
import { getCurrentWeight } from "../util/getCurrentweight";
import UserEditModal from "../Components/UserEditModal";
import AccountNav from "./AccountNav";

const styles = theme => ({
  root: {
    margin: "0"
  },
  card: {
    width: "80%",
    maxWidth: 600,
    margin: "0 0 80px 250px",
    padding: 10
  },
  media: {
    padding: 20
  },
  listItemText: {
    fontFamily: "Oxygen",
    fontSize: "1.8rem"
  },
  listItemText2: {
    fontFamily: "Oxygen",
    fontSize: "1.6rem",
    color: "#3685B5"
  },
  icon: {
    color: "#3685B5"
  },
  editIcon: {
    color: "#F4B4C3",
    fontSize: "3.3rem"
  },
  user: {
    fontFamily: "Oxygen",
    textTransform: "uppercase",
    color: "#3685B5"
  }
});

class Settings extends React.Component {
  state = {
    currentUser: {},
    currentWeight: 0,
    modalOpen: false,
    editType: ""
  };
  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.currentUser !== this.state.currentUser || prevState.currentWeight !== this.state.currentWeight)
      this.getData();
  };

  getData = () => {
    getCurrentUser(localStorage.getItem("token"))
      .then(currentUser => {
        getCurrentWeight(currentUser.id).then(weight => {
          this.setState({ currentUser: currentUser, currentWeight: weight });
        });
      })
      .catch(err => console.log(err));
  };

  openModal = editType => {
    this.setState({ modalOpen: true, editType: editType });
  };

  handleClose = () => {
    this.setState(prevState => {
      return { modalOpen: !prevState.modalOpen };
    });
  };

  render() {
    const { classes } = this.props;
    const { currentUser, editType } = this.state;
    return (
      
      <div className={classes.root}>
        <AccountNav />
        <UserEditModal
          open={this.state.modalOpen}
          handleClose={this.handleClose}
          currentUser={currentUser}
          editType={editType}
          currentWeight={this.state.currentWeight}
        />
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant='h3' component='h2' className={classes.user}>
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
            <Typography gutterBottom variant='h5' component='h2' className={classes.listItemText}>
              {currentUser.email}
            </Typography>
            <List dense={false}>
              <ListItem>
                <ListItemIcon>
                  <FolderIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary='User Type'
                  secondary={currentUser.userType}
                  classes={{ primary: classes.listItemText, secondary: classes.listItemText2 }}
                />
                {currentUser.userType === "basic" && (
                  <EditIcon className={classes.editIcon} onClick={() => this.openModal("userType")} />
                )}
              </ListItem>{" "}
              <ListItem>
                <ListItemIcon>
                  <FolderIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary='Current Weight'
                  secondary={this.state.currentWeight ? this.state.currentWeight : "No current weight entered"}
                  classes={{ primary: classes.listItemText, secondary: classes.listItemText2 }}
                />
                <EditIcon className={classes.editIcon} onClick={() => this.openModal("weight")} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FolderIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary='Calories Daily Goal'
                  secondary={currentUser.calorieGoal}
                  classes={{ primary: classes.listItemText, secondary: classes.listItemText2 }}
                />
                <EditIcon className={classes.editIcon} onClick={() => this.openModal("caloriesGoal")} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
