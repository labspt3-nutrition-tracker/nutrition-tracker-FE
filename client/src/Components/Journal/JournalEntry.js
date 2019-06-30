import React from "react";
import styled from "styled-components";
import moment from "moment";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { GET_CURRENT_USERID } from "../../graphql/queries";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const styles = theme => ({
  root: {
    marginBottom: 20
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#5E366A",
    textTransform: "uppercase",
    fontFamily: "Oswald",
    margin: "3% 0"
  },
  mealCategory: {
    color: "#60B5A9",
    fontSize: "1.8rem",
    fontFamily: "Oswald",
    width: "40%"
  },
  foodEntry: {
    fontSize: "1.8rem",
    paddingLeft: "10px",
    fontFamily: "Oswald"
  }
});

const GET_FOOD_BY_ID = gql`
  query getFoodById($foodId: ID!) {
    getFoodById(foodId: $foodId) {
      id
      edamam_id
    }
  }
`;

const MealModal = styled(Modal)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10% 20%;
  padding: 10%;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  z-index: 1000;
`;

class JournalEntry extends React.Component {
  constructor(props) {
    super(props);

    const { foodEntries } = props;
    this.state = {
      foodEntries: foodEntries,
      edamamExist: false,
      journalEntry: {
        date: null,
        foodName: null,
        servingQty: null,
        caloriesPerServ: null,
        proteins: null,
        carbs: null,
        fats: null,
        mealEntry: [],
        user_id: null,
        food_id: null,
        meal_category_id: null,
        showModal: false,
        currentUser: 0
      }
    };
  }

  componentDidMount() {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT_USERID
      })
      .then(response => {
        this.setState({ currentUser: response.data.getCurrentUser.id });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mealEntry !== this.props.mealEntry) {
      this.setState({ mealEntry: this.props.mealEntry });
    }
  }

  passMealData = mealEntry => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .query({
        query: GET_FOOD_BY_ID,
        variables: {
          foodId: mealEntry.food_id.id
        }
      })
      .then(response => {
        if (response.data.getFoodById.edamam_id !== "") {
          this.setState({
            edamamExist: true,
            caloriesPerServ: mealEntry.caloriesPerServ,
            proteins: mealEntry.proteins,
            carbs: mealEntry.carbs,
            fats: mealEntry.fats
          });
        } else {
          this.setState({
            edamamExist: false
          });
        }
      })
      .catch(err => console.log(err));

    this.setState({
      mealEntry: mealEntry
    });

    this.openModal();
  };

  openModal = () => {
    if (!this.state.showModal) {
      this.setState({
        showModal: true
      });
    } else {
      this.setState({
        showModal: true
      });
    }
  };

  closeModal = () => {
    if (this.state.showModal) {
      this.setState({
        showModal: false
      });
    } else {
      this.setState({
        showModal: true
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  deleteMealEntry = e => {
    e.preventDefault();
    this.props.deleteMeal(this.state.mealEntry.id);

    this.closeModal();
  };

  editMealEntry = e => {
    e.preventDefault();

    const foodEntry = {
      foodName: this.state.mealEntry.food_id.foodName,
      caloriesPerServ: this.state.caloriesPerServ
        ? parseInt(this.state.caloriesPerServ)
        : this.state.mealEntry.food_id.caloriesPerServ,
      fats: this.state.fats
        ? parseInt(this.state.fats)
        : this.state.mealEntry.food_id.fats,
      carbs: this.state.carbs
        ? parseInt(this.state.carbs)
        : this.state.mealEntry.food_id.carbs,
      proteins: this.state.proteins
        ? parseInt(this.state.proteins)
        : this.state.mealEntry.food_id.proteins,
      date: this.state.date ? this.state.date : this.state.mealEntry.date,
      food_id: this.state.mealEntry.food_id.id,
      user_id: this.state.currentUser,
      meal_category_id: this.state.meal_category_id
        ? this.state.meal_category_id
        : this.state.mealEntry.meal_category_id.id,
      servingQty: this.state.servingQty
        ? parseInt(this.state.servingQty)
        : this.state.mealEntry.servingQty
    };

    this.props.editMeal(
      this.state.mealEntry.id,
      this.state.mealEntry.food_id.id,
      foodEntry
    );

    this.closeModal();
  };

  render() {
    const { classes } = this.props;
    const datePicked = this.props.datePicked;
    const ModifiedEntry = this.state.foodEntries.filter(function(entry) {
      //  return entry.date === datePicked;
      return (
        moment(new Date(entry.date)).format("MM/DD") ===
        moment(new Date(datePicked)).format("MM/DD")
      );
    });
    // set as new foodentries
    const Breakfast = ModifiedEntry.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Breakfast";
    });

    const Lunch = ModifiedEntry.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Lunch";
    });

    const Dinner = ModifiedEntry.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Dinner";
    });

    const Snack = ModifiedEntry.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Snack";
    });

    return (
      <div className={classes.root}>
        <h2 className={classes.header}>{this.props.datePicked}</h2>
        <List className={classes.root} disablePadding dense>
          <ListItem>
            <ListItemText
              primary="Breakfast"
              classes={{ primary: classes.mealCategory }}
            />
            <List component="div" disablePadding dense>
              {Breakfast.length > 0 ? (
                Breakfast.map(breakfast => {
                  return (
                    <>
                      <ListItem
                        key={breakfast.id}
                        button
                        onClick={() => this.passMealData(breakfast)}
                      >
                        <ListItemText
                          primary={breakfast.food_id.foodName}
                          classes={{ primary: classes.foodEntry }}
                        />
                      </ListItem>
                      {this.state.mealEntry && !this.state.edamamExist && (
                        <MealModal isOpen={this.state.showModal}>
                          <div>
                            <Button onClick={this.closeModal}>exit</Button>
                          </div>
                          <div>{this.state.mealEntry.food_id.foodName}</div>
                          <form>
                            <label htmlFor="date">Date</label>
                            <input
                              className="form-field"
                              type="date"
                              name="date"
                              onChange={this.handleChange}
                            />

                            <TextField
                              id="Serving Quantity"
                              name="servingQty"
                              label="Serving Quantity"
                              placeholder={`${this.state.mealEntry.servingQty}`}
                              value={this.state.servingQty}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Calories Per Serving"
                              name="caloriesPerServ"
                              label="Calories Per Serving"
                              placeholder={`${
                                this.state.mealEntry.food_id.caloriesPerServ
                              }`}
                              value={this.state.caloriesPerServ}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Protein"
                              name="proteins"
                              label="Protein"
                              placeholder={`${
                                this.state.mealEntry.food_id.proteins
                              }`}
                              value={this.state.proteins}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Carbs"
                              name="carbs"
                              label="Carbs"
                              placeholder={`${
                                this.state.mealEntry.food_id.carbs
                              }`}
                              value={this.state.carbs}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Fats"
                              name="fats"
                              label="Fats"
                              placeholder={`${
                                this.state.mealEntry.food_id.fats
                              }`}
                              value={this.state.fats}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <InputLabel htmlFor="meal-simple">
                              MealCategory
                            </InputLabel>
                            <Select
                              value={this.state.meal_category_id}
                              onChange={this.handleChange}
                              inputProps={{
                                name: "meal_category_id",
                                id: "meal-simple"
                              }}
                            >
                              <MenuItem value={null}>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={1}>Breakfast</MenuItem>
                              <MenuItem value={2}>Lunch</MenuItem>
                              <MenuItem value={4}>Dinner</MenuItem>
                              <MenuItem value={3}>Snack</MenuItem>
                            </Select>
                          </form>
                          <div>
                            <Button
                              onClick={this.deleteMealEntry}
                              variant="contained"
                              color="secondary"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={this.editMealEntry}
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </div>
                        </MealModal>
                      )}

                      {this.state.mealEntry && this.state.edamamExist && (
                        <MealModal isOpen={this.state.showModal}>
                          <div>
                            <Button onClick={this.closeModal}>exit</Button>
                          </div>
                          <div>{this.state.mealEntry.food_id.foodName}</div>
                          <form>
                            <label htmlFor="date">Date</label>
                            <input
                              className="form-field"
                              type="date"
                              name="date"
                              onChange={this.handleChange}
                            />

                            <TextField
                              id="Serving Quantity"
                              name="servingQty"
                              label="Serving Quantity"
                              placeholder={`${this.state.mealEntry.servingQty}`}
                              value={this.state.servingQty}
                              margin="dense"
                              onChange={this.handleChange}
                            />

                            <InputLabel htmlFor="meal-simple">
                              MealCategory
                            </InputLabel>
                            <Select
                              value={this.state.meal_category_id}
                              onChange={this.handleChange}
                              inputProps={{
                                name: "meal_category_id",
                                id: "meal-simple"
                              }}
                            >
                              <MenuItem value={null}>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={1}>Breakfast</MenuItem>
                              <MenuItem value={2}>Lunch</MenuItem>
                              <MenuItem value={4}>Dinner</MenuItem>
                              <MenuItem value={3}>Snack</MenuItem>
                            </Select>
                          </form>
                          <div>
                            <Button
                              onClick={this.deleteMealEntry}
                              variant="contained"
                              color="secondary"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={this.editMealEntry}
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </div>
                        </MealModal>
                      )}
                    </>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No Breakfast entries"
                    classes={{ primary: classes.foodEntry }}
                  />
                </ListItem>
              )}
            </List>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Lunch"
              classes={{ primary: classes.mealCategory }}
            />
            <List component="div" disablePadding dense>
              {Lunch.length > 0 ? (
                Lunch.map(lunch => {
                  return (
                    <>
                      <ListItem
                        key={lunch.id}
                        button
                        onClick={() => this.passMealData(lunch)}
                      >
                        <ListItemText
                          primary={lunch.food_id.foodName}
                          classes={{ primary: classes.foodEntry }}
                        />
                      </ListItem>
                      {this.state.mealEntry && !this.state.edamamExist && (
                        <MealModal isOpen={this.state.showModal}>
                          <div>
                            <Button onClick={this.closeModal}>exit</Button>
                          </div>
                          <div>{this.state.mealEntry.food_id.foodName}</div>
                          <form>
                            <label htmlFor="date">Date</label>
                            <input
                              className="form-field"
                              type="date"
                              name="date"
                              onChange={this.handleChange}
                            />

                            <TextField
                              id="Serving Quantity"
                              name="servingQty"
                              label="Serving Quantity"
                              placeholder={`${this.state.mealEntry.servingQty}`}
                              value={this.state.servingQty}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Calories Per Serving"
                              name="caloriesPerServ"
                              label="Calories Per Serving"
                              placeholder={`${
                                this.state.mealEntry.food_id.caloriesPerServ
                              }`}
                              value={this.state.caloriesPerServ}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Protein"
                              name="proteins"
                              label="Protein"
                              placeholder={`${
                                this.state.mealEntry.food_id.proteins
                              }`}
                              value={this.state.proteins}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Carbs"
                              name="carbs"
                              label="Carbs"
                              placeholder={`${
                                this.state.mealEntry.food_id.carbs
                              }`}
                              value={this.state.carbs}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Fats"
                              name="fats"
                              label="Fats"
                              placeholder={`${
                                this.state.mealEntry.food_id.fats
                              }`}
                              value={this.state.fats}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <InputLabel htmlFor="meal-simple">
                              MealCategory
                            </InputLabel>
                            <Select
                              value={this.state.meal_category_id}
                              onChange={this.handleChange}
                              inputProps={{
                                name: "meal_category_id",
                                id: "meal-simple"
                              }}
                            >
                              <MenuItem value={null}>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={1}>Breakfast</MenuItem>
                              <MenuItem value={2}>Lunch</MenuItem>
                              <MenuItem value={4}>Dinner</MenuItem>
                              <MenuItem value={3}>Snack</MenuItem>
                            </Select>
                          </form>
                          <div>
                            <Button
                              onClick={this.deleteMealEntry}
                              variant="contained"
                              color="secondary"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={this.editMealEntry}
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </div>
                        </MealModal>
                      )}

                      {this.state.mealEntry && this.state.edamamExist && (
                        <MealModal isOpen={this.state.showModal}>
                          <div>
                            <Button onClick={this.closeModal}>exit</Button>
                          </div>
                          <div>{this.state.mealEntry.food_id.foodName}</div>
                          <form>
                            <label htmlFor="date">Date</label>
                            <input
                              className="form-field"
                              type="date"
                              name="date"
                              onChange={this.handleChange}
                            />

                            <TextField
                              id="Serving Quantity"
                              name="servingQty"
                              label="Serving Quantity"
                              placeholder={`${this.state.mealEntry.servingQty}`}
                              value={this.state.servingQty}
                              margin="dense"
                              onChange={this.handleChange}
                            />

                            <InputLabel htmlFor="meal-simple">
                              MealCategory
                            </InputLabel>
                            <Select
                              value={this.state.meal_category_id}
                              onChange={this.handleChange}
                              inputProps={{
                                name: "meal_category_id",
                                id: "meal-simple"
                              }}
                            >
                              <MenuItem value={null}>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={1}>Breakfast</MenuItem>
                              <MenuItem value={2}>Lunch</MenuItem>
                              <MenuItem value={4}>Dinner</MenuItem>
                              <MenuItem value={3}>Snack</MenuItem>
                            </Select>
                          </form>
                          <div>
                            <Button
                              onClick={this.deleteMealEntry}
                              variant="contained"
                              color="secondary"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={this.editMealEntry}
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </div>
                        </MealModal>
                      )}
                    </>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No Lunch entries"
                    classes={{ primary: classes.foodEntry }}
                  />
                </ListItem>
              )}
            </List>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Dinner"
              classes={{ primary: classes.mealCategory }}
            />
            <List component="div" disablePadding dense>
              {Dinner.length > 0 ? (
                Dinner.map(dinner => {
                  return (
                    <>
                      <ListItem
                        key={dinner.id}
                        button
                        onClick={() => this.passMealData(dinner)}
                      >
                        <ListItemText
                          primary={dinner.food_id.foodName}
                          classes={{ primary: classes.foodEntry }}
                        />
                      </ListItem>
                      {this.state.mealEntry && !this.state.edamamExist && (
                        <MealModal isOpen={this.state.showModal}>
                          <div>
                            <Button onClick={this.closeModal}>exit</Button>
                          </div>
                          <div>{this.state.mealEntry.food_id.foodName}</div>
                          <form>
                            <label htmlFor="date">Date</label>
                            <input
                              className="form-field"
                              type="date"
                              name="date"
                              onChange={this.handleChange}
                            />

                            <TextField
                              id="Serving Quantity"
                              name="servingQty"
                              label="Serving Quantity"
                              placeholder={`${this.state.mealEntry.servingQty}`}
                              value={this.state.servingQty}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Calories Per Serving"
                              name="caloriesPerServ"
                              label="Calories Per Serving"
                              placeholder={`${
                                this.state.mealEntry.food_id.caloriesPerServ
                              }`}
                              value={this.state.caloriesPerServ}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Protein"
                              name="proteins"
                              label="Protein"
                              placeholder={`${
                                this.state.mealEntry.food_id.proteins
                              }`}
                              value={this.state.proteins}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Carbs"
                              name="carbs"
                              label="Carbs"
                              placeholder={`${
                                this.state.mealEntry.food_id.carbs
                              }`}
                              value={this.state.carbs}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Fats"
                              name="fats"
                              label="Fats"
                              placeholder={`${
                                this.state.mealEntry.food_id.fats
                              }`}
                              value={this.state.fats}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <InputLabel htmlFor="meal-simple">
                              MealCategory
                            </InputLabel>
                            <Select
                              value={this.state.meal_category_id}
                              onChange={this.handleChange}
                              inputProps={{
                                name: "meal_category_id",
                                id: "meal-simple"
                              }}
                            >
                              <MenuItem value={null}>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={1}>Breakfast</MenuItem>
                              <MenuItem value={2}>Lunch</MenuItem>
                              <MenuItem value={4}>Dinner</MenuItem>
                              <MenuItem value={3}>Snack</MenuItem>
                            </Select>
                          </form>
                          <div>
                            <Button
                              onClick={this.deleteMealEntry}
                              variant="contained"
                              color="secondary"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={this.editMealEntry}
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </div>
                        </MealModal>
                      )}

                      {this.state.mealEntry && this.state.edamamExist && (
                        <MealModal isOpen={this.state.showModal}>
                          <div>
                            <Button onClick={this.closeModal}>exit</Button>
                          </div>
                          <div>{this.state.mealEntry.food_id.foodName}</div>
                          <form>
                            <label htmlFor="date">Date</label>
                            <input
                              className="form-field"
                              type="date"
                              name="date"
                              onChange={this.handleChange}
                            />

                            <TextField
                              id="Serving Quantity"
                              name="servingQty"
                              label="Serving Quantity"
                              placeholder={`${this.state.mealEntry.servingQty}`}
                              value={this.state.servingQty}
                              margin="dense"
                              onChange={this.handleChange}
                            />

                            <InputLabel htmlFor="meal-simple">
                              MealCategory
                            </InputLabel>
                            <Select
                              value={this.state.meal_category_id}
                              onChange={this.handleChange}
                              inputProps={{
                                name: "meal_category_id",
                                id: "meal-simple"
                              }}
                            >
                              <MenuItem value={null}>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={1}>Breakfast</MenuItem>
                              <MenuItem value={2}>Lunch</MenuItem>
                              <MenuItem value={4}>Dinner</MenuItem>
                              <MenuItem value={3}>Snack</MenuItem>
                            </Select>
                          </form>
                          <div>
                            <Button
                              onClick={this.deleteMealEntry}
                              variant="contained"
                              color="secondary"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={this.editMealEntry}
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </div>
                        </MealModal>
                      )}
                    </>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No Dinner entries"
                    classes={{ primary: classes.foodEntry }}
                  />
                </ListItem>
              )}
            </List>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Snack"
              classes={{ primary: classes.mealCategory }}
            />
            <List component="div" disablePadding dense>
              {Snack.length > 0 ? (
                Snack.map(snack => {
                  return (
                    <>
                      <ListItem
                        key={snack.id}
                        button
                        onClick={() => this.passMealData(snack)}
                      >
                        <ListItemText
                          primary={snack.food_id.foodName}
                          classes={{ primary: classes.foodEntry }}
                        />
                      </ListItem>
                      {this.state.mealEntry && !this.state.edamamExist && (
                        <MealModal isOpen={this.state.showModal}>
                          <div>
                            <Button onClick={this.closeModal}>exit</Button>
                          </div>
                          <div>{this.state.mealEntry.food_id.foodName}</div>
                          <form>
                            <label htmlFor="date">Date</label>
                            <input
                              className="form-field"
                              type="date"
                              name="date"
                              onChange={this.handleChange}
                            />

                            <TextField
                              id="Serving Quantity"
                              name="servingQty"
                              label="Serving Quantity"
                              placeholder={`${this.state.mealEntry.servingQty}`}
                              value={this.state.servingQty}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Calories Per Serving"
                              name="caloriesPerServ"
                              label="Calories Per Serving"
                              placeholder={`${
                                this.state.mealEntry.food_id.caloriesPerServ
                              }`}
                              value={this.state.caloriesPerServ}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Protein"
                              name="proteins"
                              label="Protein"
                              placeholder={`${
                                this.state.mealEntry.food_id.proteins
                              }`}
                              value={this.state.proteins}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Carbs"
                              name="carbs"
                              label="Carbs"
                              placeholder={`${
                                this.state.mealEntry.food_id.carbs
                              }`}
                              value={this.state.carbs}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <TextField
                              id="Fats"
                              name="fats"
                              label="Fats"
                              placeholder={`${
                                this.state.mealEntry.food_id.fats
                              }`}
                              value={this.state.fats}
                              margin="dense"
                              onChange={this.handleChange}
                            />
                            <InputLabel htmlFor="meal-simple">
                              MealCategory
                            </InputLabel>
                            <Select
                              value={this.state.meal_category_id}
                              onChange={this.handleChange}
                              inputProps={{
                                name: "meal_category_id",
                                id: "meal-simple"
                              }}
                            >
                              <MenuItem value={null}>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={1}>Breakfast</MenuItem>
                              <MenuItem value={2}>Lunch</MenuItem>
                              <MenuItem value={4}>Dinner</MenuItem>
                              <MenuItem value={3}>Snack</MenuItem>
                            </Select>
                          </form>
                          <div>
                            <Button
                              onClick={this.deleteMealEntry}
                              variant="contained"
                              color="secondary"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={this.editMealEntry}
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </div>
                        </MealModal>
                      )}

                      {this.state.mealEntry && this.state.edamamExist && (
                        <MealModal isOpen={this.state.showModal}>
                          <div>
                            <Button onClick={this.closeModal}>exit</Button>
                          </div>
                          <div>{this.state.mealEntry.food_id.foodName}</div>
                          <form>
                            <label htmlFor="date">Date</label>
                            <input
                              className="form-field"
                              type="date"
                              name="date"
                              onChange={this.handleChange}
                            />

                            <TextField
                              id="Serving Quantity"
                              name="servingQty"
                              label="Serving Quantity"
                              placeholder={`${this.state.mealEntry.servingQty}`}
                              value={this.state.servingQty}
                              margin="dense"
                              onChange={this.handleChange}
                            />

                            <InputLabel htmlFor="meal-simple">
                              MealCategory
                            </InputLabel>
                            <Select
                              value={this.state.meal_category_id}
                              onChange={this.handleChange}
                              inputProps={{
                                name: "meal_category_id",
                                id: "meal-simple"
                              }}
                            >
                              <MenuItem value={null}>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={1}>Breakfast</MenuItem>
                              <MenuItem value={2}>Lunch</MenuItem>
                              <MenuItem value={4}>Dinner</MenuItem>
                              <MenuItem value={3}>Snack</MenuItem>
                            </Select>
                          </form>
                          <div>
                            <Button
                              onClick={this.deleteMealEntry}
                              variant="contained"
                              color="secondary"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={this.editMealEntry}
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </div>
                        </MealModal>
                      )}
                    </>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No snack entries"
                    classes={{ primary: classes.foodEntry }}
                  />
                </ListItem>
              )}
            </List>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(JournalEntry);
