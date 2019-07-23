import React from "react";
import ApolloClient from "apollo-boost";
import { GET_CURRENT_USER_QUERY } from "../../graphql/queries";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "#5E366A"
  },
  title: {
    fontSize: 16,
    background: "#5E366A",
    padding: 10,
    color: "#ffffff"
  },
  calTitle: {
    fontFamily: "Oswald",
    fontSize: 18
  },
  card: {
    width: "100%",
    maxWidth: 960,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column"
  },
  num: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Oswald"
  },
  centerNum: {
    fontSize: 40,
    fontWeight: "bold",
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
      uri: "http://localhost:4000",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT_USER_QUERY
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
