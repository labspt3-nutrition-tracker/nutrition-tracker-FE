import React from "react";
import ApolloClient from "apollo-boost";
import * as moment from "moment";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";

import StatsDashboard from "./StatsDashboard";
import OneDayStats from "./OneDayStats";
import ManyDaysStats from "./ManyDaysStats";
import WeightStats from "./WeightStats";
import ExerciseStats from "./ExerciseStats";
import Accomplishments from "./Accomplishments";
import PDFReport from "./PDFReports/PDFReport";
import {
  GET_FOOD_ENTRIES_BY_USER_QUERY,
  GET_CURRENT_USER_QUERY,
  GET_WEIGHT_ENTRIES_QUERY,
  GET_EXERCISE_ENTRIES_QUERY
} from "../../graphql/queries";
import { CircularProgress } from "@material-ui/core";

class StatsView extends React.Component {
  state = {
    foodEntries: [],
    weightEntries: [],
    exerciseEntries: [],
    days: [moment().format("YYYY-MM-DD")],
    data: "caloriesPerServ",
    option: 0,
    initialWeight: 0,
    currentUser: null,
    statsLoading: true
  };

  componentDidMount = async () => {
    const idToken = localStorage.getItem("token");

    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    try {
      const user = await client.query({ query: GET_CURRENT_USER_QUERY });
      const userId = user.data.getCurrentUser.id;
      const initialWeight = user.data.getCurrentUser.weight;
      const variables = { userId };
      const foodEntries = await client.query({
        query: GET_FOOD_ENTRIES_BY_USER_QUERY,
        variables
      });
      const weightEntries = await client.query({
        query: GET_WEIGHT_ENTRIES_QUERY,
        variables
      });
      const exerciseEntries = await client.query({
        query: GET_EXERCISE_ENTRIES_QUERY,
        variables
      });
      this.setState({
        foodEntries: foodEntries.data.getFoodEntriesByUserId,
        weightEntries: weightEntries.data.getWeightEntriesByUserId,
        exerciseEntries: exerciseEntries.data.getExerciseEntriesByUserId,
        initialWeight: initialWeight,
        currentUser: user.data.getCurrentUser,
        statsLoading: false
      });
    } catch (err) {
      console.log(err);
      // if (err.response.errors[0].message === "You must be logged in!") {
      //   localStorage.removeItem("token");
      //   // this.props.history.push("/login");
      // }
    }
  };

  handleChartChange = days => {
    if (days.length === 1 && (this.state.data === "weight" || this.state.data === "exercise"))
      this.setState({ data: "caloriesPerServ" });
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
    let tooltipTitle = "";

    if (this.state.statsLoading) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    } else {
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
                <Tab label='PDF Report' className={classes.tab} />
              </Tabs>
              {/* <Link to='/pdfReport'>PDF REPORT</Link> */}
            </Paper>
            {option === 0 ? (
              <>
                <StatsDashboard
                  chartChange={this.handleChartChange}
                  dataChange={this.handleDataChange}
                  currentUser={currentUser}
                />
                {days.length === 1 ? (
                  <OneDayStats foodEntries={foodEntries} days={days} data={data} />
                ) : (
                  <>
                    {data === "weight" ? (
                      <WeightStats weightEntries={weightEntries} days={days} initialWeight={initialWeight} />
                    ) : (
                      <>
                        {data === "exercise" ? (
                          <ExerciseStats exerciseEntries={exerciseEntries} days={days} />
                        ) : (
                          <ManyDaysStats foodEntries={foodEntries} days={days} dataType={data} />
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {option === 1 ? (
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
                ) : (
                  <PDFViewer style={PDFstyles.document}>
                    <PDFReport
                      currentUser={currentUser}
                      foodEntries={foodEntries}
                      // weightEntries={weightEntries}
                      exerciseEntries={exerciseEntries}
                    />
                  </PDFViewer>
                )}
              </>
            )}
          </div>
        </>
      );
    }
  }
}

function CloneProps(props) {
  const { children, ...other } = props;
  return children(other);
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontSize: "1.5rem",
    padding: "5px",
    boxShadow: "none",
    fontFamily: "Oxygen"
  },
  tab: {
    fontSize: "1.6rem",
    color: "#3685B5",
    fontFamily: "Oxygen"
  },
  indicator: {
    backgroundColor: "#F4B4C3"
  },
  tooltip: {
    fontSize: "1.4rem",
    // color: "white",
    backgroundColor: "#F4B4C3"
  }
});

const PDFstyles = StyleSheet.create({
  document: {
    width: "100%",
    height: "100vh"
  }
});

export default withStyles(styles)(StatsView);
