import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import * as moment from "moment";
import Grid from "@material-ui/core/Grid";
import { defaults } from "react-chartjs-2";

import { getTotalData } from "../../util/getTotalData";

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
    defaults.global.defaultFontColor = "#60B5A9";
    defaults.global.defaultFontFamily = "Oswald";
    const { classes, days, dataType } = this.props;
    const labels = this.state.labels.map(day => moment(day).format("MM/DD"));
    const data = {
      labels: labels,
      datasets: [
        {
          label: dataType === "caloriesPerServ" ? "Calories" : dataType,
          backgroundColor: "#60B5A9",
          borderColor: "#60B5A9",
          borderWidth: 1,
          hoverBackgroundColor: "white",
          hoverBorderColor: "#60B5A9",
          data: this.state.entries
        }
      ]
    };

    return (
      <div className={classes.root}>
        <h2 className={classes.header}>
          Total {dataType === "caloriesPerServ" ? "Calories" : dataType} for the
          last {days.length === 365 ? "Year" : days.length + " days"}
        </h2>
        {this.state.entries.length !== 0 ? (
          <Grid container justify="center" alignItems="center">
            <Grid item md={3} xs={12}>
              {this.state.entries.map((entry, i) => (
                <div key={labels[i]} className={classes.dataInfo}>
                  <span className={classes.title}>
                    {moment(new Date(labels[i])).format("MMM Do")}
                  </span>
                  <div className={classes.value}>
                    {entry === 0 ? "No Entry" : entry.toFixed(2)}
                  </div>
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

export default withStyles(styles)(ManyDaysStats);
