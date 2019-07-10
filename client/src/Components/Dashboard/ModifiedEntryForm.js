import React, { Component } from "react";
import styled from "styled-components";
// import { Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import { ADD_FOOD } from "../../graphql/mutations";
import { GET_ALL_FOOD } from "../../graphql/queries";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const Form = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 30%;
  padding: 20px;
  max-height: 100vh;
  overflow-y: auto;
  @media(max-width: 800px) {
    max-width: 500px;
    width: 100%;
  }

  h1 {
    font-size: 1.5em;
    font-weight: bold;
    padding-bottom: 30px;
    text-align: center;
    color: blue;
  }

  h3 {
    color: blue;
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

const styles = theme => ({
  formButton: {
    fontSize: 16
  }
});

class ModifiedEntryForm extends Component {
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

  onEntrySubmit = e => {
    e.preventDefault();
    this.validate();
    if (!this.state.errorMsg.error) {
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
                meal_category_id: parseInt(
                  this.state.newAddFood.meal_category_id
                )
              };
              this.props.addFoodEntry(entryAddedToDB);
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
          this.setState({ errors: ["meal category is required"] });
        }
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
            this.props.addFoodEntry(entryAddedToDB);
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
            this.props.revertToNormalForm();
          })
          .catch(err => {
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
      caloriesPerServ = this.props.selectedFood.nutrients.ENERC_KCAL;
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
      caloriesPerServ = this.props.selectedFood.nutrients.ENERC_KCAL;
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
      });
      this.edamamExistCheck(this.props.selectedFood.foodId);
    }
  }

  render() {
    const { classes } = this.props;
    this.getCurrentUser(localStorage.getItem("token"));
    return (
      <Form>
        <Typography variant="h4">Add food entry</Typography>
        <label htmlFor="foodName">Food</label>

        <h3>{this.state.newAddFood.foodName}</h3>

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
          value={this.state.newAddFood.meal_category_id}
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
          label="Serving Quantity"
          className="form-field"
          type="number"
          name="servingQty"
          onChange={this.onInputChange}
        />

        <label htmlFor="caloriesPerServ">Calories per serving</label>
        <h3>
          {this.state.newAddFood.caloriesPerServ
            ? this.state.newAddFood.caloriesPerServ.toFixed(2)
            : 0}
        </h3>

        <label htmlFor="proteins">Grams of Protein per Serving</label>
        <h3>
          {this.state.newAddFood.proteins
            ? this.state.newAddFood.proteins.toFixed(2)
            : 0}
        </h3>
        <label htmlFor="carbs">Grams of Carbs per Serving</label>
        <h3>
          {" "}
          {this.state.newAddFood.carbs
            ? this.state.newAddFood.carbs.toFixed(2)
            : 0}
        </h3>
        <label htmlFor="fats">Grams of Fat per Serving</label>
        <h3>
          {this.state.newAddFood.fats
            ? this.state.newAddFood.fats.toFixed(2)
            : ""}
        </h3>

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
          className={classes.formButton}
          type="submit"
          onClick={this.onEntrySubmit}
        >
          Add Entry
        </Button>
        <Button className={classes.formButton} onClick={this.props.handleShowFood}>
          I'll add my own entry
        </Button>
      </Form>
    );
  }
}

export default withStyles(styles)(ModifiedEntryForm);
