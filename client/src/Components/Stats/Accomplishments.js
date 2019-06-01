import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const Accomplishments = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>WEEK: 05/24 - 05/30</h2>
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
              <Typography color='textSecondary' className={classes.category}>
                CARBS
              </Typography>
              <Typography className={classes.pos} variant='body2' component='p'>
                You have consumed less that 10 g of carbs.
              </Typography>
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
                FATS
              </Typography>
              <Typography className={classes.pos} variant='body2' component='p'>
                You consumed more that your daily goal of fats on May 28th.
              </Typography>
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
};

const styles = theme => ({
  root: {
    width: "100%",
    margin: "50px auto",
    maxWidth: "1200px",
    padding: "20px"
  },
  card: {
    height: "200px",
    margin: "10px"
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
