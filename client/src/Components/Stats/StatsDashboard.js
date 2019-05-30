import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  }
});

function StatsDashboard(props) {
  const { classes } = props;
  const [selectValue, setSelectValue] = React.useState("caloriesPerServ");
  const [dayValue, setDayValue] = React.useState(1);

  function handleDayChange(event, newValue) {
    setDayValue(newValue);
    props.chartChange(newValue);
  }

  function handleDataChange(event, newValue) {
    setSelectValue(event.target.value);
    props.dataChange(event.target.value);
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.dataGroup}>
        <InputLabel className={classes.label} htmlFor='data'>
          Data
        </InputLabel>
        <Select className={classes.data} value={selectValue} onChange={handleDataChange} inputProps={{ id: "data" }}>
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
      <Tabs value={dayValue} onChange={handleDayChange} indicatorColor='primary' textColor='primary' centered>
        <Tab label='Day' value={1} className={classes.tab} />
        <Tab label='Week' value={7} className={classes.tab} />
      </Tabs>
    </Paper>
  );
}

export default withStyles(styles)(StatsDashboard);
