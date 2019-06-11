import React, { Component } from "react";
import styled from "styled-components";
// import { Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import { ADD_FOOD } from "../../graphql/mutations";
import { GET_ALL_FOOD } from "../../graphql/queries";
import gql from "graphql-tag";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 20px;

  h1{
    font-size: 1.5em;
    font-weight: bold;
    padding-bottom: 30px;
    text-align: center;
    color: blue;
  }
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
      edamamExist: false,
      newAddFood: {
        foodName: "",
        caloriesPerServ: null,
        fats: null,
        carbs: null,
        proteins: null,
        edamam_id: "",
        meal_category_id: null,
        date: "",
        servingQty: null
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
    if (this.state.edamamExist === false) {
      const mealCat = parseInt(this.state.newAddFood.meal_category_id);
      if (mealCat > 0) {
        const foodAddedToDB = {
          foodName: this.state.newAddFood.foodName,
          caloriesPerServ: parseInt(this.state.newAddFood.caloriesPerServ),
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
            // client
            //   .mutate({
            //     mutation: ADD_FOOD_ENTRY,
            //     variables: {
            //       input: entryAddedToDB
            //     }
            //   })
            //   .then(response => {
            //     console.log(response);
            //   });
            this.props.addFoodEntry(entryAddedToDB)
            this.setState({
              errors: [],
              edamamExist: false,
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
              edamamExist: false,
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
    }
    else {
      const client = new ApolloClient({
        uri: "https://nutrition-tracker-be.herokuapp.com"
      })
      client
        .query({
          query: GET_ALL_FOOD
        })
        .then(response => {
        const filteredEdamam  = response.data.getFoods.filter( food => {
              return food.edamam_id === this.props.selectedFood.foodId;
          })
          return filteredEdamam;
        })
        .then( response => {
          const foodId = response[0].id;
          const entryAddedToDB = {
            date: this.state.newAddFood.date,
            food_id:  parseInt(foodId),
            user_id: parseInt(this.state.newAddFood.user_id),
            servingQty: this.state.newAddFood.servingQty,
            meal_category_id: parseInt(this.state.newAddFood.meal_category_id)
          };
          // client
          //   .mutate({
          //     mutation: ADD_FOOD_ENTRY,
          //     variables: {
          //       input: entryAddedToDB
          //     }
          //   })
          this.props.addFoodEntry(entryAddedToDB)
          this.setState({
            errors: [],
            edamamExist: false,
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
            // .then(response => {
            //   console.log(response);
            //   this.setState({
            //     errors: [],
            //     edamamExist: false,
            //     newAddFood: {
            //       foodName: "",
            //       caloriesPerServ: null,
            //       fats: null,
            //       carbs: null,
            //       proteins: null,
            //       edamam_id: null,
            //       meal_category_id: null,
            //       date: "",
            //       servingQty: null
            //     }
            //   });
            // });

          // console.log("response:", response);
          // console.log("currentUser:", this.state.newAddFood.user_id);
          // console.log("mealCategory:", this.state.newAddFood.meal_category_id);
          })
          .catch(err =>{
            this.setState({
                errors: [],
                edamamExist: false,
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
              console.error(err)
            }
          )

    }

  };

  edamamExistCheck = edamam_id => {

    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    })
    client
      .query({
        query: GET_ALL_FOOD
      })
      .then(response => {
       const filteredEdamam = response.data.getFoods.some( food => {
            return food.edamam_id === edamam_id;
        })
        if(filteredEdamam) {
          this.setState({
            edamamExist: true
          })
          // console.log(this.state.edamamExist)
        } else {
          this.setState({
            edamamExist: false
          })
        }
      })
      .catch(err => console.error(err))
  }

  getEdamamData = edamam_id => {

    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    })
    client
      .query({
        query: GET_ALL_FOOD
      })
      .then(response => {
      const filteredEdamam  = response.data.getFoods.filter( food => {
            return food.edamam_id === edamam_id;
        })

        return filteredEdamam;
      })
      .catch(err => console.error(err))
  }

  componentDidMount(){
    let foodName;
    let caloriesPerServ;
    let fats;
    let carbs;
    let  proteins;
    let edamam_id;

    if(this.props.selectedFood){
      foodName = this.props.selectedFood.label;
      caloriesPerServ =  this.props.selectedFood.nutrients.ENERC_KCAL;
      fats = this.props.selectedFood.nutrients.FAT;
      carbs = this.props.selectedFood.nutrients.CHOCDF;
      proteins = this.props.selectedFood.nutrients.PROCNT;
      edamam_id = this.props.selectedFood.foodId;
      this.setState({
        newAddFood: {
          foodName: foodName,
          caloriesPerServ: caloriesPerServ,
          fats: fats,
          carbs: carbs,
          proteins: proteins,
          edamam_id: edamam_id
        }
      })
      this.edamamExistCheck(this.props.selectedFood.foodId)
    }
  }

  componentDidUpdate(prevProps){
    let foodName;
    let caloriesPerServ;
    let fats;
    let carbs;
    let  proteins;
    let edamam_id;

    if(prevProps.selectedFood !== this.props.selectedFood){
      foodName = this.props.selectedFood.label;
      caloriesPerServ =  this.props.selectedFood.nutrients.ENERC_KCAL;
      fats = this.props.selectedFood.nutrients.FAT;
      carbs = this.props.selectedFood.nutrients.CHOCDF;
      proteins = this.props.selectedFood.nutrients.PROCNT;
      edamam_id = this.props.selectedFood.foodId;
      this.setState({
        newAddFood: {
          foodName: foodName,
          caloriesPerServ: caloriesPerServ,
          fats: fats,
          carbs: carbs,
          proteins: proteins,
          edamam_id: edamam_id
        }
      })
      this.edamamExistCheck(this.props.selectedFood.foodId)
    }
  }

  render() {
    this.getCurrentUser(localStorage.getItem("token"));
    return (
      <Form>
        <h1> Add food entry</h1>
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
          <option value="1">breakfast</option>
          <option value="2">lunch</option>
          <option value="4">dinner</option>
          <option value="3">snack</option>
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
          value={this.state.newAddFood.caloriesPerServ ? this.state.newAddFood.caloriesPerServ : ''}
        />

        <label htmlFor="proteins">Grams of Protein per Serving</label>
        <input
          className="form-field"
          type="number"
          name="proteins"
          onChange={this.onInputChange}
          value={this.state.newAddFood.proteins ? this.state.newAddFood.proteins: ''}
        />
        <label htmlFor="carbs">Grams of Carbs per Serving</label>

        <input
          className="form-field"
          type="number"
          name="carbs"
          onChange={this.onInputChange}
          value={this.state.newAddFood.carbs ? this.state.newAddFood.carbs : ''}
        />
        <label htmlFor="fats">Grams of Fat per Serving</label>

        <input
          className="form-field"
          type="number"
          name="fats"
          onChange={this.onInputChange}
          value={this.state.newAddFood.fats ? this.state.newAddFood.fats : ''}
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
        <button
          onClick={this.props.closeFoodForm}
        > Close
        </button>
      </Form>
    );
  }
}

export default EntryForm;
