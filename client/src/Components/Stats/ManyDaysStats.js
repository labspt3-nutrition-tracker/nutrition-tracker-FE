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
      prevProps.data !== this.props.data
    )
      this.updateEntries();
  };

  updateEntries = () => {
    const { foodEntries, data } = this.props;
    let { days } = this.props;
    if (days.length > 7 && days.length <= 30) {
      days = days.filter((day, i) => i % 3 === 0);
    }
    const entries = getTotalData(foodEntries, data, days);
    this.setState({ entries: entries, labels: days });
  };

  render() {
    defaults.global.defaultFontColor = "#2196F3";
    defaults.global.defaultFontFamily = "Oxygen";
    const { classes } = this.props;
    const labels = this.state.labels.map(day => moment(day).format("MM/DD"));
    const data = {
      labels: labels,
      datasets: [
        {
          label: this.props.data === "caloriesPerServ" ? "Calories" : this.props.data,
          backgroundColor: "#2196F3",
          borderColor: "#F4B4C3",
          borderWidth: 1,
          hoverBackgroundColor: "#2196F3",
          hoverBorderColor: makeRandomColor(),
          data: this.state.entries
        }
      ]
    };

    return (
      <div className={classes.root}>
        <h2 className={classes.header}>
          Total {this.props.data === "caloriesPerServ" ? "Calories" : this.props.data} for the last{" "}
          {this.props.days.length} days
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
    fontSize: "2.8rem",
    marginBottom: "20px",
    color: "#2196F3",
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
  }
});

export default withStyles(styles)(ManyDaysStats);
