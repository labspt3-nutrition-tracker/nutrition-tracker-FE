import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as moment from "moment";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "10px",
    flexGrow: 1
  },
  tab: {
    fontSize: "2rem",
    color: "#2196F3"
  },
  dataGroup: {
    fontSize: "2rem",
    display: "flex",
    flexDirection: "column",
    width: "20%"
  },
  label: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#2196F3"
  },
  data: {
    fontSize: "2rem"
  },
  textField: {
    fontSize: "2rem",
    margin: 0
  },
  manyDaysGroup: {
    display: "flex"
  },
  manyDaysBtn: {
    fontSize: "2rem",
    color: "#2196F3",
    margin: "0 10px"
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
    const days = [];
    let day = Date.now();
    for (let i = 0; i < numOfDays; i++) {
      days.push(day);
      day = day - 86400000;
    }
    this.props.chartChange(days);
  };

  handleDataChange = event => {
    this.setState({ selectValue: event.target.value });
    this.props.dataChange(event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { selectValue, dayValue } = this.state;
    return (
      <Paper className={classes.root}>
        <div className={classes.dataGroup}>
          <InputLabel className={classes.label} htmlFor='data'>
            Stats
          </InputLabel>
          <Select
            className={classes.data}
            value={selectValue}
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
          </Select>
        </div>
        <div className={classes.dataGroup}>
          <TextField
            onChange={this.handleDayChange}
            id='date'
            label='Pick a day'
            type='date'
            value={dayValue}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: "2rem", color: "#2196F3" }
            }}
            inputProps={{
              style: { fontSize: "2rem", lineHeight: "1.5", marginTop: "12px" }
            }}
            margin='normal'
          />
        </div>
        <div className={classes.manyDaysGroup}>
          <Button
            disabled={this.state.manyDays === 7}
            className={classes.manyDaysBtn}
            onClick={() => this.handleManyDaysChange(7)}
          >
            Last 7 Days
          </Button>
          <Button
            disabled={this.state.manyDays === 30}
            className={classes.manyDaysBtn}
            onClick={() => this.handleManyDaysChange(30)}
          >
            Last 30 Days
          </Button>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(StatsDashboard);
