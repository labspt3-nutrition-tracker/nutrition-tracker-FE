import React from "react";
import Grid from "@material-ui/core/Grid";

import { GraphQLClient } from "graphql-request";

import StatsDashboard from "./StatsDashboard";
import FoodLogStats from "./FoodLogStats";
import { GET_FOOD_ENTRIES_BY_USER_QUERY } from "../../graphql/queries";

const BASE_URL = "https://nutrition-tracker-be.herokuapp.com/";

class StatsView extends React.Component {
  state = {
    foodEntries: [],
    chart: "week"
  };

  componentDidMount = async () => {
    const client = new GraphQLClient(BASE_URL);
    const variables = { userId: 1 };
    try {
      const foodEntries = await client.request(GET_FOOD_ENTRIES_BY_USER_QUERY, variables);
      this.setState({ foodEntries: foodEntries.getFoodEntriesByUserId });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        {/* <Grid container spacing={8} justify='center' alignItems='center'> */}
        <div>
          {/* <StatsDashboard /> */}
          {this.state.chart === "day" && <FoodLogStats foodEntries={this.state.foodEntries} days='1' />}
          {this.state.chart === "week" && <FoodLogStats foodEntries={this.state.foodEntries} days='7' />}
        </div>
        {/* </Grid> */}
      </>
    );
  }
}
export default StatsView;
