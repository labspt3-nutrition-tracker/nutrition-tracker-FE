import React from "react";
import { GraphQLClient } from "graphql-request";
import * as moment from "moment";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import StatsDashboard from "./StatsDashboard";
import OneDayStats from "./OneDayStats";
import ManyDaysStats from "./ManyDaysStats";
import WeightStats from "./WeightStats";
import Accomplishments from "./Accomplishments";
import {
  GET_FOOD_ENTRIES_BY_USER_QUERY,
  GET_CURRENT_USER_QUERY,
  GET_WEIGHT_ENTRIES_QUERY,
  GET_EXERCISE_ENTRIES_QUERY
} from "../../graphql/queries";

const BASE_URL = "https://nutrition-tracker-be.herokuapp.com/";

class StatsView extends React.Component {
  state = {
    foodEntries: [],
    weightEntries: [],
    exerciseEntries: [],
    days: [moment().format("YYYY-MM-DD")],
    data: "caloriesPerServ",
    option: 0,
    initialWeight: 0,
    currentUser: null
  };

  componentDidMount = async () => {
    const idToken = localStorage.getItem("token");
    const client = new GraphQLClient(BASE_URL, {
      mode: "cors",
      headers: { authorization: idToken }
    });
    try {
      const user = await client.request(GET_CURRENT_USER_QUERY);
      const userId = user.getCurrentUser.id;
      const initialWeight = user.getCurrentUser.weight;
      const variables = { userId };
      const foodEntries = await client.request(GET_FOOD_ENTRIES_BY_USER_QUERY, variables);
      const weightEntries = await client.request(GET_WEIGHT_ENTRIES_QUERY, variables);
      const exerciseEntries = await client.request(GET_EXERCISE_ENTRIES_QUERY, variables);
      this.setState({
        foodEntries: foodEntries.getFoodEntriesByUserId,
        weightEntries: weightEntries.getWeightEntriesByUserId,
        exerciseEntries: exerciseEntries.getExerciseEntriesByUserId,
        initialWeight: initialWeight,
        currentUser: user.getCurrentUser
      });
    } catch (err) {
      console.log(err);
      if (err.response.errors[0].message === "You must be logged in!") {
        localStorage.removeItem("token");
        // this.props.history.push("/login");
      }
    }
  };

  handleChartChange = days => {
    if (days.length === 1 && this.state.data === "weight") this.setState({ data: "caloriesPerServ" });
    this.setState({ days: days });
  };

  handleDataChange = data => {
    this.setState({ data: data });
  };

  handleOptionChange = (event, option) => {
    this.setState({ option: option });
  };

  render() {
    const { classes } = this.props;
    const { option, foodEntries, days, data, exerciseEntries, weightEntries, currentUser, initialWeight } = this.state;
    console.log({ currentUser });
    let tooltipTitle = "";
    if (currentUser) {
      if (currentUser.userType === "basic") tooltipTitle = "Please upgrade to access report";
    }
    return (
      <>
        <div>
          <Paper className={classes.root}>
            <Tabs
              value={option}
              onChange={this.handleOptionChange}
              centered
              classes={{
                indicator: classes.indicator
              }}
            >
              <Tab label='Charts' className={classes.tab} />
              <CloneProps>
                {tabProps => (
                  <Tooltip TransitionComponent={Zoom} title={tooltipTitle} classes={{ tooltip: classes.tooltip }}>
                    <div>
                      <Tab
                        {...tabProps}
                        className={classes.tab}
                        disabled={currentUser ? currentUser.userType === "basic" : true}
                        label={<span>Accomplishments</span>}
                      />
                    </div>
                  </Tooltip>
                )}
              </CloneProps>
            </Tabs>
          </Paper>
          {option === 0 ? (
            <>
              <StatsDashboard chartChange={this.handleChartChange} dataChange={this.handleDataChange} />
              {days.length === 1 ? (
                <OneDayStats foodEntries={foodEntries} days={days} data={data} />
              ) : (
                <>
                  {data === "weight" ? (
                    <WeightStats weightEntries={weightEntries} days={days} initialWeight={initialWeight} />
                  ) : (
                    <ManyDaysStats foodEntries={foodEntries} days={days} data={data} />
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {currentUser.userType !== "basic" && (
                <Accomplishments
                  currentUser={currentUser}
                  foodEntries={foodEntries}
                  weightEntries={weightEntries}
                  exerciseEntries={exerciseEntries}
                />
              )}
            </>
          )}
        </div>
      </>
    );
  }
}

function CloneProps(props) {
  const { children, ...other } = props;
  return children(other);
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontSize: "2rem",
    padding: "5px",
    boxShadow: "none",
    fontFamily: "Oxygen"
  },
  tab: {
    fontSize: "2rem",
    color: "#3685B5",
    fontFamily: "Oxygen"
  },
  indicator: {
    backgroundColor: "#F4B4C3"
  },
  tooltip: {
    fontSize: "1.8rem",
    // color: "white",
    backgroundColor: "#F4B4C3"
  }
});

export default withStyles(styles)(StatsView);
