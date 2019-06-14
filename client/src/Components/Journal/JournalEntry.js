import React from "react";
import styled from "styled-components";
import moment from "moment";
import Modal from 'react-modal';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { GET_FOOD_ENTRIES_BY_USER_QUERY } from "../../graphql/queries";
import gql from "graphql-tag";

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
      journalEntry: {
        date: "",
        foodName: "",
        servingQty: "",
        caloriesPerServ: "",
        proteins: "",
        carbs: "",
        fats: "",
        Breakfast: [],
        Lunch: [],
        Dinner: [],
        Snack: [],
        user_id: null,
        food_id: null,
        meal_category_id: null,
        showModal: false
      }
    };
  }

  passBreakfastData = (Breakfast) => {
    this.setState({
      Breakfast: Breakfast
    })

    this.openModal()
  }

  passLunchData = (Lunch) => {
    this.setState({
      Lunch: Lunch
    })

    this.openModal()
  }

  passDinnerData = (Dinner) => {
    this.setState({
      Dinner: Dinner
    })

    this.openModal()
  }

  passSnackData = (Snack) => {
    this.setState({
      Snack: Snack
    })

    this.openModal()
  }

  openModal = () => {
    this.setState({
      showModal: true
    })
  }

  closeModal = () => {
    console.log('modal closed')
    this.setState({ showModal: false})
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount(){
  }

  componentDidUpdate(prevProps){
  }

  render() {
    const datePicked = this.props.datePicked;
    const ModifiedEntry = this.state.foodEntries.filter(function(entry) {
      //  return entry.date === datePicked;
      return moment(new Date(entry.date)).format("MM/DD") === moment(new Date(datePicked)).format("MM/DD");
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
            [...Breakfast].map( breakfast => {
              return (
                <div key={breakfast.id}>
                    <EntryItems onClick={this.openModal}>
                      {breakfast.food_id.foodName}
                    </EntryItems>

                      <MealModal
                        isOpen={this.state.showModal}
                      >
                        <div>
                          <Button onClick={this.closeModal}>
                            exit
                          </Button>
                        </div>
                        <div>
                          {breakfast.food_id.foodName}
                        </div>
                        <form>
                          <TextField
                            id="Serving Quantity"
                            name="Serving Quantity"
                            label="Serving Quantity"
                            placeholder={`${breakfast.servingQty}`}
                            value={this.state.servingQty}
                            margin="dense"
                            onChange={this.handleChange}
                          />
                          <TextField
                            id="Calories Per Serving"
                            name="Calories Per Serving"
                            label="Calories Per Serving"
                            placeholder={`${breakfast.food_id.caloriesPerServ}`}
                            value={this.state.caloriesPerServ}
                            margin="dense"
                            onChange={this.handleChange}
                          />
                          <TextField
                            id="Protein"
                            name="Protein"
                            label="Protein"
                            placeholder={`${breakfast.food_id.proteins}`}
                            value={this.state.proteins}
                            margin="dense"
                            onChange={this.handleChange}
                          />
                          <TextField
                            id="Carbs"
                            name="Carbs"
                            label="Carbs"
                            placeholder={`${breakfast.food_id.carbs}`}
                            value={this.state.carbs}
                            margin="dense"
                            onChange={this.handleChange}
                          />
                          <TextField
                            id="Fats"
                            name="Fats"
                            label="Fats"
                            placeholder={`${breakfast.food_id.fats}`}
                            value={this.state.fats}
                            margin="dense"
                            onChange={this.handleChange}
                          />
                        </form>
                        <div>
                          <Button variant='contained' color='secondary'>
                            Delete
                          </Button>
                          <Button variant='contained' color='primary'>
                            Edit
                          </Button>
                        </div>
                      </MealModal>
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
            [...Lunch].map( lunch => {
              return (
                <div key={lunch.id} >
                    <EntryItems onClick={this.openModal}>
                      {lunch.food_id.foodName}
                    </EntryItems>

                    <MealModal isOpen={this.state.showModal}>
                      <div>
                        <Button onClick={this.closeModal}>
                          exit
                        </Button>
                      </div>
                      <div>
                        {lunch.food_id.foodName}
                      </div>
                      <div>
                        <TextField
                          id="Serving Quantity"
                          name="Serving Quantity"
                          label="Serving Quantity"
                          placeholder={`${lunch.servingQty}`}
                          value={this.state.servingQty}
                          margin="dense"
                          onChange={this.handleChange}
                        />
                        <TextField
                          id="Calories Per Serving"
                          name="Calories Per Serving"
                          label="Calories Per Serving"
                          placeholder={`${lunch.food_id.caloriesPerServ}`}
                          value={this.state.caloriesPerServ}
                          margin="dense"
                          onChange={this.handleChange}
                        />
                        <TextField
                          id="Protein"
                          name="Protein"
                          label="Protein"
                          placeholder={`${lunch.food_id.proteins}`}
                          value={this.state.proteins}
                          margin="dense"
                          onChange={this.handleChange}
                        />
                        <TextField
                          id="Carbs"
                          name="Carbs"
                          label="Carbs"
                          placeholder={`${lunch.food_id.carbs}`}
                          value={this.state.carbs}
                          margin="dense"
                          onChange={this.handleChange}
                        />
                        <TextField
                          id="Fats"
                          name="Fats"
                          label="Fats"
                          placeholder={`${lunch.food_id.fats}`}
                          value={this.state.fats}
                          margin="dense"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div>
                        <Button variant='contained' color='secondary'>
                          Delete
                        </Button>
                        <Button variant='contained' color='primary'>
                          Edit
                        </Button>
                      </div>
                    </MealModal>
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
            [...Dinner].map( dinner => {
              return (
                <div key={dinner.id} >
                    <EntryItems onClick={this.openModal}>
                      {dinner.food_id.foodName}
                    </EntryItems>

                    <MealModal isOpen={this.state.showModal}>
                      <div>
                        <Button onClick={this.closeModal}>
                          exit
                        </Button>
                      </div>
                      <div>
                        {dinner.food_id.foodName}
                      </div>
                      <div>
                        <TextField
                          id="Serving Quantity"
                          name="Serving Quantity"
                          label="Serving Quantity"
                          placeholder={`${dinner.servingQty}`}
                          value={this.state.servingQty}
                          margin="dense"
                          onChange={this.handleChange}
                        />
                        <TextField
                          id="Calories Per Serving"
                          name="Calories Per Serving"
                          label="Calories Per Serving"
                          placeholder={`${dinner.food_id.caloriesPerServ}`}
                          value={this.state.caloriesPerServ}
                          margin="dense"
                          onChange={this.handleChange}
                        />
                        <TextField
                          id="Protein"
                          name="Protein"
                          label="Protein"
                          placeholder={`${dinner.food_id.proteins}`}
                          value={this.state.proteins}
                          margin="dense"
                          onChange={this.handleChange}
                        />
                        <TextField
                          id="Carbs"
                          name="Carbs"
                          label="Carbs"
                          placeholder={`${dinner.food_id.carbs}`}
                          value={this.state.carbs}
                          margin="dense"
                          onChange={this.handleChange}
                        />
                        <TextField
                          id="Fats"
                          name="Fats"
                          label="Fats"
                          placeholder={`${dinner.food_id.fats}`}
                          value={this.state.fats}
                          margin="dense"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div>
                        <Button variant='contained' color='secondary'>
                          Delete
                        </Button>
                        <Button variant='contained' color='primary'>
                          Edit
                        </Button>
                      </div>
                    </MealModal>
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
            [...Snack].map( snack => {
              return (
                <div key={snack.id}>
                  <EntryItems> {snack.food_id.foodName}</EntryItems>
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
