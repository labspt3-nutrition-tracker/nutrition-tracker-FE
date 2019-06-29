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
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { GET_CURRENT_USERID } from "../../graphql/queries";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const styles = theme => ({
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#5E366A",
    textTransform: "uppercase",
    fontFamily: "Oswald",
    margin: "3% 0"
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

const JournalDateTitle = styled.h1`
  font-family: "Oxygen", sans-serif;
  font-size: 2em;
  color: #2c363f;
  margin-bottom: 5px;

  &:after {
    border-bottom: 4px solid #40a798;
    display: block;
    margin-top: 3px;
    margin-left: 15%;
    content: " ";
    width: 45%;
  }

  @media (max-width: 1200px) {
    font-size: 1.7em;
  }

  @media (max-width: 800px) {
    font-size: 1.2em;

    &:after {
      width: 20%;
      margin-left: 45%;
    }
  }

  @media (max-width: 500px) {
    font-size: 1em;
    font-weight: bold;
  }
`;

const CategoryTitle = styled.h1`
  padding-top: 15px;
  font-size: 1.7em;
  color: #2c363f;
  font-family: "Oxygen", sans-serif;
  padding-bottom: 20px;
`;

const EntryItems = styled.p`
  color: #40a798;
  font-weight: 500;
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
        currentUser: 0,
        openBreakfast: false,
        openLunch: false,
        openDinner: false,
        openSnack: false
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

  handleClickBreakfast = () => {
    this.setState(prevState => {
      return { openBreakfast: !prevState.openBreakfast };
    });
  };

  handleClickLunch = () => {
    this.setState(prevState => {
      return { openLunch: !prevState.openLunch };
    });
  };

  handleClickDinner = () => {
    this.setState(prevState => {
      return { openDinner: !prevState.openDinner };
    });
  };

  handleClickSnack = () => {
    this.setState(prevState => {
      return { openSnack: !prevState.openSnack };
    });
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
      <div>
        <h2 className={classes.header}>{this.props.datePicked}</h2>
        <List component="nav" className={classes.root}>
          <ListItem button onClick={this.handleClickBreakfast}>
            <ListItemText primary="Breakfast" />
            {this.state.openBreakfast ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openBreakfast} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {Breakfast.length > 0 ? (
                Breakfast.map(breakfast => {
                  return (
                    <>
                      <ListItem
                        key={breakfast.id}
                        button
                        onClick={() => this.passMealData(breakfast)}
                      >
                        <ListItemText primary={breakfast.food_id.foodName} />
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
                <ListItem button className={classes.nested}>
                  <ListItemText primary="No Breakfast entries have been added" />
                </ListItem>
              )}
            </List>
          </Collapse>
        </List>

        <ListItem button onClick={this.handleClickLunch}>
          <ListItemText primary="Lunch" />
          {this.state.openLunch ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.openLunch} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {Lunch.length > 0 ? (
              Lunch.map(lunch => {
                return (
                  <>
                    <ListItem
                      key={lunch.id}
                      button
                      onClick={() => this.passMealData(lunch)}
                    >
                      <ListItemText primary={lunch.food_id.foodName} />
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
                            placeholder={`${this.state.mealEntry.food_id.fats}`}
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
              <ListItem button className={classes.nested}>
                <ListItemText primary="No Lunch entries have been added" />
              </ListItem>
            )}
          </List>
        </Collapse>
        {/* <CategoryTitle>Dinner</CategoryTitle> */}
        <ListItem button onClick={this.handleClickDinner}>
          <ListItemText primary="Dinner" />
          {this.state.openDinner ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.openDinner} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {Dinner.length > 0 ? (
              Dinner.map(dinner => {
                return (
                  <>
                    <ListItem
                      key={dinner.id}
                      button
                      onClick={() => this.passMealData(dinner)}
                    >
                      <ListItemText primary={dinner.food_id.foodName} />
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
                            placeholder={`${this.state.mealEntry.food_id.fats}`}
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
              <ListItem button className={classes.nested}>
                <ListItemText primary="No Dinner entries have been added" />
              </ListItem>
            )}
          </List>
        </Collapse>

        {/* <CategoryTitle>Snacks</CategoryTitle> */}
        <ListItem button onClick={this.handleClickSnack}>
          <ListItemText primary="Snack" />
          {this.state.openSnack ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.openSnack} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {Snack.length > 0 ? (
              Snack.map(snack => {
                return (
                  <>
                    <ListItem
                      key={snack.id}
                      button
                      onClick={() => this.passMealData(snack)}
                    >
                      <ListItemText primary={snack.food_id.foodName} />
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
                            placeholder={`${this.state.mealEntry.food_id.fats}`}
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
              <ListItem button className={classes.nested}>
                <ListItemText primary="No snack entries have been added" />
              </ListItem>
            )}
          </List>
        </Collapse>
        {/* <div>
          {Snack.length > 0 ? (
            [...Snack].map(snack => {
              return (
                <div key={snack.id}>
                  <EntryItems
                    EntryItems
                    onClick={() => this.passMealData(snack)}
                  >
                    {snack.food_id.foodName}
                  </EntryItems>

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
                          placeholder={`${
                            this.state.mealEntry.food_id.servingQty
                          }`}
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
                          placeholder={`${this.state.mealEntry.food_id.carbs}`}
                          value={this.state.carbs}
                          margin="dense"
                          onChange={this.handleChange}
                        />
                        <TextField
                          id="Fats"
                          name="fats"
                          label="Fats"
                          placeholder={`${this.state.mealEntry.food_id.fats}`}
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
                            <em> None </em>
                          </MenuItem>
                          <MenuItem value={1}> Breakfast </MenuItem>
                          <MenuItem value={2}> Lunch </MenuItem>
                          <MenuItem value={4}> Dinner </MenuItem>
                          <MenuItem value={3}> Snack </MenuItem>
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
                          placeholder={`${this.state.mealEntry}`}
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
                </div>
              );
            })
          ) : (
            <EntryItems>No Snack entries have been added</EntryItems>
          )}
        </div> */}
      </div>
    );
  }
}

export default withStyles(styles)(JournalEntry);
