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
    if (prevProps.weightEntries !== this.props.weightEntries || prevProps.days !== this.props.days)
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
    defaults.global.defaultFontColor = "#2196F3";
    const { classes, initialWeight, days } = this.props;
    const labels = this.state.labels.map(day => moment(day).format("MM/DD"));
    labels.unshift("Day 1");
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
          data: [initialWeight, ...this.state.entries]
        }
      ]
    };

    return (
      <div className={classes.root}>
        <h2 className={classes.header}>Weight for the last {days.length === 365 ? "Year" : days.length + " days"}</h2>
        {this.state.entries.length !== 0 ? (
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={3}>
              {this.state.entries.map((entry, i) => (
                <div key={labels[i]} className={classes.dataInfo}>
                  <span className={classes.title}>{moment(new Date(labels[i])).format("MMM Do")}</span>
                  <div className={classes.value}>{entry === 0 ? "No Entry" : entry.toFixed(2)}</div>
                </div>
              ))}
            </Grid>
            <Grid item xs={9} className={classes.graph}>
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
    fontSize: "2.8rem",
    marginBottom: "20px",
    color: "#3685B5",
    textTransform: "uppercase",
    fontFamily: "Oxygen"
  },
  title: {
    color: "#2196F3",
    fontSize: "2rem",
    width: "40%",
    fontFamily: "Oxygen"
  },
  value: {
    margin: "10px 0",
    fontSize: "1.8rem",
    paddingLeft: "10px",
    fontFamily: "Oxygen"
  },
  dataInfo: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
    // borderBottom: "1px solid #F4B4C3"
  }
});

export default withStyles(styles)(WeightStats);
