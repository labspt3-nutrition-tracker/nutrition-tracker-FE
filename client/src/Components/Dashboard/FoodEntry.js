import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { GET_CURRENT_USERID } from "../../graphql/queries";

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
      foodEntries: [],
      foodEntry:[],
      showModal: false,
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
                <div onClick={() => this.passFoodEntryData(entry)}>
                    <div key={entry.id} entry={entry}>{entry.food_id.foodName}</div>
                 </div>
              ))}
            </Meal>

            <Meal>
              <MealCategory>Lunch</MealCategory>
              {Lunch.map(entry => (
                <div onClick={this.openModal}>
                  <div type="submit" onClick={this.openModal}>
                    <div key={entry.id}>{entry.food_id.foodName}</div>
                  </div>
                </div>
              ))}
            </Meal>
            <Meal>
              <MealCategory>Dinner</MealCategory>
              {Dinner.map(entry => (
                <div onClick={this.openModal}>
                  <div type="submit" onClick={this.openModal}>
                    <div key={entry.id}>{entry.food_id.foodName}</div>
                  </div>
                </div>
              ))}
            </Meal>
            <Meal>
              <MealCategory>Snack</MealCategory>
              {Snack.map(entry => (
                <div onClick={this.openModal}>
                  <div type="submit" onClick={this.openModal}>
                    <div key={entry.id}>{entry.food_id.foodName}</div>
                    {/* <div type="submit" onClick={this.openModal}>edit</div> */}
                  </div>
                </div>
              ))}
            </Meal>

            <FoodModal
            isOpen={this.state.showModal}>
            { this.props.foodEntry && this.props.foodEntry.food_id &&
            <div>
              <h2> {this.props.foodEntry.food_id.foodName}</h2>
              <h3> {this.props.foodEntry.servingQty}</h3>
            </div>}
              <ModalButton onClick={this.closeModal}>No?</ModalButton>
              <ModalButton onClick={() => this.deleteFood(this.props.foodEntry.id)}>Delete?</ModalButton>


            </FoodModal>
          </div>
        </div>
      </FoodEntryContainer>
    );
  }
}

export default withStyles(styles)(FoodEntry);
