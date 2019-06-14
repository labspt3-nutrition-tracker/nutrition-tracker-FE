import React, { Component } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import ApolloClient from "apollo-boost";
import { ADD_FOOD } from "../../graphql/mutations";
import { GET_ALL_FOOD } from "../../graphql/queries";
import gql from "graphql-tag";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  
  width: 30%;
  padding: 20px;
  h1 {
    font-size: 1.5em;
    font-weight: bold;
    padding-bottom: 30px;
    text-align: center;
    color: blue;
  }
  @media(max-width: 800px) {
    max-width: 500px;
    width: 100%;
  }
`;

const Error = styled.div`
  color: red;
  font-weight: bold;
  font-size: 2rem;
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
  constructor(props) {
    super(props);
    this.state = {
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
      },
      errorMsg: {
        error: false,
        errorFood: "",
        errorCal: "",
        errorFats: "",
        errorCarbs: "",
        errorProteins: "",
        errorCategory: "",
        errorDate: "",
        errorQty: ""
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

  validate = () => {
    // debugger;
    const errorMsg = {
      errorFood: "",
      errorCal: "",
      errorFats: "",
      errorCarbs: "",
      errorProteins: "",
      errorCategory: "",
      errorDate: "",
      errorQty: "",
      error: false
    };

    if (!this.state.newAddFood.foodName) {
      errorMsg.errorFood = "Please provide name of food.";
      errorMsg.error = true;
    }
    if (!this.state.newAddFood.caloriesPerServ) {
      errorMsg.errorCal = "Please provide calories per serving.";
      errorMsg.error = true;
    }
    if (!this.state.newAddFood.fats) {
      errorMsg.errorFats = "Please provide grams of fat per serving.";
      errorMsg.error = true;
    }
    if (!this.state.newAddFood.carbs) {
      errorMsg.errorCarbs = "Please provide grams of carbs per serving.";
      errorMsg.error = true;
    }
    if (!this.state.newAddFood.proteins) {
      errorMsg.errorProteins = "Please provide grams of protein per serving.";
      errorMsg.error = true;
    }
    if (!this.state.newAddFood.meal_category_id) {
      errorMsg.errorCategory = "Please provide meal category.";
      errorMsg.error = true;
    }
    if (!this.state.newAddFood.date) {
      errorMsg.errorDate = "Please provide date of food entry.";
      errorMsg.error = true;
    }
    if (!this.state.newAddFood.servingQty) {
      errorMsg.errorQty = "Please provide number of servings.";
      errorMsg.error = true;
    }
    this.setState({ errorMsg });
  };

  onEntrySubmit = async e => {
    e.preventDefault();
    await this.validate();
    if (!this.state.errorMsg.error) {
      if (this.state.edamamExist === false) {
        const foodAddedToDB = {
          foodName: this.state.newAddFood.foodName,
          caloriesPerServ: parseInt(this.state.newAddFood.caloriesPerServ),
          fats: this.state.newAddFood.fats,
          carbs: this.state.newAddFood.carbs,
          proteins: this.state.newAddFood.proteins,
          edamam_id: this.state.newAddFood.edamam_id
        };
        // console.log("foodAddedToDB", foodAddedToDB);
        // console.log(this.state.newAddFood.meal_category_id);
        // console.log("servingqty", this.state.newAddFood.servingQty);
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
            this.props.addFoodEntry(entryAddedToDB);
            this.setState({
              // errors: [],
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
              // errors: [],
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
        const client = new ApolloClient({
          uri: "https://nutrition-tracker-be.herokuapp.com"
        });
        client
          .query({
            query: GET_ALL_FOOD
          })
          .then(response => {
            const filteredEdamam = response.data.getFoods.filter(food => {
              return food.edamam_id === this.props.selectedFood.foodId;
            });
            return filteredEdamam;
          })
          .then(response => {
            const foodId = response[0].id;
            const entryAddedToDB = {
              date: this.state.newAddFood.date,
              food_id: parseInt(foodId),
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
            this.props.addFoodEntry(entryAddedToDB);
            this.setState({
              // errors: [],
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
          .catch(err => {
            this.setState({
              // errors: [],
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
            console.error(err);
          });
      }
    } else {
      return;
    }
  };

  edamamExistCheck = edamam_id => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });
    client
      .query({
        query: GET_ALL_FOOD
      })
      .then(response => {
        const filteredEdamam = response.data.getFoods.some(food => {
          return food.edamam_id === edamam_id;
        });
        if (filteredEdamam) {
          this.setState({
            edamamExist: true
          });
          // console.log(this.state.edamamExist)
        } else {
          this.setState({
            edamamExist: false
          });
        }
      })
      .catch(err => console.error(err));
  };

  getEdamamData = edamam_id => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });
    client
      .query({
        query: GET_ALL_FOOD
      })
      .then(response => {
        const filteredEdamam = response.data.getFoods.filter(food => {
          return food.edamam_id === edamam_id;
        });

        return filteredEdamam;
      })
      .catch(err => console.error(err));
  };

  componentDidMount() {
    let foodName;
    let caloriesPerServ;
    let fats;
    let carbs;
    let proteins;
    let edamam_id;

    if (this.props.selectedFood) {
      foodName = this.props.selectedFood.label;
      caloriesPerServ =  this.props.selectedFood.nutrients.ENERC_KCAL ? this.props.selectedFood.nutrients.ENERC_KCAL.toFixed(2) : 0;
      fats = this.props.selectedFood.nutrients.FAT ? this.props.selectedFood.nutrients.FAT.toFixed(2) : 0;
      carbs = this.props.selectedFood.nutrients.CHOCDF ? this.props.selectedFood.nutrients.CHOCDF.toFixed(2) : 0;
      proteins = this.props.selectedFood.nutrients.PROCNT? this.props.selectedFood.nutrients.PROCNT.toFixed(2) : 0;
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
      });
      this.edamamExistCheck(this.props.selectedFood.foodId);
    }
  }

  componentDidUpdate(prevProps) {
    let foodName;
    let caloriesPerServ;
    let fats;
    let carbs;
    let proteins;
    let edamam_id;

    if (prevProps.selectedFood !== this.props.selectedFood) {
      foodName = this.props.selectedFood.label;
      caloriesPerServ =  this.props.selectedFood.nutrients.ENERC_KCAL ? this.props.selectedFood.nutrients.ENERC_KCAL.toFixed(2) : 0;
      fats = this.props.selectedFood.nutrients.FAT ? this.props.selectedFood.nutrients.FAT.toFixed(2) : 0;
      carbs = this.props.selectedFood.nutrients.CHOCDF ? this.props.selectedFood.nutrients.CHOCDF.toFixed(2) : 0;
      proteins = this.props.selectedFood.nutrients.PROCNT ? this.props.selectedFood.nutrients.PROCNT.toFixed(2) : 0;;
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
      });
      this.edamamExistCheck(this.props.selectedFood.foodId);
    }
  }

  render() {
    this.getCurrentUser(localStorage.getItem("token"));
    return (
      <Form>
        <h1> Add food entry</h1>
        <TextField
          required
          error={this.state.errorMsg.errorFood}
          autoFocus
          margin="dense"
          label="Food"
          className="form-field"
          type="text"
          placeholder="Add food here..."
          onChange={this.onInputChange}
          name="foodName"
          value={this.state.newAddFood.foodName}
          aria-describedby="errorFood-text"
        />
        <FormHelperText id="errorFood-text">
          {this.state.errorMsg.errorFood}
        </FormHelperText>

        <InputLabel htmlFor="meal_category_id">Meal Category</InputLabel>
        <Select
          autoFocus
          margin="dense"
          error={this.state.errorMsg.errorCategory}
          label="Meal Category"
          required
          className="form-field"
          name="meal_category_id"
          type="number"
          onChange={this.onInputChange}
          aria-describedby="errorCategory-text"
        >
          <MenuItem>Select Meal Category</MenuItem>
          <MenuItem value="1">breakfast</MenuItem>
          <MenuItem value="2">lunch</MenuItem>
          <MenuItem value="4">dinner</MenuItem>
          <MenuItem value="3">snack</MenuItem>
        </Select>
        <FormHelperText id="errorCategory-text">
          {this.state.errorMsg.errorCategory}
        </FormHelperText>

        <TextField
          autoFocus
          margin="dense"
          error={this.state.errorMsg.errorQty}
          label="Serving Quantity"
          className="form-field"
          type="number"
          name="servingQty"
          onChange={this.onInputChange}
          value={this.state.newAddFood.servingQty ? this.state.newAddFood.servingQty : ""}
          required
          aria-describedby="errorQty-text"
        />
        <FormHelperText id="errorQty-text">
          {this.state.errorMsg.errorQty}
        </FormHelperText>
        <TextField
          autoFocus
          margin="dense"
          error={this.state.errorMsg.errorCal}
          label="Calories per Serving"
          className="form-field"
          type="number"
          name="caloriesPerServ"
          onChange={this.onInputChange}
          value={
            this.state.newAddFood.caloriesPerServ
              ? this.state.newAddFood.caloriesPerServ
              : ""
          }
          required
          aria-describedby="errorCal-text"
        />
        <FormHelperText id="errorCal-text">
          {this.state.errorMsg.errorCal}
        </FormHelperText>

        <TextField
          autoFocus
          margin="dense"
          label="Grams of Protein per Serving"
          className="form-field"
          type="number"
          name="proteins"
          error={this.state.errorMsg.errorProteins}
          onChange={this.onInputChange}
          value={
            this.state.newAddFood.proteins ? this.state.newAddFood.proteins : ""
          }
          required
          aria-describedby="errorProteins-text"
        />
        <FormHelperText id="errorProteins-text">
          {this.state.errorMsg.errorProteins}
        </FormHelperText>

        <TextField
          label="Grams of Carbs per Serving"
          className="form-field"
          type="number"
          name="carbs"
          error={this.state.errorMsg.errorCarbs}
          onChange={this.onInputChange}
          value={this.state.newAddFood.carbs ? this.state.newAddFood.carbs : ""}
          required
          aria-describedby="errorCarbs-text"
        />
        <FormHelperText id="errorCarbs-text">
          {this.state.errorMsg.errorCarbs}
        </FormHelperText>

        <TextField
          label="Grams of Fat per Serving"
          className="form-field"
          type="number"
          name="fats"
          error={this.state.errorMsg.errorFats}
          onChange={this.onInputChange}
          value={this.state.newAddFood.fats ? this.state.newAddFood.fats : ""}
          required
          aria-describedby="errorFats-text"
        />
        <FormHelperText id="errorFats-text">
          {this.state.errorMsg.errorFats}
        </FormHelperText>

        <TextField
          label="Date"
          className="form-field"
          type="date"
          name="date"
          error={this.state.errorMsg.errorDate}
          onChange={this.onInputChange}
          required
          aria-describedby="errorDate-text"
          value={this.state.newAddFood.date ? this.state.newAddFood.date : ""}

        />
        <FormHelperText id="errorDate-text">
          {this.state.errorMsg.errorDate}
        </FormHelperText>
        <Button
          className="form-field"
          type="submit"
          onClick={this.onEntrySubmit}
        >
          Add Entry
        </Button>
        <Button onClick={this.props.closeFoodForm}> Close</Button>
      </Form>
    );
  }
}

export default EntryForm;
