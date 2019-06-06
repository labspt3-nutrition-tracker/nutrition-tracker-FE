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

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "80px auto",
    padding: 10
  },
  media: {
    padding: 20
  },
  listItemText: {
    fontSize: "1.8rem"
  },
  listItemText2: {
    fontSize: "1.6rem",
    color: "#2196F3"
  },
  icon: {
    color: "#2196F3"
  },
  user: {
    textTransform: "uppercase",
    color: "#2196F3"
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
      <>
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
            <Typography gutterBottom variant='h5' component='h2'>
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
              </ListItem>{" "}
              <ListItem>
                <ListItemIcon>
                  <FolderIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary='Initial Weight'
                  secondary={currentUser.weight ? currentUser.weight : "No initial weight entered"}
                  classes={{ primary: classes.listItemText, secondary: classes.listItemText2 }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FolderIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary='Current Weight'
                  secondary={this.state.currentWeight ? this.state.currentWeight : "No current weight entered"}
                  classes={{ primary: classes.listItemText, secondary: classes.listItemText2 }}
                />
                <EditIcon className={classes.icon} onClick={() => this.openModal("weight")} />
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
                <EditIcon className={classes.icon} onClick={() => this.openModal("caloriesGoal")} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </>
    );
  }
}

// <>
//     <SettingsContainer>
//         <form>
//             <h2 style={{marginBottom:20}}>Body Goals</h2>
//             <div style={{marginBottom:50}}>
//                 <h3>Initial Weight</h3>
//                 <TextField
//                     margin="dense"
//                 />
//                 <h3>Current Weight</h3>
//                 <TextField/>
//             </div>
//             <h2 style={{marginBottom:20}}>Calories</h2>
//             <div style={{marginBottom:50}}>
//                 <h3>Daily Calorie Goal</h3>
//                 <TextField
//                     placeholder="900 Calories"
//                     margin="dense"
//                 />
//             </div>
//             <h2 style={{marginBottom:20}}>Download Report</h2>
//             <div>
//                 <StyledButton
//                 variant="extended"
//                 size="large"
//                 download="test"
//                 href="test"
//                 >
//                 Download
//                 </StyledButton>
//             </div>

//         </form>
//     </SettingsContainer>
// </>

export default withStyles(styles)(Settings);
