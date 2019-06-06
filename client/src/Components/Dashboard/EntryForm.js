import React, { Component } from "react";
import styled from "styled-components";
// import { Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import { ADD_FOOD, ADD_FOOD_ENTRY } from '../../graphql/mutations';
import gql from "graphql-tag";


const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  padding: 20px;
`;

const GET_CURRENT = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      email
    }
  }
`;

class EntryForm extends Component {
  state = {
    newFoodEntry: {
      date: "",
      food_id: null,
      user_id: null,
      servingQty: null,
      meal_category_id: null
    },
    newAddFood: {
      foodName: "",
      caloriesPerServ: null,
      fats: null,
      carbs: null,
      proteins: null,
      edamam_id: null
    }
  };

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT
      })
      .then(response => this.setState({
        newAddFood: { 
          ...this.state.newAddFood,
          user_id: response.data.getCurrentUser.id
        }
      }))
      .catch(err => console.log(err));
  };

  onInputChange = e => {
    this.setState({
      // newFoodEntry: {
      //   ...this.state.newFoodEntry,
      //   [e.target.name]:e.target.type === "number" ? parseInt(e.target.value) : e.target.value
      // },
      newAddFood: {
        ...this.state.newAddFood,
        [e.target.name]: e.target.type === "number" ? parseInt(e.target.value) : e.target.value
      }
    });
    // console.log('inputchange', this.state.newFoodEntry)
  };

  onEntrySubmit = e => {
    e.preventDefault();
     const foodAddedToDB = {
       foodName: this.state.newAddFood.foodName,
       caloriesPerServ: this.state.newAddFood.caloriesPerServ,
       fats: this.state.newAddFood.fats,
       carbs: this.state.newAddFood.carbs,
       proteins: this.state.newAddFood.proteins,
       edamam_id: this.state.newAddFood.edamam_id
     }
     console.log('foodAddedToDB', foodAddedToDB)
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
    .then(() => {
      console.log('in the add food part')
      this.setState({
        newAddFood: {
          foodName: "",
          caloriesPerServ: null,
          fats: null,
          carbs: null,
          proteins: null,
          edamam_id: null
        }
      })
    })
    .catch(err => console.log('food entry error', err));
    // this.props.addEntry(this.state.newAddFood)
  };

  // onEntrySubmit = e => {
  //   e.preventDefault();
  //   console.log('adding food entry', this.state.onEntrySubmit)
  //   console.log(this.state.addEntry)
  //   const client = new ApolloClient({
  //     uri: "https://nutrition-tracker-be.herokuapp.com"
  //   });
    
  //   client
  //   .mutate({
  //     mutation: ADD_FOOD_ENTRY,
  //     variables: {
  //       input: this.state.newFoodEntry
  //     }
  //   })
  //   .then(() => {
  //     console.log('in the add food part')
  //     client
  //     .mutate({
  //       mutation: ADD_FOOD,
  //       variables: {
  //         input: this.state.newAddFood
  //       }
  //     })
  //     .then(() => {
  //       console.log('adding food?')
  //       this.setState({
  //       newAddFood: {
  //         foodName: "",
  //         caloriesPerServ: null,
  //         fats: null,
  //         carbs: null,
  //         proteins: null
  //       }
  //     }).catch(err => console.log('food entry error', err))
  //     this.setState({
  //       newFoodEntry: {
  //         date: "",
  //         food_id: null,
  //         user_id: null,
  //         servingQty: null,
  //         meal_category_id: null
  //       }
  //     })
  //   })
  //   .catch(err => console.log('food entry error', err));
  //   this.props.addEntry([this.state.newFoodEntry, this.state.newAddFood])
  //   })
  // };

  render() {
    this.getCurrentUser(localStorage.getItem("token"));
    return (
      <Form>
        <label htmlFor="foodName">Food</label>
        <input
          className="form-field"
          type="text"
          placeholder="Add food here..."
          onChange={this.onInputChange}
          name="foodName"
        />
        <label htmlFor="meal_category_id">Meal Category</label>
        <select className="form-field" name="meal_category_id" onChange={this.onInputChange}>
          <option value="" defaultValue disabled>Select Meal Category</option>
          <option value="2">breakfast</option>
          <option value="3">lunch</option>
          <option value="4">dinner</option>
          <option value="5">snack</option>
        </select>
        <label htmlFor="servingQty">Serving Quantity</label>
        <input className="form-field" type="number" name="servingQty" onChange={this.onInputChange}/>

        <label htmlFor="caloriesPerServ">Calories per serving</label>
        <input className="form-field" type="number" name="caloriesPerServ" onChange={this.onInputChange}/>

        <label htmlFor="proteins">Grams of Protein per Serving</label>
        <input className="form-field" type="number" name="proteins" onChange={this.onInputChange}/>
        <label htmlFor="carbs">Grams of Carbs per Serving</label>

        <input className="form-field" type="number" name="carbs" onChange={this.onInputChange}/>
        <label htmlFor="fats">Grams of Fat per Serving</label>
        
        <input className="form-field" type="number" name="fats" onChange={this.onInputChange}/>
        <label htmlFor="date">Date</label>
        <input className="form-field" type="date" name="date" onChange={this.onInputChange} />
        <button className="form-field" type="submit" onClick={this.onEntrySubmit}>
          Add Entry
        </button>
      </Form>
    );
  }
}

export default EntryForm;
