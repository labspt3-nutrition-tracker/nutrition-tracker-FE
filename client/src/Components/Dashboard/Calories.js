import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { GET_CURRENT_USERID } from "../../graphql/queries";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 500px;
`;
const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "#5E366A"
  },
  title: {
    // flexGrow: 1,
    fontSize: 16,
    background: "#5E366A",
    padding: 10,
    color: "#ffffff"
  },
  calTitle: {
    fontFamily: "Oswald",
    // fontFamily: "Roboto Condensed",
    fontSize: 18
  },
  card: {
    width: "100%",
    maxWidth: 960,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column"
    // marginTop: 30,
    // marginBottom: 50
  },
  num: {
    fontSize: 20,
    fontWeight: "bold",
    // letterSpacing: 1.2,
    fontFamily: "Oswald"
  },
  centerNum: {
    fontSize: 40,
    fontWeight: "bold",
    // letterSpacing: 1.2,
    fontFamily: "Oswald"
  },
  calCon: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "flex-end",
    color: "#545454"
  },
  calConWrap: {
    paddingBottom: 0
  },
  progress: {
    margin: theme.spacing(2)
  }
});

class Calories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      calGoal: null
    };
  }

  componentDidMount() {
    const idToken = localStorage.getItem("token");
    this.getCurrentUser(idToken);
    this.setState({ foodEntries: this.props.foodEntries });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.foodEntries !== this.props.foodEntries) {
      this.setState({ foodEntries: this.props.foodEntries });
    }
  }

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT_USERID
      })
      .then(response => {
        this.setState({
          currentUser: response.data.getCurrentUser.id,
          calGoal: response.data.getCurrentUser.calorieGoal
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const CAL_QUERY = gql`
    query {
      getFoodEntriesByUserId(userId: ${this.state.currentUser}) {
        date
        servingQty
        food_id {
          caloriesPerServ
        }
      }
    }
    `;
    const CURRENT_USERID = gql`
      query getCurrentUser {
        getCurrentUser {
          id
        }
      }
    `;

    const dateToday = new Date();
    const month = dateToday.getMonth();
    const day = dateToday.getDate();
    const year = dateToday.getFullYear();
    let foodEntries = this.props.foodEntries;
    foodEntries = foodEntries.filter(entry => {
      const dateEntry = new Date(entry.date);
      const entryMonth = dateEntry.getMonth();
      const entryDay = dateEntry.getDate();
      const entryYear = dateEntry.getFullYear();
      return entryMonth === month && entryDay === day && entryYear === year;
    });
    const calGoal = this.state.calGoal;
    let mealCal = [];
    // console.log("foodEntries:", foodEntries);
    if (foodEntries.length === 0) {
      const mealCal = 0;
      const remainCal = calGoal - mealCal;

      return (
        <CardContent className={classes.card}>
          <Container className={classes.calCon}>
            <Container className={classes.calConWrap}>
              <Typography className={classes.num}>{mealCal}</Typography>
              <Typography className={classes.calTitle} variant="h4">
                Calorie Intake
              </Typography>
            </Container>

            <Container className={classes.calConWrap}>
              <Typography className={classes.centerNum}>{remainCal}</Typography>
              <Typography className={classes.calTitle} variant="h4">
                Remaining Calories
              </Typography>
            </Container>

            <Container className={classes.calConWrap}>
              <Typography className={classes.num}>{calGoal}</Typography>
              <Typography className={classes.calTitle} variant="h4">
                Daily Calorie Goal
              </Typography>
            </Container>
          </Container>
        </CardContent>
      );
    } else {
      foodEntries.map(entry =>
        mealCal.push(entry.food_id.caloriesPerServ * entry.servingQty)
      );
      mealCal = mealCal.reduce((a, b) => {
        return a + b;
      });
      const remainCal = calGoal - mealCal;
      return (
        <CardContent className={classes.card}>
          <Container className={classes.calCon}>
            <Container className={classes.calConWrap}>
              <Typography className={classes.num}>{mealCal}</Typography>
              <Typography className={classes.calTitle} variant="h4">
                Calorie Intake
              </Typography>
            </Container>

            <Container className={classes.calConWrap}>
              <Typography className={classes.centerNum}>{remainCal}</Typography>
              <Typography className={classes.calTitle} variant="h4">
                Remaining Calories
              </Typography>
            </Container>

            <Container className={classes.calConWrap}>
              <Typography className={classes.num}>{calGoal}</Typography>
              <Typography className={classes.calTitle} variant="h4">
                Daily Calorie Goal
              </Typography>
            </Container>
          </Container>
        </CardContent>
      );
    }
  }
}

export default withStyles(styles)(Calories);
