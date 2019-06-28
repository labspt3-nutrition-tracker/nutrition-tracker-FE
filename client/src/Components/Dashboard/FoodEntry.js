import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
//import Menu from "@material-ui/core/Menu";
import moment from "moment";

import { GET_CURRENT_USERID } from "../../graphql/queries";
import { flexbox } from "@material-ui/system";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;
const FoodEntryContainer = styled.div`
  width: 100%;
`;

const Meal = styled.div`
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
    background: "#5E366A",
    padding: 10,
    color: "#ffffff"
  },
  mealCard: {
    minHeight: 100,
    // width: '25%'
  },
  mealCon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 16,
  },
  mealTitle: {
    fontFamily: "Oswald",
    fontSize: "1.8rem"
  }
});

class FoodEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      showModal: false,
      foodEntry: [],
      editFoodObj: {
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
        meal_category_id: null
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
      },
      editFoodEntryObj: []
    };
  }

  openModal = item => {
    this.setState({
      showModal: true
    });
  };

  passFoodEntryData = entry => {
    this.props.passFoodData(entry);
    this.openModal();
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  deleteFood = id => {
    this.props.deleteFoodEntry(id);
    this.closeModal();
  };

  editFood = entry => {
    // let editFoodEnt = {
    //   id: entry.id,
    //   food_id: entry.food_id,
    //   date: entry.date,
    //   foodName: entry.food_id.foodName,
    //   servingQty: entry.servingQty,
    //   caloriesPerServ: entry.food_id.caloriesPerServ,
    //   fats: entry.food_id.fats,
    //   carbs: entry.food_id.carbs,
    //   proteins: parseInt(entry.food_id.proteins),
    //   edamam_id: entry.food_id.edamam_id,
    //   meal_category_id: parseInt(entry.meal_category_id),
    //   user_id: entry.user_id
    // };
      this.props.editFoodEntry(entry.id, entry)
    // this.props.editFoodEntry(entry.id, editFoodEnt);
    console.log(entry.food_id.meal_category_id);
    // console.log(entry.food_id.caloriesPerServ)
    this.closeModal();
  };

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (prevProps.foodEntries !== this.props.foodEntries) {
      this.setState({
        foodEntries: this.props.foodEntries,
        foodEntry: this.props.foodEntry
      });
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
          <CardContent className={classes.mealCon}>
            <CardContent className={classes.mealCard}>
              <Typography className={classes.mealTitle} variant="h4">Breakfast</Typography>
              <hr/>
              {Breakfast.map(entry => (
                <div
                  key={entry.id}
                  onClick={() => this.passFoodEntryData(entry)}
                >
                  <div entry={entry}><span className="bullet">&#8226;</span> {entry.food_id.foodName}</div>
                </div>
              ))}
            </CardContent>

            <CardContent className={classes.mealCard}>
              <Typography className={classes.mealTitle} variant="h4">Lunch</Typography>
              <hr/>
              {Lunch.map(entry => (
                <div onClick={this.openModal}>
                  <div
                    key={entry.id}
                    onClick={() => this.passFoodEntryData(entry)}
                  >
                    <div><span className="bullet">&#8226;</span> {entry.food_id.foodName}</div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardContent className={classes.mealCard}>
              <Typography className={classes.mealTitle} variant="h4">Dinner</Typography>
              <hr/>
              {Dinner.map(entry => (
                <div key={entry.id} onClick={this.openModal}>
                  <div

                    onClick={() => this.passFoodEntryData(entry)}
                  >
                    <div><span className="bullet">&#8226;</span> {entry.food_id.foodName}</div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardContent className={classes.mealCard}>
              <Typography className={classes.mealTitle} variant="h4">Snack</Typography>
              <hr/>
              {Snack.map(entry => (
                <div key={entry.id} onClick={this.openModal}>
                  <div

                    onClick={() => this.passFoodEntryData(entry)}
                  >
                    <div><span className="bullet">&#8226;</span> {entry.food_id.foodName}</div>
                  </div>
                </div>
              ))}
            </CardContent>

            <FoodModal isOpen={this.state.showModal}>
              {this.props.foodEntry &&
                this.props.foodEntry.food_id &&
                this.props.foodEntry.meal_category_id && (
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

                      <InputLabel htmlFor="meal_category_id">
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
                        placeholder={this.props.foodEntry.meal_category_id}
                        value={this.props.foodEntry.meal_category_id}
                        onChange={this.props.onFoodEntryChange}
                        aria-describedby="errorCategory-text"
                      >
                        <MenuItem value="NaN">Select Meal Category</MenuItem>
                        <MenuItem value="1">breakfast</MenuItem>
                        <MenuItem value="2">lunch</MenuItem>
                        <MenuItem value="3">dinner</MenuItem>
                        <MenuItem value="4">snack</MenuItem>
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
                        value={moment(this.props.foodEntry.date).format(
                          "YYYY-MM-DD"
                        )}
                      />
                      <FormHelperText id="errorDate-text">
                        {this.state.errorMsg.errorDate}
                      </FormHelperText>
                    </Form>
                  </div>
                )}
              <ModalButton onClick={this.closeModal}>No?</ModalButton>
              <ModalButton onClick={() => this.editFood(this.props.foodEntry)}>
                Edit
              </ModalButton>
              <ModalButton
                onClick={() => this.deleteFood(this.props.foodEntry.id)}
              >
                Delete?
              </ModalButton>
            </FoodModal>
          </CardContent>
        </div>
      </FoodEntryContainer>
    );
  }
}

export default withStyles(styles)(FoodEntry);
