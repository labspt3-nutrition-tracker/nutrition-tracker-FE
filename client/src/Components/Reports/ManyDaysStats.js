import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import * as moment from "moment";
import Grid from "@material-ui/core/Grid";
import { defaults } from "react-chartjs-2";

import { getTotalData } from "../../util/getTotalData";
import { makeRandomColor } from "../../util/makeRandomColor";

class ManyDaysStats extends Component {
  state = {
    entries: [],
    labels: []
  };

  componentDidMount = () => {
    this.updateEntries();
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.foodEntries !== this.props.foodEntries ||
      prevProps.days !== this.props.days ||
      prevProps.dataType !== this.props.dataType
    )
      this.updateEntries();
  };

  updateEntries = () => {
    const { foodEntries, dataType } = this.props;
    let { days } = this.props;
    if (days.length > 7 && days.length <= 30) {
      days = days.filter((day, i) => i % 3 === 0);
    } else if (days.length >= 90) {
      days = days.filter((day, i) => i % 30 === 0);
    }
    const entries = getTotalData(foodEntries, dataType, days);
    this.setState({ entries: entries, labels: days });
  };

  render() {
    defaults.global.defaultFontColor = "#3685B5";
    defaults.global.defaultFontFamily = "Oxygen";
    const { classes, days, dataType } = this.props;
    const labels = this.state.labels.map(day => moment(day).format("MM/DD"));
    const data = {
      labels: labels,
      datasets: [
        {
          label: dataType === "caloriesPerServ" ? "Calories" : dataType,
          backgroundColor: "#3685B5",
          borderColor: "#F4B4C3",
          borderWidth: 1,
          hoverBackgroundColor: "#3685B5",
          hoverBorderColor: makeRandomColor(),
          data: this.state.entries
        }
      ]
    };

    return (
      <div className={classes.root}>
        <h2 className={classes.header}>
          Total {dataType === "caloriesPerServ" ? "Calories" : dataType} for the last{" "}
          {days.length === 365 ? "Year" : days.length + " days"}
        </h2>
        {this.state.entries.length !== 0 ? (
          <Grid container justify='center' alignItems='center'>
            <Grid item md={3} xs={12}>
              {this.state.entries.map((entry, i) => (
                <div key={labels[i]} className={classes.dataInfo}>
                  <span className={classes.title}>{moment(new Date(labels[i])).format("MMM Do")}</span>
                  <div className={classes.value}>{entry === 0 ? "No Entry" : entry.toFixed(2)}</div>
                </div>
              ))}
            </Grid>
            <Grid item md={9} xs={12} className={classes.graph}>
              <Bar
                data={data}
                height={350}
                options={{
                  maintainAspectRatio: false
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <div> No data </div>
        )}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    margin: "50px auto",
    maxWidth: "1200px",
    padding: "20px"
  },
  graph: {
    border: "3px solid #F4B4C3",
    padding: "20px"
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#3685B5",
    textTransform: "uppercase",
    fontFamily: "Oxygen"
  },
  title: {
    color: "#3685B5",
    fontSize: "1.4rem",
    width: "40%",
    fontFamily: "Oxygen"
  },
  value: {
    margin: "10px 0",
    fontSize: "1.4rem",
    paddingLeft: "10px",
    fontFamily: "Oxygen"
  },
  dataInfo: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

export default withStyles(styles)(ManyDaysStats);
