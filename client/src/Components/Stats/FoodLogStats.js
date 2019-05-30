import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { getDayDataByMealCat } from "../../util/getCal";
import { getDailyData } from "../../util/getDailyData";

class WeekFoodLogStats extends Component {
  state = {
    entries: [],
    labels: [],
    lines: []
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
    const { foodEntries } = this.props;
    if (this.props.days === 1) {
      const labels = ["Breakfast", "Lunch", "Snack", "Dinner"];
      const data = getDailyData(foodEntries, this.props.data);
      console.log({ data });
      if (data.filter(ele => ele !== 0).length > 0) this.setState({ entries: data, labels: labels });
    }
    // const lines = [];
    // let day = Date.now();
    // for (let i = 0; i < Number(this.props.days); i++) {
    //   lines.push(day);
    //   day = day - 86400000;
    // }
    // const breakfastCalories = [];
    // const lunchCalories = [];
    // const dinnerCalories = [];
    // const snackCalories = [];
    // for (let i = 0; i < Number(this.props.days); i++) {
    //   breakfastCalories.push(getDayDataByMealCat(foodEntries, "Breakfast", "caloriesPerServ", lines[i]));
    //   lunchCalories.push(getDayDataByMealCat(foodEntries, "Lunch", "caloriesPerServ", lines[i]));
    //   dinnerCalories.push(getDayDataByMealCat(foodEntries, "Dinner", "caloriesPerServ", lines[i]));
    //   snackCalories.push(getDayDataByMealCat(foodEntries, "Snack", "caloriesPerServ", lines[i]));
    // }
    // this.setState({
    //   entries: [
    //     { meal: "Breakfast", cal: breakfastCalories },
    //     { meal: "Lunch", cal: lunchCalories },
    //     { meal: "Dinner", cal: dinnerCalories },
    //     { meal: "Snack", cal: snackCalories }
    //   ],
    //   lines: lines
    // });
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

    // const { lines } = this.state;
    // const meals = this.state.entries.map(entry => entry.meal);
    // const graphs = [];
    // for (let i = 0; i < Number(this.props.days); i++) {
    //   const calories = this.state.entries.map(entry => entry.cal[i]);
    //   if (calories.filter(cal => cal !== 0).length !== 0)
    //     graphs.push({ label: new Date(lines[i]).toDateString(), data: calories });
    // }
    // const datasets = graphs.map((line, i) => {
    //   const lineColor = this.makeRandomColor();
    //   return {
    //     label: line.label,
    //     backgroundColor: lineColor,
    //     borderColor: lineColor,
    //     pointRadius: 6,
    //     fill: "false",
    //     data: line.data
    //   };
    // });

    // const data = {
    //   labels: meals,
    //   datasets: datasets
    // };
    console.log("entries: ", this.state.entries);
    const label = new Date().toDateString();
    const lineColor = this.makeRandomColor();
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
    const message = Number(this.props.days) !== 1 ? "the last " + this.props.days + " days" : "today";

    return (
      <div className={classes.root}>
        <h2 className={classes.header}>
          {this.props.data === "caloriesPerServ" ? "Calories" : this.props.data} for {message}
        </h2>
        {this.state.entries.length !== 0 ? (
          <Grid container justify='center' alignItems='center'>
            {/*   <Grid item xs={4} className={classes.caloriesInfo}>
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
          </Grid> */}
            <Grid item xs={8} className={classes.graph}>
              <h2>{this.props.data} / Meal Category</h2>
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
