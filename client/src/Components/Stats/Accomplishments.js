import React, { Component } from "react";
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
    goals: []
  };
  componentDidMount = async () => {
    const { currentUser, foodEntries } = this.props;
    const days = await getLastXDays(7);
    const totalCalories = await getTotalData(foodEntries, "caloriesPerServ", days);
    const goals = getGoalReached(currentUser, totalCalories);
    this.setState({ days: days, goals: goals });
  };
  render() {
    const { classes, currentUser } = this.props;
    let { days, goals } = this.state;
    days = days.map(day => moment(day).format("MM/DD"));
    const success = goals.map((goal, i) => (goal === 1 ? days[i] : goal)).filter(day => day !== 0 && day !== -1);
    const warnings = goals.map((goal, i) => (goal === -1 ? days[i] : goal)).filter(day => day !== 0 && day !== 1);
    return (
      <div className={classes.root}>
        <h2 className={classes.title}>
          Last 7 days: {days[0]} - {days[6]}
        </h2>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} variant='h5' component='h2'>
                  GOALS REACHED
                </Typography>
                <Typography color='textSecondary' className={classes.category}>
                  WEIGHT
                </Typography>
                <Typography className={classes.pos} variant='body2' component='p'>
                  You have lost 3 pounds.
                </Typography>
                {success.length > 0 && (
                  <>
                    <Typography color='textSecondary' className={classes.category}>
                      CALORIES
                    </Typography>
                    <Typography className={classes.pos} variant='body2' component='p'>
                      You have stayed under your calories goal of {currentUser.calorieGoal} on these days:
                    </Typography>
                    <ul>
                      {success.map((day, i) => (
                        <li key={i}>{moment(day).format("dddd MMM DD")}</li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
              <CardActions>
                <Button size='medium'>Update Goals</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} variant='h5' component='h2'>
                  ACCOMPLISHMENTS
                </Typography>
                <Typography color='textSecondary' className={classes.category}>
                  EXERCISE
                </Typography>
                <Typography className={classes.pos} variant='body2' component='p'>
                  You exercised every day. You burned 2500 kcal.
                </Typography>
                <Typography color='textSecondary' className={classes.category}>
                  WATER
                </Typography>
                <Typography className={classes.pos} variant='body2' component='p'>
                  You consumed the recommended 11 cups of water.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='medium'>Update Goals</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} variant='h5' component='h2'>
                  WARNINGS
                </Typography>
                <Typography color='textSecondary' className={classes.category}>
                  CALORIES
                </Typography>
                {warnings.length > 0 && (
                  <>
                    <Typography className={classes.pos} variant='body2' component='p'>
                      You consumed more that your daily goal of calories ({currentUser.calorieGoal}) on these days:
                    </Typography>
                    <ul>
                      {warnings.map((day, i) => (
                        <li key={i}>{moment(day).format("dddd MMM DD")}</li>
                      ))}
                    </ul>
                  </>
                )}
                <Typography color='textSecondary' className={classes.category}>
                  PROTEINS
                </Typography>
                <Typography className={classes.pos} variant='body2' component='p'>
                  You need to eat more proteins during the day.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='medium'>Update Goals</Button>
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
    margin: "50px auto",
    maxWidth: "1200px",
    padding: "20px"
  },
  card: {
    height: "500px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: "2rem",
    marginBottom: 20,
    color: "#2196F3",
    textAlign: "center"
  },
  category: {
    fontSize: "1.7rem",
    color: "#2196F3"
  },
  pos: {
    fontSize: "1.5rem",
    marginBottom: 12
  }
});

export default withStyles(styles)(Accomplishments);
