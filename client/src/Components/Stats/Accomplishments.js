import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import * as moment from "moment";

import { getLastXDays } from "../../util/getLastXDays";
import { getTotalData } from "../../util/getTotalData";
import { getGoalReached } from "../../util/getGoalReached";

class Accomplishments extends Component {
  state = {
    days: [],
    goals: [],
    weights: []
  };
  componentDidMount = async () => {
    const { currentUser, foodEntries, weightEntries } = this.props;
    const days = await getLastXDays(7);
    const totalCalories = await getTotalData(foodEntries, "caloriesPerServ", days);
    const goals = getGoalReached(currentUser, totalCalories);
    let weights = days.map(day =>
      weightEntries.find(entry => moment(new Date(entry.date)).format("MM/DD/YY") === moment(day).format("MM/DD/YY"))
    );
    weights = weights.filter(weight => weight !== undefined).map(entry => entry.weight);
    this.setState({ days: days, goals: goals, weights: weights });
  };
  render() {
    const { classes, currentUser } = this.props;
    const { days, goals, weights } = this.state;
    // days = days.map(day => moment(day).format("MM/DD"));
    const success = goals.map((goal, i) => (goal === 1 ? days[i] : goal)).filter(day => day !== 0 && day !== -1);
    const warnings = goals.map((goal, i) => (goal === -1 ? days[i] : goal)).filter(day => day !== 0 && day !== 1);
    const noEntries = goals.map((goal, i) => (goal === 0 ? days[i] : goal)).filter(day => day !== -1 && day !== 1);
    const weightDiff = weights.length > 0 ? weights[0] - weights[weights.length - 1] : 0;
    const initialWeightDiff = currentUser.weight ? currentUser.weight - weights[weights.length - 1] : null;
    return (
      <div className={classes.root}>
        <h2 className={classes.week}>
          Last 7 days: {moment(days[0]).format("MM/DD")} - {moment(days[6]).format("MM/DD")}
        </h2>
        <Grid container justify='center' alignItems='center'>
          <Grid item md={6} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} variant='h5' component='h2'>
                  GOALS REACHED
                </Typography>
                {success.length > 0 && (
                  <>
                    <Typography color='textSecondary' className={classes.category}>
                      CALORIES
                    </Typography>
                    <Typography className={classes.pos} variant='body2' component='p'>
                      You have stayed under your calories goal of {currentUser.calorieGoal} on these days:
                    </Typography>
                    <ul className={classes.list}>
                      {success.map((day, i) => (
                        <li className={classes.listItem} key={i}>
                          {moment(day).format("dddd MMM DD")}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
              <CardActions>
                <Link className={classes.link} to={"/settings"}>
                  Update your settings
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} variant='h5' component='h2'>
                  ACCOMPLISHMENTS
                </Typography>
                {weightDiff >= 0 && (
                  <>
                    <Typography color='textSecondary' className={classes.category}>
                      WEIGHT
                    </Typography>
                    <Typography className={classes.pos} variant='body2' component='p'>
                      You have lost {weightDiff} pounds in the last 7 days. (from {weights[0]} to{" "}
                      {weights[weights.length - 1]}).
                    </Typography>
                    {initialWeightDiff > 0 && (
                      <Typography className={classes.pos} variant='body2' component='p'>
                        You have lost {initialWeightDiff} pounds from your initial weight of {currentUser.weight}.
                      </Typography>
                    )}
                  </>
                )}
                <Typography color='textSecondary' className={classes.category}>
                  EXERCISE
                </Typography>
                <Typography className={classes.pos} variant='body2' component='p'>
                  You exercised every day. You burned 2500 kcal.
                </Typography>
              </CardContent>
              <CardActions>
                <Link className={classes.link} to={"/settings"}>
                  Update your settings
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  variant='h5'
                  component='h2'
                  style={{ borderBottom: "2px solid #F4B4C3" }}
                >
                  WARNINGS
                </Typography>
                {warnings.length > 0 && (
                  <>
                    <Typography color='textSecondary' className={classes.category}>
                      CALORIES
                    </Typography>
                    <Typography className={classes.pos} variant='body2' component='p'>
                      You consumed more that your daily goal of calories ({currentUser.calorieGoal}) on these days:
                    </Typography>
                    <ul className={classes.list}>
                      {warnings.map((day, i) => (
                        <li className={classes.listItem} key={i}>
                          {moment(day).format("dddd MMM DD")}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {weightDiff < 0 && (
                  <>
                    <Typography color='textSecondary' className={classes.category}>
                      WEIGHT
                    </Typography>
                    <Typography className={classes.pos} variant='body2' component='p'>
                      You have gained {-weightDiff} pounds in the last 7 days. (from {weights[0]} to{" "}
                      {weights[weights.length - 1]}).
                    </Typography>
                    {initialWeightDiff < 0 && (
                      <Typography className={classes.pos} variant='body2' component='p'>
                        You have gained {-initialWeightDiff} pounds from your initial weight of {currentUser.weight}.
                      </Typography>
                    )}
                  </>
                )}
                {noEntries.length > 0 && (
                  <>
                    <Typography color='textSecondary' className={classes.category}>
                      No calories Entry
                    </Typography>
                    <Typography className={classes.pos} variant='body2' component='p'>
                      You didn't record any food entry on these days:
                    </Typography>
                    <ul className={classes.list}>
                      {noEntries.map((day, i) => (
                        <li className={classes.listItem} key={i}>
                          {moment(day).format("dddd MMM DD")}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <Typography color='textSecondary' className={classes.category}>
                  No Exercise Entry
                </Typography>
                <Typography className={classes.pos} variant='body2' component='p'>
                  You didn't record any exercise entry on these days:
                </Typography>
              </CardContent>
              <CardActions>
                <Link className={classes.link} to={"/settings"}>
                  Update your settings
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    margin: "20px auto",
    maxWidth: "1200px",
    padding: "20px"
  },
  card: {
    minHeight: "350px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  week: {
    fontSize: "2rem",
    marginBottom: 20,
    color: "#3685B5",
    textAlign: "center",
    fontFamily: "Oxygen"
  },
  title: {
    fontSize: "2rem",
    marginBottom: 20,
    color: "#3685B5",
    textAlign: "center",
    paddingBottom: 5,
    borderBottom: "2px solid #3685B5",
    fontFamily: "Oxygen"
  },
  category: {
    fontSize: "1.7rem",
    color: "#3685B5",
    marginTop: 10,
    fontFamily: "Oxygen"
  },
  pos: {
    fontSize: "1.7rem",
    marginBottom: 12,
    fontFamily: "Oxygen"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  listItem: {
    margin: 10,
    fontFamily: "Oxygen",
  },
  link: {
    textDecoration: "none",
    color: "#3685B5",
    fontFamily: "Oxygen"
  }
});

export default withStyles(styles)(Accomplishments);
