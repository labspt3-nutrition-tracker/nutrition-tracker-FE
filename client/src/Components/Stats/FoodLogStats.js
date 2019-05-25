import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { Bar } from "react-chartjs-2";

class FoodLogStats extends React.Component {
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
    const breakfastCalories = this.getCaloriesByMealCat(foodEntries, "Breakfast");
    const lunchCalories = this.getCaloriesByMealCat(foodEntries, "Lunch");
    const dinnerCalories = this.getCaloriesByMealCat(foodEntries, "Dinner");
    const snackCalories = this.getCaloriesByMealCat(foodEntries, "Snack");
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
    const { classes } = this.props;
    const calories = this.state.entries.map(entry => entry.cal);
    const meals = this.state.entries.map(entry => entry.meal);
    const total = calories.reduce((total, cal) => total + cal, 0);

    const data = {
      labels: meals,
      datasets: [
        {
          label: "Calories",
          backgroundColor: "#2196F3",
          borderColor: "#176AE3",
          borderWidth: 2,
          hoverBorderColor: "#176AE3",
          data: calories
        }
      ]
    };

    return (
      <div className={classes.root}>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={3} className={classes.caloriesInfo}>
            {this.state.entries.map(entry => (
              <div key={entry.meal} class={classes.info}>
                <span className={classes.title}>{entry.meal}</span>
                <div className={classes.value}>{entry.cal}</div>
              </div>
            ))}
            <div class={classes.info}>
              <span className={classes.title}>Total:</span>
              <div className={classes.value}>{total}</div>
            </div>
          </Grid>
          <Grid item xs={9} className={classes.graph}>
            <h2>Calories / Meal Category</h2>
            <Bar
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
  getCaloriesByMealCat = (entries, filter) => {
    return entries
      .filter(entry => {
        const today = new Date().toDateString();
        const date = new Date(entry.date).toDateString();
        return date === today;
      })
      .filter(entry => entry.meal_category_id.mealCategoryName === filter)
      .map(entry => entry.servingQty * entry.food_id.caloriesPerServ)
      .reduce((total, cal) => total + cal, 0);
  };
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
    height: "400px"
  },
  graph: {
    border: "1px solid #0826EA",
    padding: "20px"
  },
  title: {
    fontSize: "2.5rem",
    color: "#0826EA"
  },
  value: {
    marginTop: "10px",
    fontSize: "2rem"
  }
});

export default withStyles(styles)(FoodLogStats);
