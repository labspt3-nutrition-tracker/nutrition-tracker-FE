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
    chart: 1,
    data: "caloriesPerServ"
  };

  componentDidMount = async () => {
    const idToken = localStorage.getItem("token");
    const client = new GraphQLClient(BASE_URL, {
      mode: "cors",
      headers: { authorization: idToken }
    });
    const user = await client.request(GET_CURRENT_USER_QUERY);
    console.log({ user });
    const userId = user.getCurrentUser.id;
    const variables = { userId };
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

  handleDataChange = data => {
    this.setState({ data: data });
  };

  render() {
    return (
      <>
        <div>
          <StatsDashboard chartChange={this.handleChartChange} dataChange={this.handleDataChange} />
          <FoodLogStats foodEntries={this.state.foodEntries} days={this.state.chart} data={this.state.data} />
        </div>
      </>
    );
  }
}
export default StatsView;
