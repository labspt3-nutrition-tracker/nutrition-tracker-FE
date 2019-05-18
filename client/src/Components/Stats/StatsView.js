import React from "react";
import Header from "../Reusables/Header";
import { withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import StatsDashboard from "./StatsDashboard";
import FoodLogStats from "./FoodLogStats";

class StatsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statCalendarEntries: {
        daily: [
          {
            carbs: 2402,
            protein: 540,
            fat: 20
          }
        ],
        weekly: [
          {
            carbs: 12402,
            protein: 1540,
            fat: 120
          }
        ],
        monthly: [
          {
            carbs: 32402,
            protein: 3540,
            fat: 320
          }
        ]
      }
    };
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
    console.log(e.target.value);
  };

  handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    // const { firstName, lastName, email } = this.state;
  };

  render() {
    return (
      <>
        <Header />
              {/* <AppBar position="static" color="default" className={classes.appBar}>
        {/* <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Company name
          </Typography>
          <Button>Features</Button>
          <Button>Enterprise</Button>
          <Button>Support</Button>
          <Button color="primary" variant="outlined">
            Login
          </Button>
        </Toolbar> 
      </AppBar> */}

        <Grid
          container
          spacing={8}
          lg={4}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <StatsDashboard />
          <FoodLogStats calories={this.state.statCalendarEntries} />
        </Grid>
      </>
    );
  }
}

export default StatsView;
