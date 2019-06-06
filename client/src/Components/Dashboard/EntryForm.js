import React, { Component } from "react";
import styled from "styled-components";
// import { Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import { ADD_FOOD, ADD_FOOD_ENTRY } from "../../graphql/mutations";
import gql from "graphql-tag";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  padding: 20px;
`;

const Error = styled.div`
  color: red;
  font-weight: bold;
  font-size: 2rem;
`

const GET_CURRENT = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      email
    }
  }
`;

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      newAddFood: {
        foodName: props.selectedFood ? props.selectedFood.label : "",
        caloriesPerServ: this.props.selectedFood
          ? this.props.selectedFood.nutrients.ENERC_KCAL
          : null,
        fats: this.props.selectedFood
          ? this.props.selectedFood.nutrients.FAT
          : null,
        carbs: this.props.selectedFood
          ? this.props.selectedFood.nutrients.CHOCDF
          : null,
        proteins: this.props.selectedFood
          ? this.props.selectedFood.nutrients.PROCNT
          : null,
        edamam_id: this.props.selectedFood
          ? this.props.selectedFood.foodId
          : "",
        meal_category_id: null,
        date: "",
        servingQty: null

        // foodName: "",
        // caloriesPerServ: null,
        // fats: null,
        // carbs: null,
        // proteins: null,
        // edamam_id: "",
        // meal_category_id: null,
        // date: "",
        // servingQty: null
      }
    };
  }

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT
      })
      .then(response =>
        this.setState({
          newAddFood: {
            ...this.state.newAddFood,
            user_id: response.data.getCurrentUser.id
          }
        })
      )
      .catch(err => console.log(err));
  };

  onInputChange = e => {
    this.setState({
      newAddFood: {
        ...this.state.newAddFood,
        [e.target.name]:
          e.target.type === "number" ? parseInt(e.target.value) : e.target.value
      }
    });
  };

  onEntrySubmit = e => {
    e.preventDefault();
    const mealCat = parseInt(this.state.newAddFood.meal_category_id);

    if (mealCat > 1) {
      const foodAddedToDB = {
        foodName: this.state.newAddFood.foodName,
        caloriesPerServ: this.state.newAddFood.caloriesPerServ,
        fats: this.state.newAddFood.fats,
        carbs: this.state.newAddFood.carbs,
        proteins: this.state.newAddFood.proteins,
        edamam_id: this.state.newAddFood.edamam_id
      };
      console.log("foodAddedToDB", foodAddedToDB);
      console.log(this.state.newAddFood.meal_category_id);
      console.log("servingqty", this.state.newAddFood.servingQty);
      const client = new ApolloClient({
        uri: "https://nutrition-tracker-be.herokuapp.com"
      });
      client
        .mutate({
          mutation: ADD_FOOD,
          variables: {
            input: foodAddedToDB
          }
        })
        .then(response => {
          const entryAddedToDB = {
            date: this.state.newAddFood.date,
            food_id: parseInt(response.data.addFood.id),
            user_id: parseInt(this.state.newAddFood.user_id),
            servingQty: this.state.newAddFood.servingQty,
            meal_category_id: parseInt(this.state.newAddFood.meal_category_id)
          };
          client
            .mutate({
              mutation: ADD_FOOD_ENTRY,
              variables: {
                input: entryAddedToDB
              }
            })
            .then(response => {
              console.log(response);
            });

          console.log("response:", response);
          console.log("currentUser:", this.state.newAddFood.user_id);
          console.log("mealCategory:", this.state.newAddFood.meal_category_id);
          this.setState({
            errors: [],
            newAddFood: {
              foodName: "",
              caloriesPerServ: null,
              fats: null,
              carbs: null,
              proteins: null,
              edamam_id: null,
              meal_category_id: null,
              date: "",
              servingQty: null
            }
          });
        })
        .catch(err => {
          console.log("food entry error", err);
          this.setState({
            errors: [],
            newFoodEntry: {
              foodName: "",
              caloriesPerServ: null,
              fats: null,
              carbs: null,
              proteins: null,
              edamam_id: null,
              meal_category_id: null,
              date: "",
              servingQty: null
            }
          });
        });
    } else {
      this.setState({errors: ["meal category is required"]})
    }
  };

  render() {
    this.getCurrentUser(localStorage.getItem("token"));
    return (
      <Form>
        {this.state.errors
          ? this.state.errors.map(error => {
              return <Error key={error}>{error}</Error>
            })
          : null}
        <label htmlFor="foodName">Food</label>
        <input
          className="form-field"
          type="text"
          placeholder="Add food here..."
          onChange={this.onInputChange}
          name="foodName"
          value={this.state.newAddFood.foodName}
          required
        />
        <label htmlFor="meal_category_id">Meal Category</label>
        <select
          required
          className="form-field"
          name="meal_category_id"
          type="number"
          onChange={this.onInputChange}
          required
        >
          <option>Select Meal Category</option>
          <option value="2">breakfast</option>
          <option value="3">lunch</option>
          <option value="4">dinner</option>
          <option value="5">snack</option>
        </select>
        <label htmlFor="servingQty">Serving Quantity</label>
        <input
          className="form-field"
          type="number"
          name="servingQty"
          onChange={this.onInputChange}
        />

        <label htmlFor="caloriesPerServ">Calories per serving</label>
        <input
          className="form-field"
          type="number"
          name="caloriesPerServ"
          onChange={this.onInputChange}
          value={this.state.newAddFood.caloriesPerServ}
        />

        <label htmlFor="proteins">Grams of Protein per Serving</label>
        <input
          className="form-field"
          type="number"
          name="proteins"
          onChange={this.onInputChange}
          value={this.state.newAddFood.proteins}
        />
        <label htmlFor="carbs">Grams of Carbs per Serving</label>

        <input
          className="form-field"
          type="number"
          name="carbs"
          onChange={this.onInputChange}
          value={this.state.newAddFood.carbs}
        />
        <label htmlFor="fats">Grams of Fat per Serving</label>

        <input
          className="form-field"
          type="number"
          name="fats"
          onChange={this.onInputChange}
          value={this.state.newAddFood.fats}
        />
        <label htmlFor="date">Date</label>
        <input
          className="form-field"
          type="date"
          name="date"
          onChange={this.onInputChange}
        />
        <button
          className="form-field"
          type="submit"
          onClick={this.onEntrySubmit}
        >
          Add Entry
        </button>
      </Form>
    );
  }
}

export default EntryForm;
