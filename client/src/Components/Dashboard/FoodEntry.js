import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
//import Menu from "@material-ui/core/Menu";
import moment from 'moment';

import { GET_CURRENT_USERID } from "../../graphql/queries";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;
const FoodEntryContainer = styled.div`
  width: 50%;
`;

const MealCategory = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`;

const Meal = styled.div`
  padding: 10px;
`;

const ModalButton = styled.button`
  color: #fcfcfb;
  background: #f4b4c3;
  margin-bottom: 5px;
  padding: 5px 15px;
  font-size: 0.9em;
`;

const FoodModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10% 20%;
  padding: 10%;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
`;

Modal.setAppElement("#root");

const styles = theme => ({
  title: {
    fontSize: 16,
    background: "#2C363F",
    padding: 10,
    color: "#ffffff",
  },
})

class FoodEntry extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: "",
      showModal: false,
      newAddFood: {
        date: "",
        foodName: "",
        servingQty: null,
        caloriesPerServ: null,
        fats: null,
        carbs: null,
        proteins: null,
        edamam_id: "",
        meal_category_id: null,
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


  openModal = item => {
    this.setState({
      showModal: true,
    });
  };

  passFoodEntryData = entry => {
    this.props.passFoodData(entry)
    this.openModal()
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  deleteFood = (id) => {
    this.props.deleteFoodEntry(id)
    this.closeModal();
  }

  editFood = entry => {
    this.props.editFoodEntry(entry.id, entry)
    console.log(entry.food_id.caloriesPerServ)
    this.closeModal();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.foodEntries !== this.props.foodEntries) {
      this.setState({ foodEntries: this.props.foodEntries, foodEntry: this.props.foodEntry});
    }
  }

  getCurrentUser = idToken => {
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
  };

  render() {
    const { classes } = this.props;
    const dateToday = new Date();
    const month = dateToday.getMonth();
    const day = dateToday.getDate();
    const year = dateToday.getFullYear();
    let foodEntries = this.props.foodEntries;
    foodEntries = foodEntries.filter(entry => {
      const dateEntry = new Date(entry.date);
      const entryMonth = dateEntry.getMonth();
      const entryDay = dateEntry.getDate();
      const entryYear = dateEntry.getFullYear();
      return entryMonth === month && entryDay === day && entryYear === year;
    });

    const Breakfast = foodEntries.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Breakfast";
    });

    const Lunch = foodEntries.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Lunch";
    });

    const Dinner = foodEntries.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Dinner";
    });

    const Snack = foodEntries.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Snack";
    });
    return (
      <FoodEntryContainer>
        <div>
          <CardContent>
            <Typography className={classes.title}>Today's Summary:</Typography>
          </CardContent>
          <div>
            <Meal>
              <MealCategory>Breakfast</MealCategory>
              {Breakfast.map(entry => (
                <div key={entry.id} onClick={() => this.passFoodEntryData(entry)}>
                    <div  entry={entry}>{entry.food_id.foodName}</div>
                 </div>
              ))}
            </Meal>

            <Meal>
              <MealCategory>Lunch</MealCategory>
              {Lunch.map(entry => (
                <div onClick={this.openModal}>
                  <div key={entry.id} onClick={() => this.passFoodEntryData(entry)}>
                    <div >{entry.food_id.foodName}</div>
                  </div>
                </div>
              ))}
            </Meal>
            <Meal>
              <MealCategory>Dinner</MealCategory>
              {Dinner.map(entry => (
                <div onClick={this.openModal}>
                  <div key={entry.id} onClick={() => this.passFoodEntryData(entry)}>
                    <div>{entry.food_id.foodName}</div>
                  </div>
                </div>
              ))}
            </Meal>
            <Meal>
              <MealCategory>Snack</MealCategory>
              {Snack.map(entry => (
                <div onClick={this.openModal}>
                  <div key={entry.id} onClick={() => this.passFoodEntryData(entry)}>
                    <div>{entry.food_id.foodName}</div>
                  </div>
                </div>
              ))}
            </Meal>

            <FoodModal
            isOpen={this.state.showModal}>
            { this.props.foodEntry && this.props.foodEntry.food_id  && this.props.foodEntry.meal_category_id &&
            <div>
              <Form>
                <h1> Edit food entry</h1>
                <TextField
                  required
                  error={this.state.errorMsg.errorFood}
                  autoFocus
                  margin="dense"
                  className="form-field"
                  type="text"
                  name="foodName"
                  onChange={this.props.onFoodEntryChange}
                  //onChange={event => {this.onFoodEntryChange(event, this.props.onFoodEntryChange, 'foodName'); }}
                  value={this.props.foodEntry.food_id.foodName}
                  aria-describedby="errorFood-text"
                />

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
                  placeholder={this.props.foodEntry.meal_category_id}
                  value={this.props.foodEntry.meal_category_id}
                  onChange={this.props.onFoodEntryChange}
                  aria-describedby="errorCategory-text"
                >
                  <MenuItem value="NaN">Select Meal Category</MenuItem>
                  <MenuItem value="1">breakfast</MenuItem>
                  <MenuItem value="2">lunch</MenuItem>
                  <MenuItem value="4">dinner</MenuItem>
                  <MenuItem value="3">snack</MenuItem>
                </Select>

                <TextField
                  autoFocus
                  margin="dense"
                  error={this.state.errorMsg.errorQty}
                  label="Serving Quantity"
                  className="form-field"
                  type="number"
                  name="servingQty"
                  onChange={this.props.onFoodEntryChange}
                  value={this.props.foodEntry.servingQty}
                  required
                  aria-describedby="errorQty-text"
                />

                <TextField
                  required
                  error={this.state.errorMsg.errorFood}
                  autoFocus
                  margin="dense"
                  label="Calories Per Serving"
                  className="form-field"
                  type="number"
                  placeholder="Add food here..."
                  name="caloriesPerServ"
                  onChange={this.props.onFoodEntryChange}
                  value={this.props.foodEntry.food_id.caloriesPerServ}
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
                  onChange={this.props.onFoodEntryChange}
                  value={this.props.foodEntry.food_id.proteins}
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
                  onChange={this.props.onFoodEntryChange}
                  value={this.props.foodEntry.food_id.carbs}
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
                  onChange={this.props.onFoodEntryChange}
                  value={this.props.foodEntry.food_id.fats}
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
                  onChange={this.props.onFoodEntryChange}
                  // onChange={this.onInputChange}
                  required
                  aria-describedby="errorDate-text"
                  value={moment(this.props.foodEntry.date).format('YYYY-MM-DD')}
                />
                <FormHelperText id="errorDate-text">
                  {this.state.errorMsg.errorDate}
                </FormHelperText>
              </Form>
            </div>}
              <ModalButton onClick={this.closeModal}>No?</ModalButton>
              <ModalButton onClick={() => this.editFood(this.props.foodEntry)}>Edit</ModalButton>
              <ModalButton onClick={() => this.deleteFood(this.props.foodEntry.id)}>Delete?</ModalButton>


            </FoodModal>
          </div>
        </div>
      </FoodEntryContainer>
    );
  }
}

export default withStyles(styles)(FoodEntry);
