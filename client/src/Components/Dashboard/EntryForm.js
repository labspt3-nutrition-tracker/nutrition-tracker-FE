import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import ApolloClient from "apollo-boost";
import { ADD_FOOD } from "../../graphql/mutations";
import { GET_ALL_FOOD, GET_CURRENT_USER_QUERY } from "../../graphql/queries";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formTitle: {
    fontFamily: "Oswald",
    fontWeight: 100,
    fontSize: "2.5rem"
  },
  input: {
    fontSize: 16,
    width: "100%",
    minWidth: "100%"
  },
  formButton: {
    fontSize: 16,
    width: "100%"
  },
  category: {
    fontSize: "1.6rem",
    fontFamily: "Oswald"
  }
});

const Error = styled.div`
  color: red;
  font-weight: bold;
  font-size: 2rem;
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
        date: moment(Date.now()).format("YYYY-MM-DD"),
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
      uri: "https://nutrition-tracker-be.herokuapp.com/",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT_USER_QUERY
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
        const client = new ApolloClient({
          uri: "https://nutrition-tracker-be.herokuapp.com/"
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
            this.props.addFoodEntry(entryAddedToDB);
            this.setState({
              edamamExist: false,
              newAddFood: {
                foodName: "",
                caloriesPerServ: null,
                fats: null,
                carbs: null,
                proteins: null,
                edamam_id: null,
                meal_category_id: null,
                date: moment().format("YYYY-MM-DD"),
                servingQty: null
              }
            });
          })
          .catch(err => {
            this.setState({
              edamamExist: false,
              newFoodEntry: {
                foodName: "",
                caloriesPerServ: null,
                fats: null,
                carbs: null,
                proteins: null,
                edamam_id: null,
                meal_category_id: null,
                date: moment().format("YYYY-MM-DD"),
                servingQty: null
              }
            });
          });
      } else {
        const client = new ApolloClient({
          uri: "https://nutrition-tracker-be.herokuapp.com/"
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
              edamamExist: false,
              newAddFood: {
                foodName: "",
                caloriesPerServ: null,
                fats: null,
                carbs: null,
                proteins: null,
                edamam_id: null,
                meal_category_id: null,
                date: moment().format("YYYY-MM-DD"),
                servingQty: null
              }
            });
          })
          .catch(err => {
            this.setState({
              edamamExist: false,
              newAddFood: {
                foodName: "",
                caloriesPerServ: null,
                fats: null,
                carbs: null,
                proteins: null,
                edamam_id: null,
                meal_category_id: null,
                date: moment().format("YYYY-MM-DD"),
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
      uri: "https://nutrition-tracker-be.herokuapp.com/"
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
      uri: "https://nutrition-tracker-be.herokuapp.com/"
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
      caloriesPerServ = this.props.selectedFood.nutrients.ENERC_KCAL
        ? this.props.selectedFood.nutrients.ENERC_KCAL.toFixed(2)
        : 0.0;
      fats = this.props.selectedFood.nutrients.FAT
        ? this.props.selectedFood.nutrients.FAT.toFixed(2)
        : 0.0;
      carbs = this.props.selectedFood.nutrients.CHOCDF
        ? this.props.selectedFood.nutrients.CHOCDF.toFixed(2)
        : 0.0;
      proteins = this.props.selectedFood.nutrients.PROCNT
        ? this.props.selectedFood.nutrients.PROCNT.toFixed(2)
        : 0.0;
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
      caloriesPerServ = this.props.selectedFood.nutrients.ENERC_KCAL
        ? this.props.selectedFood.nutrients.ENERC_KCAL.toFixed(2)
        : 0.0;
      fats = this.props.selectedFood.nutrients.FAT
        ? this.props.selectedFood.nutrients.FAT.toFixed(2)
        : 0.0;
      carbs = this.props.selectedFood.nutrients.CHOCDF
        ? this.props.selectedFood.nutrients.CHOCDF.toFixed(2)
        : 0.0;
      proteins = this.props.selectedFood.nutrients.PROCNT
        ? this.props.selectedFood.nutrients.PROCNT.toFixed(2)
        : 0.0;
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
      <Container className="form-container">
        <Typography className={classes.formTitle} variant="h4">
          Add food entry
        </Typography>
        <TextField
          className={classes.input}
          required
          error={this.state.errorMsg.errorFood}
          autoFocus
          margin="dense"
          label="Food"
          type="text"
          placeholder="Add food here..."
          onChange={this.onInputChange}
          name="foodName"
          value={this.state.newAddFood.foodName}
          aria-describedby="errorFood-text"
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
        />
        <FormHelperText id="errorFood-text">
          {this.state.errorMsg.errorFood}
        </FormHelperText>

        <InputLabel className={classes.label} htmlFor="meal_category_id">
          Meal Category
        </InputLabel>
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
          <MenuItem value="1" className={classes.category}>
            breakfast
          </MenuItem>
          <MenuItem value="2" className={classes.category}>
            lunch
          </MenuItem>
          <MenuItem value="4" className={classes.category}>
            dinner
          </MenuItem>
          <MenuItem value="3" className={classes.category}>
            snack
          </MenuItem>
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
          value={
            this.state.newAddFood.servingQty
              ? this.state.newAddFood.servingQty
              : ""
          }
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
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
          value={this.state.newAddFood.caloriesPerServ}
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
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
          value={this.state.newAddFood.proteins}
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
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
          value={this.state.newAddFood.carbs}
          required
          aria-describedby="errorCarbs-text"
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
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
          value={this.state.newAddFood.fats}
          required
          aria-describedby="errorFats-text"
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
        />
        <FormHelperText id="errorFats-text">
          {this.state.errorMsg.errorFats}
        </FormHelperText>

        <TextField
          label="Date"
          className="form-field"
          type="date"
          name="date"
          onChange={this.onInputChange}
          aria-describedby="errorDate-text"
          defaultValue={moment().format("YYYY-MM-DD")}
          value={
            this.state.newAddFood.date
              ? this.state.newAddFood.date
              : moment().format("YYYY-MM-DD")
          }
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
        />
        <Button
          className={classes.formButton}
          type="submit"
          onClick={this.onEntrySubmit}
        >
          Add Entry
        </Button>
        {this.props.searchedFood && (
          <Button
            className={classes.formButton}
            onClick={this.props.closeFoodForm}
          >
            {" "} 
            Add searched Item
          </Button>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(EntryForm);
