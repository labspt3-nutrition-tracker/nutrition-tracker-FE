import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import * as moment from "moment";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
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
    width: "30%"
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
    width: "60%",
    margin: 0
  }
});

class StatsDashboard extends React.Component {
  state = {
    dayValue: moment().format("YYYY-MM-DD"),
    selectValue: "caloriesPerServ"
  };

  handleDayChange = event => {
    this.setState({ dayValue: event.target.value });
    const days = [];
    days.push(event.target.value);
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
              style: { fontSize: "2rem", padding: "5px", lineHeight: "1.5", marginTop: "12px" }
            }}
            margin='normal'
          />
        </div>
        {/* <Tabs value={dayValue} onChange={handleDayChange} indicatorColor='primary' textColor='primary' centered>
        <Tab label='Day' value={1} className={classes.tab} />
        <Tab label='Week' value={7} className={classes.tab} />
      </Tabs> */}
      </Paper>
    );
  }
}

export default withStyles(styles)(StatsDashboard);
