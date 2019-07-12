import React from "react";
import moment from "moment";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import "@fullcalendar/core/main.css";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import Calendar from "./Calendar";
import JournalEntry from "./JournalEntry";
import { getCurrentUser } from "../../util/getCurrentUser";
import { FOOD_ENTRY_QUERY } from "../../graphql/queries";
import {
  DELETE_FOOD_ENTRY,
  EDIT_FOOD_ENTRY,
  EDIT_FOOD
} from "../../graphql/mutations";

const Errors = styled.ul`
  text-align: center;
  li {
    margin: 15px 0;
    color: #40a798;
    font-family: Oswald;
  }
`;

class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      premiumUser: true,
      datePicked: "",
      foodEntry: [],
      errors: [],
      info: ""
    };
  }

  handleDateClick = (date, premium) => {
    console.log(premium);
    if (premium) {
      this.setState({
        datePicked: date,
        premiumUser: premium,
        info: ""
      });
    } else {
      this.setState({
        datePicked: date,
        premiumUser: premium,
        info: ""
      });
    }
  };

  componentDidMount = async () => {
    const idToken = localStorage.getItem("token");
    try {
      const user = await getCurrentUser(idToken);
      let date = moment().format("ddd MMMM D YYYY");
      this.setState({ datePicked: date, currentUser: user.id });
    } catch (err) {
      console.log(err);
      const error = err.message.split(":")[1];
      this.setState(prevState => {
        const errors = prevState.errors;
        errors.push(error);
        return { errors: errors };
      });
    }

    this.loadFoodEntries();
  };

  loadFoodEntries = async () => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    try {
      const response = await client.query({
        query: FOOD_ENTRY_QUERY,
        variables: {
          userId: this.state.currentUser
        }
      });
      this.setState({
        foodEntry: response.data.getFoodEntriesByUserId
      });
    } catch (err) {
      console.log(err);
      const error = err.message.split(":")[1];
      this.setState(prevState => {
        const errors = prevState.errors;
        errors.push(error);
        return { errors: errors };
      });
    }
  };

  deleteMealEntry = async id => {
    console.log(id);
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    try {
      await client.mutate({
        mutation: DELETE_FOOD_ENTRY,
        variables: { id }
      });

      const response = await client.query({
        query: FOOD_ENTRY_QUERY,
        variables: {
          userId: this.state.currentUser
        }
      });
      this.setState({
        foodEntry: response.data.getFoodEntriesByUserId,
        info: "The food entry has been deleted."
      });
    } catch (err) {
      console.log(err);
      const error = err.message.split(":")[1];
      this.setState(prevState => {
        const errors = prevState.errors;
        errors.push(error);
        return { errors: errors };
      });
    }
  };

  editMealEntry = async (entry_id, food_id, foodEntry) => {
    const foodInput = {
      foodName: foodEntry.foodName,
      caloriesPerServ: foodEntry.caloriesPerServ,
      fats: foodEntry.fats,
      carbs: foodEntry.carbs,
      proteins: foodEntry.proteins,
      edamam_id: foodEntry.edamam_id
    };

    const foodEntryInput = {
      date: foodEntry.date,
      food_id: food_id,
      user_id: foodEntry.user_id,
      servingQty: foodEntry.servingQty,
      meal_category_id: foodEntry.meal_category_id
    };
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    try {
      await client.mutate({
        mutation: EDIT_FOOD,
        variables: {
          id: food_id,
          input: foodInput
        }
      });

      await client.mutate({
        mutation: EDIT_FOOD_ENTRY,
        variables: {
          id: entry_id,
          input: foodEntryInput
        }
      });

      const response = await client.query({
        query: FOOD_ENTRY_QUERY,
        variables: {
          userId: this.state.currentUser
        }
      });
      this.setState({
        foodEntry: response.data.getFoodEntriesByUserId,
        info: "The food entry has been edited successfully."
      });
    } catch (err) {
      console.log(err);
      const error = err.message.split(":")[1];
      this.setState(prevState => {
        const errors = prevState.errors;
        errors.push(error);
        return { errors: errors };
      });
    }
  };

  premiumCheck = () => {
    if (!this.state.premiumUser) {
      return (
        <div>
          <h2>In order to see meal entries you must upgrade to premium!</h2>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  render() {
    const { classes } = this.props;
    const { errors, info } = this.state;
    return (
      <>
        {errors.length > 0 ? (
          <Errors>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </Errors>
        ) : (
          <>
            {info && <h2 className={classes.message}>{info}</h2>}
            <Grid
              container
              justify="center"
              alignItems="center"
              classes={{ root: classes.gridContainer }}
            >
              <Grid item md={4} xs={12}>
                {this.state.foodEntry.length > 1 && this.state.premiumUser ? (
                  <JournalEntry
                    foodEntries={this.state.foodEntry}
                    datePicked={this.state.datePicked}
                    deleteMeal={this.deleteMealEntry}
                    editMeal={this.editMealEntry}
                  />
                ) : (
                  this.premiumCheck()
                )}
              </Grid>
              <Grid item md={8} xs={12}>
                <Calendar
                  datePicked={this.state.datePicked}
                  handleDateClick={this.handleDateClick}
                />
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
}

const styles = theme => ({
  gridContainer: {
    padding: "3%"
  },
  message: {
    fontSize: "2rem",
    textAlign: "center",
    margin: 10,
    color: "#40a798",
    fontFamily: "Oswald"
  }
});

export default withStyles(styles)(Journal);
