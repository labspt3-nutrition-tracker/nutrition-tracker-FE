import React from "react";
import { GraphQLClient } from "graphql-request";
import * as moment from "moment";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import StatsDashboard from "./StatsDashboard";
import OneDayStats from "./OneDayStats";
import ManyDaysStats from "./ManyDaysStats";
import Accomplishments from "./Accomplishments";
import { GET_FOOD_ENTRIES_BY_USER_QUERY, GET_CURRENT_USER_QUERY } from "../../graphql/queries";

const BASE_URL = "https://nutrition-tracker-be.herokuapp.com/";
// const BASE_URL = "http://localhost:4000/";

class StatsView extends React.Component {
  state = {
    foodEntries: [],
    days: [moment().format("YYYY-MM-DD")],
    data: "caloriesPerServ",
    option: 0
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
      const variables = { userId };
      const foodEntries = await client.request(GET_FOOD_ENTRIES_BY_USER_QUERY, variables);
      this.setState({ foodEntries: foodEntries.getFoodEntriesByUserId });
    } catch (err) {
      console.log(err);
      if (err.response.errors[0].message === "You must be logged in!") this.props.history.push("/login");
    }
  };

  handleChartChange = days => {
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
    const { option } = this.state;
    return (
      <>
        <div>
          <Paper className={classes.root}>
            <Tabs
              value={option}
              onChange={this.handleOptionChange}
              indicatorColor='primary'
              textColor='primary'
              centered
            >
              <Tab label='Charts' className={classes.tab} />
              <Tab label='Accomplishments' className={classes.tab} />
            </Tabs>
          </Paper>
          {option === 0 ? (
            <>
              <StatsDashboard chartChange={this.handleChartChange} dataChange={this.handleDataChange} />
              {this.state.days.length === 1 ? (
                <OneDayStats foodEntries={this.state.foodEntries} days={this.state.days} data={this.state.data} />
              ) : (
                <ManyDaysStats foodEntries={this.state.foodEntries} days={this.state.days} data={this.state.data} />
              )}
            </>
          ) : (
            <Accomplishments />
          )}
        </div>
      </>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontSize: "2rem",
    marginBottom: "5px",
    padding: "5px"
  },
  tab: {
    fontSize: "2rem",
    color: "#2196F3"
  }
});

export default withStyles(styles)(StatsView);
