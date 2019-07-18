import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    padding: 10,
    margin: 10
  },
  title: {
    fontSize: "1.7rem",
    color: "#FCFCFB",
    border: "2px solid #5E366A",
    backgroundColor: "#5E366A",
    padding: 10
  },
  button: {
    padding: "5px 10px",
    margin: "0 10px",
    fontSize: "1.2rem",
    color: "#FCFCFB",
    border: "2px solid #5E366A",
    backgroundColor: "#5E366A",
    "&:hover": {
      backgroundColor: "white",
      color: "#545454"
    },
    "&:disabled": {
      cursor: "not-allowed"
    }
  },
  upgrade: {
    color: "#40a798",
    fontSize: "1.4rem"
  }
});

const TraineeResult = props => {
  const { classes } = props;
  return (
    <>
      <Paper className={classes.root}>
        <Typography
          align="center"
          gutterBottom
          variant="h3"
          classes={{ root: classes.title }}
        >
          Search Result
        </Typography>
        {!props.traineeSearchResults ? (
          <Typography gutterBottom variant="h5">
            Please enter a valid email in the search field.
          </Typography>
        ) : (
          <>
            <Typography gutterBottom variant="h3">
              {`${props.traineeSearchResults.firstName} ${
                props.traineeSearchResults.lastName
              }`}
            </Typography>
            <Typography gutterBottom variant="h4">
              {`${props.traineeSearchResults.email}`}
            </Typography>
            <Button
              className={classes.button}
              aria-label="Follow"
              disabled={
                props.trainees.length === 1 &&
                props.currentUser.userType !== "coach"
              }
              onClick={props.request}
            >
              Request to follow
            </Button>
            {props.trainees.length === 1 &&
              props.currentUser.userType !== "coach" && (
                <>
                  <Typography
                    gutterBottom
                    variant="h4"
                    classes={{ root: classes.upgrade }}
                  >
                    Please <Link to="/billing">Upgrade</Link> to Coach to follow
                    more than one person.
                  </Typography>
                </>
              )}
          </>
        )}
      </Paper>
    </>
  );
};

export default withStyles(styles)(TraineeResult);
