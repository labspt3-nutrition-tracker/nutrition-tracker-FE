import React from "react";
import moment from "moment";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import "@fullcalendar/core/main.css";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import Calendar from "./Calendar";
import JournalEntry from "./JournalEntry";

import { getCurrentUser } from "../../util/getCurrentUser";

const DELETE_MEAL = gql`
  mutation deleteFoodEntry($id: ID!) {
    deleteFoodEntry(id: $id)
  }
`;

const UPDATE_FOOD_ENTRY = gql`
  mutation updateFoodEntry($id: ID!, $input: FoodEntryInput!) {
    updateFoodEntry(id: $id, input: $input) {
      id
    }
  }
`;

const UPDATE_FOOD = gql`
  mutation updateFood($id: ID!, $input: FoodInput!) {
    updateFood(id: $id, input: $input) {
      id
      foodName
      caloriesPerServ
      fats
      carbs
      proteins
      edamam_id
    }
  }
`;

const FOODENTRYQUERY = gql`
  query getFoodEntry($userId: ID!) {
    getFoodEntriesByUserId(userId: $userId) {
      id
      date
      servingQty
      food_id {
        id
        foodName
        caloriesPerServ
        fats
        proteins
        carbs
        edamam_id
      }
      meal_category_id {
        id
        mealCategoryName
      }
    }
  }
`;

class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      datePicked: "",
      foodEntry: []
    };
  }

  handleDateClick = date => {
    this.setState({ datePicked: date });
  };

  componentDidMount = async () => {
    const idToken = localStorage.getItem("token");
    try {
      const user = await getCurrentUser(idToken);
      let date = moment().format("ddd MMMM D YYYY");
      this.setState({ datePicked: date, currentUser: user.id });
    } catch (err) {
      console.log(err);
      if (err.response.errors[0].message === "You must be logged in!") {
        localStorage.removeItem("token");
      }
    }

    this.loadFoodEntries();
  };

  loadFoodEntries = async () => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    await client
      .query({
        query: FOODENTRYQUERY,
        variables: {
          userId: this.state.currentUser
        }
      })
      .then(response => {
        this.setState({
          foodEntry: response.data.getFoodEntriesByUserId
        });
      })
      .catch(err => console.log(err));
  };

  deleteMealEntry = id => {
    console.log(id);
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .mutate({
        mutation: DELETE_MEAL,
        variables: { id }
      })
      .then(response => {
        console.log(response);
      })
      .then(response => {
        client.query({
          query: FOODENTRYQUERY,
          variables: {
            userId: this.state.currentUser
          }
        });
      })
      .catch(err => console.log(err));
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

    await client
      .mutate({
        mutation: UPDATE_FOOD,
        variables: {
          id: food_id,
          input: foodInput
        }
      })
      .then(response => {
        client.mutate({
          mutation: UPDATE_FOOD_ENTRY,
          variables: {
            id: entry_id,
            input: foodEntryInput
          }
        });
      })
      .then(response => {
        client
          .query({
            query: FOODENTRYQUERY,
            variables: {
              userId: this.state.currentUser
            }
          })
          .then(response => {
            console.log("**** ", response.data.getFoodEntriesByUserId);
            this.setState({
              foodEntry: response.data.getFoodEntriesByUserId
            });
          });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        classes={{ root: classes.gridContainer }}
      >
        <Grid item md={4} xs={6}>
          {this.state.foodEntry.length > 1 ? (
            <JournalEntry
              foodEntries={this.state.foodEntry}
              datePicked={this.state.datePicked}
              deleteMeal={this.deleteMealEntry}
              editMeal={this.editMealEntry}
            />
          ) : (
            <div>Loading...</div>
          )}
        </Grid>
        <Grid item md={8} xs={12}>
          <Calendar
            datePicked={this.state.datePicked}
            handleDateClick={this.handleDateClick}
          />
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  gridContainer: {
    padding: "3%"
  }
});

export default withStyles(styles)(Journal);
