import React from "react";
import { GraphQLClient } from "graphql-request";

import StatsDashboard from "./StatsDashboard";
import FoodLogStats from "./FoodLogStats";
import { GET_FOOD_ENTRIES_BY_USER_QUERY, GET_CURRENT_USER_QUERY } from "../../graphql/queries";

const BASE_URL = "https://nutrition-tracker-be.herokuapp.com/";
// const BASE_URL = "http://localhost:4000/";

class StatsView extends React.Component {
  state = {
    foodEntries: [],
    chart: "day"
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

  handleChartChange = kind => {
    this.setState({ chart: kind });
  };

  render() {
    return (
      <>
        <div>
          <StatsDashboard chartChange={this.handleChartChange} />
          {this.state.chart === "day" && <FoodLogStats foodEntries={this.state.foodEntries} days='1' />}
          {this.state.chart === "week" && <FoodLogStats foodEntries={this.state.foodEntries} days='7' />}
        </div>
      </>
    );
  }
}
export default StatsView;
