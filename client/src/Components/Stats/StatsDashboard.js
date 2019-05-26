import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  tab: {
    fontSize: "2rem",
    color: "#2196F3"
  }
});

function StatsDashboard(props) {
  const { classes } = props;
  const [value, setValue] = React.useState("day");

  function handleChange(event, newValue) {
    setValue(newValue);
    props.chartChange(newValue);
  }

  return (
    <Paper className={classes.root}>
      <Tabs value={value} onChange={handleChange} indicatorColor='primary' textColor='primary' centered>
        <Tab label='Day' value='day' className={classes.tab} />
        <Tab label='Week' value='week' className={classes.tab} />
      </Tabs>
    </Paper>
  );
}

export default withStyles(styles)(StatsDashboard);
