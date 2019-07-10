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
import {FOOD_ENTRY_QUERY} from "../../graphql/queries";
import {DELETE_FOOD_ENTRY, EDIT_FOOD_ENTRY, EDIT_FOOD} from "../../graphql/mutations";

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
        query: FOOD_ENTRY_QUERY,
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
        foodEntry: response.data.getFoodEntriesByUserId
      });
    } catch (err) {
      console.log(err);
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
        foodEntry: response.data.getFoodEntriesByUserId
      });
    } catch (err) {
      console.log(err);
    }
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
        <Grid item md={4} xs={12}>
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
