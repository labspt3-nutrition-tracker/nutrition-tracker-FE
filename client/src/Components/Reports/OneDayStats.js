import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import * as moment from "moment";

import { getDailyData } from "../../util/getDailyData";
import { makeRandomColor } from "../../util/makeRandomColor";

class WeekFoodLogStats extends Component {
  state = {
    entries: [],
    labels: ["Breakfast", "Lunch", "Snack", "Dinner"]
  };

  componentDidMount = () => {
    this.updateEntries();
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.foodEntries !== this.props.foodEntries ||
      prevProps.days !== this.props.days ||
      prevProps.data !== this.props.data
    )
      this.updateEntries();
  };

  updateEntries = () => {
    const { foodEntries, days } = this.props;
    let { data } = this.props;
    if (data === "weight") data = "caloriesPerServ";
    if (data === "exercise") data = "caloriesPerServ";
    const entries = getDailyData(foodEntries, data, days[0]);
    this.setState({ entries: entries });
  };

  render() {
    defaults.global.defaultFontColor = "#60B5A9";
    defaults.global.defaultFontFamily = "Oswald";
    const { classes } = this.props;
    const label = moment(this.props.days[0]).format("MMM Do YYYY");
    const lineColor = makeRandomColor();
    const data = {
      labels: this.state.labels,
      datasets: [
        {
          label: label,
          backgroundColor: lineColor,
          borderColor: lineColor,
          pointRadius: 6,
          fill: "false",
          data: this.state.entries
        }
      ]
    };
    return (
      <div className={classes.root}>
        <h2 className={classes.header}>
          {this.props.data === "caloriesPerServ" ? "Calories" : this.props.data} for{" "}
          {moment(this.props.days[0]).format("MMMM Do YYYY")}
        </h2>
        {this.state.entries.length !== 0 ? (
          <Grid container justify='center' alignItems='center'>
            <Grid item md={3} xs={12}>
              {this.state.entries.map((entry, i) => (
                <div key={this.state.labels[i]} className={classes.dataInfo}>
                  <span className={classes.title}>{this.state.labels[i]}</span>
                  <div className={classes.value}>{entry === 0 ? "No Entry" : entry.toFixed(2)}</div>
                </div>
              ))}
              <div className={classes.dataInfo}>
                <span className={classes.title}>
                  Total {this.props.data === "caloriesPerServ" ? "Calories" : this.props.data}
                </span>
                <div className={classes.value}>{this.state.entries.reduce((total, d) => total + d, 0).toFixed(2)}</div>
              </div>
            </Grid>
            <Grid item md={9} xs={12} className={classes.graph}>
              <h2>{this.props.data === "caloriesPerServ" ? "Calories" : this.props.data} / Meal Category</h2>
              <Line ref='chart' data={data} />
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
    margin: "30px auto",
    maxWidth: "1200px",
    padding: "20px"
  },

  header: {
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#545454",
    textTransform: "uppercase",
    fontFamily: "Oswald"
  },
  graph: {
    border: "3px solid #5E366A",
    padding: "20px",
    marginTop: 10
  },
  title: {
    color: "#60B5A9",
    fontSize: "1.4rem",
    width: "50%",
    fontFamily: "Oswald"
  },
  value: {
    fontSize: "1.4rem",
    paddingLeft: "10px",
    fontFamily: "Oswald"
  },
  dataInfo: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "15px 0"
  }
});

export default withStyles(styles)(WeekFoodLogStats);
