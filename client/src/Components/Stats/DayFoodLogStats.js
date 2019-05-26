import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { Line } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import { calFunctions } from "../../util/getCal";

class DayFoodLogStats extends React.Component {
  state = {
    entries: []
  };

  componentDidMount = () => {
    this.updateEntries();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.foodEntries !== this.props.foodEntries) this.updateEntries();
  };

  updateEntries = () => {
    const { foodEntries } = this.props;
    console.log(foodEntries);
    const breakfastCalories = calFunctions.getDayCalByMealCat(foodEntries, "Breakfast");
    const lunchCalories = calFunctions.getDayCalByMealCat(foodEntries, "Lunch");
    const dinnerCalories = calFunctions.getDayCalByMealCat(foodEntries, "Dinner");
    const snackCalories = calFunctions.getDayCalByMealCat(foodEntries, "Snack");
    this.setState({
      entries: [
        { meal: "Breakfast", cal: breakfastCalories },
        { meal: "Lunch", cal: lunchCalories },
        { meal: "Dinner", cal: dinnerCalories },
        { meal: "Snack", cal: snackCalories }
      ]
    });
  };

  render() {
    defaults.global.defaultFontColor = "#0826EA";
    const { classes } = this.props;

    const calories = this.state.entries.map(entry => entry.cal);
    const meals = this.state.entries.map(entry => entry.meal);
    const total = calories.reduce((total, cal) => total + cal, 0);

    const data = {
      labels: meals,
      datasets: [
        {
          label: "Calories",
          backgroundColor: "#F4B4C3",
          borderColor: "#2196F3",
          pointRadius: 6,
          fill: "false",
          data: calories
        }
      ]
    };

    return (
      <div className={classes.root}>
        <h2 className={classes.header}>{new Date().toDateString()}</h2>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={3} className={classes.caloriesInfo}>
            {this.state.entries.map(entry => (
              <div key={entry.meal}>
                <span className={classes.title}>{entry.meal}</span>
                <div className={classes.value}>{entry.cal} kcal</div>
              </div>
            ))}
            <div>
              <span className={classes.title}>Total:</span>
              <div className={classes.value}>{total} kcal</div>
            </div>
          </Grid>
          <Grid item xs={9} className={classes.graph}>
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
    maxWidth: "1000px"
  },
  caloriesInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: "400px",
    fontSize: "2.5rem"
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
    color: "#2196F3"
  },
  value: {
    marginTop: "10px"
  }
});

export default withStyles(styles)(DayFoodLogStats);
