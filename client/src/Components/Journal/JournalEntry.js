import React from "react";
import styled from "styled-components";
import moment from "moment";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { GET_CURRENT_USERID } from "../../graphql/queries";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const GET_FOOD_BY_ID = gql`
  query getFoodById($foodId: ID!) {
    getFoodById(foodId: $foodId) {
      id
      edamam_id
    }
  }
`;

const MealModal = styled(Modal)`
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
        date: "",
        foodName: "",
        servingQty: "",
        caloriesPerServ: "",
        proteins: "",
        carbs: "",
        fats: "",
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

    console.log("Journal Entry", this.props.foodEntries);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mealEntry !== this.props.mealEntry) {
      this.setState({ mealEntry: this.props.mealEntry });
    }
  }

  passMealData = mealEntry => {
    console.log(mealEntry);
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

    console.log(this.state.date);
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
      caloriesPerServ: parseInt(this.state.caloriesPerServ),
      fats: parseInt(this.state.fats),
      carbs: parseInt(this.state.carbs),
      proteins: parseInt(this.state.proteins),
      date: this.state.date,
      food_id: this.state.mealEntry.food_id.id,
      user_id: this.state.currentUser,
      meal_category_id: this.state.meal_category_id,
      servingQty: parseInt(this.state.servingQty)
    };
    console.log(this.state.edamamExist);
    console.log(foodEntry);
    this.props.editMeal(
      this.state.mealEntry.id,
      this.state.mealEntry.food_id.id,
      foodEntry
    );

    this.closeModal();
  };

  render() {
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
        <JournalDateTitle>{this.props.datePicked}</JournalDateTitle>

        <CategoryTitle> Breakfast</CategoryTitle>
        <div>
          {Breakfast.length > 0 ? (
            [...Breakfast].map(breakfast => {
              console.log(breakfast);
              return (
                <div key={breakfast.id}>
                  <div onClick={() => this.passMealData(breakfast)}>
                    <EntryItems>{breakfast.food_id.foodName}</EntryItems>
                  </div>
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
                </div>
              );
            })
          ) : (
            <EntryItems>No Breakfast entries have been added</EntryItems>
          )}
        </div>
        <CategoryTitle> Lunch</CategoryTitle>
        <div>
          {Lunch.length > 0 ? (
            [...Lunch].map(lunch => {
              return (
                <div key={lunch.id}>
                  <EntryItems onClick={() => this.passMealData(lunch)}>
                    {lunch.food_id.foodName}
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
                          <MenuItem value={""}>
                            <em>Choose Meal Category</em>
                          </MenuItem>
                          <MenuItem value="1">Breakfast</MenuItem>
                          <MenuItem value="2">Lunch</MenuItem>
                          <MenuItem value="3">Dinner</MenuItem>
                          <MenuItem value="4">Snack</MenuItem>
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
                          placeholder={`${
                            this.state.mealEntry.food_id.servingQty
                          }`}
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
            <EntryItems> No Lunch entries have been added</EntryItems>
          )}
        </div>
        <CategoryTitle>Dinner</CategoryTitle>
        <div>
          {Dinner.length > 0 ? (
            [...Dinner].map(dinner => {
              return (
                <div key={dinner.id}>
                  <EntryItems onClick={() => this.passMealData(dinner)}>
                    {dinner.food_id.foodName}
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
                </div>
              );
            })
          ) : (
            <EntryItems>No Dinner entries have been added</EntryItems>
          )}
        </div>

        <CategoryTitle>Snacks</CategoryTitle>
        <div>
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
                        <Button onClick={this.closeModal}>exit </Button>
                      </div>
                      <div> {this.state.mealEntry.food_id.foodName} </div>
                      <form>
                        <label htmlFor="date"> Date </label>
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
                          <MenuItem>
                            {" "}
                            <em>None</em>{" "}
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
        </div>
      </div>
    );
  }
}

export default JournalEntry;
