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
    marginTop: 20,
    padding: 15,
    fontFamily: "Oxygen"
  },
  dataGroup: {
    fontSize: "2rem",
    display: "flex",
    flexDirection: "column"
  },
  label: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    marginRight: 15,
    fontFamily: "Oxygen",
    color: "#3685B5"
  },
  data: {
    fontSize: "2rem",
    width: "90%",
    fontFamily: "Oxygen"
  },
  textField: {
    fontSize: "2rem",
    width: "90%",
    margin: "0 10px",
    fontFamily: "Oxygen"
  },
  manyDaysGroup: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20
  },
  manyDaysBtn: {
    fontSize: "1.7rem",
    color: "#FCFCFB",
    margin: "0 10px",
    border: "2px solid #F4B4C3",
    backgroundColor: "#F4B4C3",
    padding: "5px 8px",
    "&:hover": {
      backgroundColor: "#2196F3",
      borderColor: "#2196F3"
    },
    fontFamily: "Oxygen"
  },
  tooltip: {
    fontSize: "1.8rem",
    // color: "white",
    backgroundColor: "#F4B4C3"
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
      if (currentUser.userType === "basic") tooltipTitle = "Please upgrade to access report";
    }
    return (
      <Grid container justify='center' alignItems='center' className={classes.root}>
        <Grid item md={4} xs={6}>
          <div className={classes.dataGroup}>
            <InputLabel className={classes.label} htmlFor='data'>
              Stats
            </InputLabel>
            <Select
              className={classes.data}
              value={manyDays === 1 && selectValue === "weight" ? "caloriesPerServ" : selectValue}
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
            </Select>
          </div>
        </Grid>
        <Grid item md={4} xs={6}>
          <TextField
            onChange={this.handleDayChange}
            id='date'
            label='Pick a day'
            type='date'
            value={dayValue}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: "2rem", color: "#3685B5", fontFamily: "Oxygen" }
            }}
            inputProps={{
              style: { fontSize: "2rem", lineHeight: "1.5", marginTop: "12px" }
            }}
            margin='normal'
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
                <Tooltip TransitionComponent={Zoom} title={tooltipTitle} classes={{ tooltip: classes.tooltip }}>
                  <div>
                    <Button
                      disabled={userType === "basic" || this.state.manyDays === 30}
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
                <Tooltip TransitionComponent={Zoom} title={tooltipTitle} classes={{ tooltip: classes.tooltip }}>
                  <div>
                    <Button
                      disabled={userType === "basic" || this.state.manyDays === 365}
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
