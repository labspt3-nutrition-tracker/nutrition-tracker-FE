import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import * as moment from "moment";

import { getLastXDays } from "../../util/getLastXDays";

const styles = theme => ({
  root: {
    margin: "auto",
    marginTop: 20,
    padding: 15,
    fontFamily: "Oswald",
    maxWidth: "1200px"
  },
  dataGroup: {
    display: "flex",
    width: "85%",
    flexDirection: "column"
  },
  label: {
    fontSize: "1.3rem",
    marginBottom: "10px",
    marginRight: 15,
    fontFamily: "Oswald",
    color: "#60B5A9"
  },
  data: {
    fontSize: "1.6rem",
    fontFamily: "Oswald"
  },
  textField: {
    fontSize: "1.3rem",
    width: "95%",
    margin: "0 10px",
    fontFamily: "Oswald"
  },
  manyDaysGroup: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    margin: "auto",
    marginTop: 20
  },
  manyDaysBtn: {
    fontSize: "1.4rem",
    color: "#FCFCFB",
    border: "2px solid #5E366A",
    backgroundColor: "#5E366A",
    padding: "5px 8px",
    "&:hover": {
      backgroundColor: "white",
      color: "#545454"
    },
    fontFamily: "Oswald"
  },
  tooltip: {
    fontSize: "1.4rem",
    // color: "white",
    backgroundColor: "#60B5A9"
  }
});

class StatsDashboard extends React.Component {
  state = {
    dayValue: moment().format("YYYY-MM-DD"),
    selectValue: "caloriesPerServ",
    manyDays: 1
  };

  handleDayChange = event => {
    this.setState({ dayValue: event.target.value, manyDays: 1 });
    const days = [];
    days.push(event.target.value);
    this.props.chartChange(days);
  };

  handleManyDaysChange = numOfDays => {
    this.setState({ manyDays: numOfDays, dayValue: "" });
    const days = getLastXDays(numOfDays);
    this.props.chartChange(days);
  };

  handleDataChange = event => {
    this.setState({ selectValue: event.target.value });
    this.props.dataChange(event.target.value);
  };

  render() {
    const { classes, currentUser } = this.props;
    const { selectValue, dayValue, manyDays } = this.state;
    const userType = currentUser ? currentUser.userType : "basic";
    let tooltipTitle = "";
    if (currentUser) {
      if (currentUser.userType === "basic")
        tooltipTitle = "Please upgrade to access report";
    }
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item md={4} xs={6}>
          <div className={classes.dataGroup}>
            <InputLabel className={classes.label} htmlFor="data">
              Stats
            </InputLabel>
            <Select
              className={classes.data}
              value={
                manyDays === 1 &&
                (selectValue === "weight" || selectValue === "exercise")
                  ? "caloriesPerServ"
                  : selectValue
              }
              onChange={this.handleDataChange}
              inputProps={{ id: "data" }}
            >
              <MenuItem className={classes.data} value={"caloriesPerServ"}>
                Calories
              </MenuItem>
              <MenuItem className={classes.data} value={"carbs"}>
                Carbs
              </MenuItem>
              <MenuItem className={classes.data} value={"fats"}>
                Fats
              </MenuItem>
              <MenuItem className={classes.data} value={"proteins"}>
                Proteins
              </MenuItem>
              {this.state.manyDays > 1 && (
                <MenuItem className={classes.data} value={"weight"}>
                  weight
                </MenuItem>
              )}
              {this.state.manyDays > 1 && (
                <MenuItem className={classes.data} value={"exercise"}>
                  Exercise
                </MenuItem>
              )}
            </Select>
          </div>
        </Grid>
        <Grid item md={4} xs={6}>
          <TextField
            onChange={this.handleDayChange}
            id="date"
            label="Pick a day"
            type="date"
            value={dayValue}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
              style: {
                fontSize: "1.7rem",
                color: "#60B5A9",
                fontFamily: "Oswald"
              }
            }}
            inputProps={{
              style: {
                fontSize: "1.5rem",
                lineHeight: "1.5",
                marginTop: "12px"
              }
            }}
            margin="normal"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <div className={classes.manyDaysGroup}>
            <Button
              disabled={this.state.manyDays === 7}
              className={classes.manyDaysBtn}
              onClick={() => this.handleManyDaysChange(7)}
            >
              Last 7 Days
            </Button>
            <CloneProps>
              {tabProps => (
                <Tooltip
                  TransitionComponent={Zoom}
                  title={tooltipTitle}
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div>
                    <Button
                      disabled={
                        userType === "basic" || this.state.manyDays === 30
                      }
                      className={classes.manyDaysBtn}
                      onClick={() => this.handleManyDaysChange(30)}
                    >
                      Last 30 Days
                    </Button>
                  </div>
                </Tooltip>
              )}
            </CloneProps>
            <CloneProps>
              {tabProps => (
                <Tooltip
                  TransitionComponent={Zoom}
                  title={tooltipTitle}
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div>
                    <Button
                      disabled={
                        userType === "basic" || this.state.manyDays === 365
                      }
                      className={classes.manyDaysBtn}
                      onClick={() => this.handleManyDaysChange(365)}
                    >
                      Last Year
                    </Button>
                  </div>
                </Tooltip>
              )}
            </CloneProps>
          </div>
        </Grid>
      </Grid>
    );
  }
}

function CloneProps(props) {
  const { children, ...other } = props;
  return children(other);
}

export default withStyles(styles)(StatsDashboard);
