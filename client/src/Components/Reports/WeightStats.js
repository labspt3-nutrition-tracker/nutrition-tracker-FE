import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { defaults } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import { Line } from "react-chartjs-2";
import * as moment from "moment";

import { getWeights } from "../../util/getWeights";
import { makeRandomColor } from "../../util/makeRandomColor";

class WeightStats extends Component {
  state = {
    entries: [],
    labels: []
  };

  componentDidMount = () => {
    this.updateEntries();
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.weightEntries !== this.props.weightEntries ||
      prevProps.days !== this.props.days
    )
      this.updateEntries();
  };

  updateEntries = () => {
    const { weightEntries, initialWeight } = this.props;
    let { days } = this.props;
    if (days.length > 7 && days.length <= 30) {
      days = days.filter((day, i) => i % 3 === 0);
    } else if (days.length >= 90) {
      days = days.filter((day, i) => i % 30 === 0);
    }
    const entries = getWeights(weightEntries, days, initialWeight);
    this.setState({ entries: entries, labels: days });
  };
  render() {
    defaults.global.defaultFontColor = "#60B5A9";
    defaults.global.defaultFontFamily = "Oswald";
    const { classes, initialWeight, days } = this.props;
    const { entries } = this.state;
    const labels = this.state.labels.map(day => moment(day).format("MM/DD"));
    if (initialWeight) {
      labels.unshift("Day 1");
      entries.unshift(initialWeight);
    }
    const lineColor = makeRandomColor();
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Weight",
          backgroundColor: lineColor,
          borderColor: lineColor,
          pointRadius: 6,
          fill: "false",
          data: entries
        }
      ]
    };

    return (
      <div className={classes.root}>
        <h2 className={classes.header}>
          Weight for the last{" "}
          {days.length === 365 ? "Year" : days.length + " days"}
        </h2>
        {this.state.entries.length !== 0 ? (
          <Grid container justify="center" alignItems="center">
            <Grid item md={3} xs={12}>
              {this.state.entries.map((entry, i) => (
                <div key={labels[i]} className={classes.dataInfo}>
                  <span className={classes.title}>
                    {labels[i] !== "Day 1"
                      ? moment(new Date(labels[i])).format("MMM Do")
                      : labels[i]}
                  </span>
                  <div className={classes.value}>
                    {entry === 0 ? "No Entry" : entry.toFixed(2)}
                  </div>
                </div>
              ))}
            </Grid>
            <Grid item md={9} xs={12} className={classes.graph}>
              <Line
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
    margin: "30px auto",
    maxWidth: "1200px",
    padding: "20px"
  },
  graph: {
    border: "3px solid #5E366A",
    padding: "20px",
    marginTop: 10
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#545454",
    textTransform: "uppercase",
    fontFamily: "Oswald"
  },
  title: {
    color: "#60B5A9",
    fontSize: "1.8rem",
    width: "50%",
    fontFamily: "Oswald"
  },
  value: {
    fontSize: "1.8rem",
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

export default withStyles(styles)(WeightStats);
