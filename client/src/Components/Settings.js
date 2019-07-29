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
import Grid from "@material-ui/core/Grid";
import { HeadShake } from "animate-css-styled-components";

import { getCurrentUser } from "../util/getCurrentUser";
import { getCurrentWeight } from "../util/getCurrentweight";
import UserEditModal from "../Components/UserEditModal";
import AccountNav from "./AccountNav";

const styles = theme => ({
  divStyle: {
    fontFamily: "Oswald",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  gridContainer: {
    padding: "3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },

  settingsTop: {
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-around"
    }
  },
  card: {
    width: "100%",
    maxWidth: 500,
    height: "400px",
    marginLeft: "7%",
    padding: 10,
    flexWrap: "nowrap",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: 1000,
      margin: "inherit",
      display: "flex",
      justifyContent: "center"
    }
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
      flexDirection: "column",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  cardContentItems: {
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
      flexDirection: "column",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  media: {
    padding: 20
  },
  listItemText: {
    display: "flex",
    fontFamily: "Roboto",
    fontSize: "1.8rem"
  },
  listItemText2: {
    fontFamily: "Roboto",
    fontSize: "1.6rem",
    color: "#5E366A"
  },
  icon: {
    color: "#5E366A"
  },
  editIcon: {
    color: "#40A798",
    fontSize: "3.3rem"
  },
  user: {
    fontFamily: "Oswald",
    textTransform: "uppercase",
    color: "#5E366A"
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
        getCurrentWeight(currentUser).then(weight => {
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
      <div className={classes.divStyle}>
        <AccountNav />
        <Grid
          item
          md={8}
          xs={12}
          container
          justify='center'
          alignItems='center'
          border='1px solid black'
          classes={{ root: classes.gridContainer }}
        >
          <UserEditModal
            open={this.state.modalOpen}
            handleClose={this.handleClose}
            currentUser={currentUser}
            editType={editType}
            currentWeight={this.state.currentWeight}
          />
          <Card className={classes.card}>
            <div className={classes.settingsTop}>
              <CardContent>
                <div className={classes.cardContent}>
                  <div className={classes.header}>
                    <Typography gutterBottom variant='h3' component='h2' className={classes.user}>
                      {currentUser.firstName} {currentUser.lastName}
                    </Typography>
                    <Typography gutterBottom variant='h5' component='h2' className={classes.listItemText}>
                      {currentUser.email}
                    </Typography>
                  </div>
                  <List dense={false}>
                    <ListItem>
                      <ListItemIcon>
                        <FolderIcon className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText
                        primary='User Type'
                        secondary={currentUser.userType}
                        classes={{
                          primary: classes.listItemText,
                          secondary: classes.listItemText2
                        }}
                      />
                      {currentUser.userType !== "coach" && (
                        <HeadShake delay='2s' duration='1s'>
                          <EditIcon className={classes.editIcon} onClick={() => this.openModal("userType")} />
                        </HeadShake>
                      )}
                    </ListItem>{" "}
                    <ListItem>
                      <ListItemIcon>
                        <FolderIcon className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText
                        primary='Current Weight'
                        secondary={this.state.currentWeight ? this.state.currentWeight : "No current weight entered"}
                        classes={{
                          primary: classes.listItemText,
                          secondary: classes.listItemText2
                        }}
                      />
                      <HeadShake delay='2s' duration='1s'>
                        <EditIcon className={classes.editIcon} onClick={() => this.openModal("weight")} />
                      </HeadShake>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FolderIcon className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText
                        primary='Calories Daily Goal'
                        secondary={currentUser.calorieGoal}
                        classes={{
                          primary: classes.listItemText,
                          secondary: classes.listItemText2
                        }}
                      />
                      <HeadShake delay='2s' duration='1s'>
                        <EditIcon className={classes.editIcon} onClick={() => this.openModal("caloriesGoal")} />
                      </HeadShake>
                    </ListItem>
                  </List>
                </div>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
