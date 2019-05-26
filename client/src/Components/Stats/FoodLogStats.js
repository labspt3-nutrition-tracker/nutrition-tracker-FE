import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { calFunctions } from "../../util/getCal";

class WeekFoodLogStats extends Component {
  state = {
    entries: [],
    lines: []
  };

  componentDidMount = () => {
    this.updateEntries();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.foodEntries !== this.props.foodEntries || prevProps.days !== this.props.days) this.updateEntries();
  };

  updateEntries = () => {
    const lines = [];
    let day = Date.now();
    for (let i = 0; i < Number(this.props.days); i++) {
      lines.push(day);
      day = day - 86400000;
    }
    const { foodEntries } = this.props;
    const breakfastCalories = [];
    const lunchCalories = [];
    const dinnerCalories = [];
    const snackCalories = [];
    for (let i = 0; i < Number(this.props.days); i++) {
      breakfastCalories.push(calFunctions.getDayCalByMealCat(foodEntries, "Breakfast", lines[i]));
      lunchCalories.push(calFunctions.getDayCalByMealCat(foodEntries, "Lunch", lines[i]));
      dinnerCalories.push(calFunctions.getDayCalByMealCat(foodEntries, "Dinner", lines[i]));
      snackCalories.push(calFunctions.getDayCalByMealCat(foodEntries, "Snack", lines[i]));
    }
    this.setState({
      entries: [
        { meal: "Breakfast", cal: breakfastCalories },
        { meal: "Lunch", cal: lunchCalories },
        { meal: "Dinner", cal: dinnerCalories },
        { meal: "Snack", cal: snackCalories }
      ],
      lines: lines
    });
  };

  makeRandomColor() {
    var c = "";
    while (c.length < 6) {
      c += Math.random()
        .toString(16)
        .substr(-6)
        .substr(-1);
    }
    return "#" + c;
  }

  render() {
    defaults.global.defaultFontColor = "#2196F3";
    const { classes } = this.props;

    const { lines } = this.state;
    const meals = this.state.entries.map(entry => entry.meal);
    const graphs = [];
    for (let i = 0; i < Number(this.props.days); i++) {
      const calories = this.state.entries.map(entry => entry.cal[i]);
      if (calories.filter(cal => cal !== 0).length !== 0)
        graphs.push({ label: new Date(lines[i]).toDateString(), data: calories });
    }
    const datasets = graphs.map((line, i) => {
      const lineColor = this.makeRandomColor();
      return {
        label: line.label,
        backgroundColor: lineColor,
        borderColor: lineColor,
        pointRadius: 6,
        fill: "false",
        data: line.data
      };
    });

    const data = {
      labels: meals,
      datasets: datasets
    };
    const message = Number(this.props.days) !== 1 ? "the last " + this.props.days + " days" : "today";

    return (
      <div className={classes.root}>
        <h2 className={classes.header}>Calories for {message}</h2>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={4} className={classes.caloriesInfo}>
            {this.state.entries.map(entry => (
              <div key={entry.meal}>
                <span className={classes.title}>{entry.meal}</span>
                <div className={classes.value}>
                  {entry.cal.length === 0 ? (
                    "No Calories Entry"
                  ) : (
                    <>
                      {entry.cal.map((cal, i) => (
                        <div key={cal + i}>
                          {cal !== 0 && (
                            <div className={classes.value}>
                              - {new Date(lines[i]).toDateString()}: {cal} kcal
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </Grid>
          <Grid item xs={8} className={classes.graph}>
            <h2>Calories / Meal Category</h2>
            <Line
              ref='chart'
              data={data}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        min: 0,
                        stepSize: 100
                      }
                    }
                  ]
                }
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    margin: "50px auto",
    maxWidth: "1200px"
  },
  caloriesInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    minHeight: "300px",
    fontSize: "2rem"
  },
  header: {
    textAlign: "center",
    fontSize: "3.5rem",
    marginBottom: "20px",
    color: "#2196F3"
  },
  graph: {
    border: "3px solid #F4B4C3",
    padding: "20px"
  },
  title: {
    color: "#2196F3",
    fontSize: "2.5rem"
  },
  day: {},
  value: {
    margin: "10px 0"
  }
});

export default withStyles(styles)(WeekFoodLogStats);
