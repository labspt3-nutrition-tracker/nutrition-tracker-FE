import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    padding: "2px 4px",
    margin: 10,
    display: "flex",
    alignItems: "center"
    // width: 350
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: "1.5rem",
    fontFamily: "Oswald"
  },
  iconButton: {
    padding: 10,
    fontSize: "1.4rem",
    color: "#FCFCFB",
    border: "2px solid #5E366A",
    backgroundColor: "#5E366A",
    "&:hover": {
      backgroundColor: "white",
      color: "#545454"
    }
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

class TraineeSearch extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search by Email"
            type="text"
            onChange={this.props.updateTraineeSearch}
            name="searchInput"
            value={this.props.traineeSearchInput}
            inputProps={{ "aria-label": "Search Google Maps" }}
          />
          <Divider className={classes.divider} />
          <IconButton
            className={classes.iconButton}
            aria-label="Search"
            onClick={this.props.getUserData}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(TraineeSearch);
