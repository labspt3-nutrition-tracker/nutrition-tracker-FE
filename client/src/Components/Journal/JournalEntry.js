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
        user_id: null,
        food_id: null,
        meal_category_id: null,
        showModal: false
      }
    };
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
            Object.keys(Breakfast).map((key, i) => {
              return (
                <div key={i} onClick={() => this.openModal()}>
                  { !this.state.showModal ? (
                    <EntryItems>
                      {Breakfast[key].food_id.foodName}
                    </EntryItems>
                  ) : (
                    <MealModal isOpen={this.state.showModal}>
                      <div>
                        {Breakfast[key].food_id.foodName}
                      </div>
                      <div>
                        <TextField
                          id="Serving Quantity"
                          name="Serving Quantity"
                          label="Serving Quantity"
                          value={Breakfast[key].servingQty}
                          margin="dense"
                        />
                        <TextField
                          id="Calories Per Serving"
                          name="Calories Per Serving"
                          label="Calories Per Serving"
                          value={Breakfast[key].food_id.caloriesPerServ}
                          margin="dense"
                        />
                        <TextField
                          id="Protein"
                          name="Protein"
                          label="Protein"
                          value={Breakfast[key].food_id.proteins}
                          margin="dense"
                        />
                        <TextField
                          id="Carbs"
                          name="Carbs"
                          label="Carbs"
                          value={Breakfast[key].food_id.carbs}
                          margin="dense"
                        />
                        <TextField
                          id="Fats"
                          name="Fats"
                          label="Fats"
                          value={Breakfast[key].food_id.fats}
                          margin="dense"
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
            Object.keys(Lunch).map((key, i) => {
              return (
                <div key={i} onClick={() => this.openModal()}>
                  { !this.state.showModal ? (
                    <EntryItems>
                      {Lunch[key].food_id.foodName}
                    </EntryItems>
                  ) : (
                    <MealModal isOpen={this.state.showModal}>
                      <div>
                        {Lunch[key].food_id.foodName}
                      </div>
                      <div>
                        <TextField
                          id="Serving Quantity"
                          name="Serving Quantity"
                          label="Serving Quantity"
                          value={Lunch[key].servingQty}
                          margin="dense"
                        />
                        <TextField
                          id="Calories Per Serving"
                          name="Calories Per Serving"
                          label="Calories Per Serving"
                          value={Lunch[key].food_id.caloriesPerServ}
                          margin="dense"
                        />
                        <TextField
                          id="Protein"
                          name="Protein"
                          label="Protein"
                          value={Lunch[key].food_id.proteins}
                          margin="dense"
                        />
                        <TextField
                          id="Carbs"
                          name="Carbs"
                          label="Carbs"
                          value={Lunch[key].food_id.carbs}
                          margin="dense"
                        />
                        <TextField
                          id="Fats"
                          name="Fats"
                          label="Fats"
                          value={Lunch[key].food_id.fats}
                          margin="dense"
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
            Object.keys(Dinner).map((key, i) => {
              return (
                <div key={i} onClick={() => this.openModal()}>
                  { !this.state.showModal ? (
                    <EntryItems>
                      {Dinner[key].food_id.foodName}
                    </EntryItems>
                  ) : (
                    <MealModal isOpen={this.state.showModal}>
                      <div>
                        {Dinner[key].food_id.foodName}
                      </div>
                      <div>
                        <TextField
                          id="Serving Quantity"
                          name="Serving Quantity"
                          label="Serving Quantity"
                          value={Dinner[key].servingQty}
                          margin="dense"
                        />
                        <TextField
                          id="Calories Per Serving"
                          name="Calories Per Serving"
                          label="Calories Per Serving"
                          value={Dinner[key].food_id.caloriesPerServ}
                          margin="dense"
                        />
                        <TextField
                          id="Protein"
                          name="Protein"
                          label="Protein"
                          value={Dinner[key].food_id.proteins}
                          margin="dense"
                        />
                        <TextField
                          id="Carbs"
                          name="Carbs"
                          label="Carbs"
                          value={Dinner[key].food_id.carbs}
                          margin="dense"
                        />
                        <TextField
                          id="Fats"
                          name="Fats"
                          label="Fats"
                          value={Dinner[key].food_id.fats}
                          margin="dense"
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
            Object.keys(Snack).map((key, i) => {
              return (
                <div key={i}>
                  <EntryItems> {Snack[key].food_id.foodName}</EntryItems>
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
