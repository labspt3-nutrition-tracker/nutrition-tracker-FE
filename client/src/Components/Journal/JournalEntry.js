import React from "react";
import styled from 'styled-components';

const JournalDateTitle = styled.h1`
  font-family: 'Oxygen', sans-serif;
  font-size: 2em;
  color: #2C363F;
  margin-bottom: 5px;

  &:after{
    border-bottom: 4px solid #40A798;
    display: block;
    margin-top: 3px;
    margin-left: 15%;
    content: " ";
	  width: 45%;
  }

  @media (max-width: 1200px){
    font-size: 1.7em;
  }

  @media (max-width: 800px) {
    font-size: 1.2em;

    &:after{
      width: 20%;
      margin-left: 45%;
    }
  }

  @media( max-width: 500px){
    font-size: 1em;
    font-weight: bold;
  }
`;

const CategoryTitle = styled.h1`
  padding-top: 15px;
  font-size: 1.7em;
  color: #2C363F;
  font-family: 'Oxygen', sans-serif;
  padding-bottom: 20px;
`;

const EntryItems = styled.p`
  color: #40A798;
  font-weight: 500;
`;


class JournalEntry extends React.Component {
  constructor(props) {
    super(props);

    const { foodEntries} = props;
    this.state = {
      currentUser: 1,
      foodEntries: foodEntries,
    };
  }

  render() {
    const datePicked = this.props.datePicked;
    console.log('journal entry', this.state.foodEntries)
    const ModifiedEntry = this.state.foodEntries.filter(function(entry){
         return entry.date === datePicked;

     });
     console.log('modified in journalEntry: ', ModifiedEntry)

    // set as new foodentries
    const Breakfast = ModifiedEntry.filter((entry) => {
      return entry.meal_category_id.mealCategoryName === "Breakfast";
    });

    const Lunch = ModifiedEntry.filter((entry)  => {
      return entry.meal_category_id.mealCategoryName === "Lunch";
    });

    const Dinner = ModifiedEntry.filter((entry) => {
      return entry.meal_category_id.mealCategoryName === "Dinner";
    });

    const Snack = ModifiedEntry.filter((entry) => {
      return entry.meal_category_id.mealCategoryName === "Snack";
    });
    console.log(this.props.foodEntries)

    console.log('calendar in journalEntry: ',this.props.datePicked)



    return (
      <div>
          <JournalDateTitle>{this.props.datePicked}</JournalDateTitle>

        <CategoryTitle> Breakfast</CategoryTitle>
        <div>
          {Breakfast.length > 0
            ? Object.keys(Breakfast).map((key, i) => {
              return (
                        <div key={i}>
                          <EntryItems> {Breakfast[key].food_id.foodName}</EntryItems>
                        </div>
                      );
                    })
                  : <EntryItems>No Breakfast entries have been added</EntryItems>}
              </div>
              <CategoryTitle> Lunch</CategoryTitle>
              <div>
                {Lunch.length > 0
                  ? Object.keys(Lunch).map((key, i) => {
                      return (
                        <div key={i}>
                          <EntryItems> {Lunch[key].food_id.foodName}</EntryItems>
                        </div>
                      );
                    })
                  : <EntryItems> No Lunch entries have been added</EntryItems>}
              </div>
              <CategoryTitle>Dinner</CategoryTitle>
              <div>
                {Dinner.length > 0
                  ? Object.keys(Dinner).map((key, i) => {
                      return (
                        <div key={i}>
                          <EntryItems> {Dinner[key].food_id.foodName}</EntryItems>
                        </div>
                      );
                    })
                  : <EntryItems>No Dinner entries have been added</EntryItems>}
              </div>

              <CategoryTitle>Snacks</CategoryTitle>
              <div>
                {Snack.length > 0
                  ? Object.keys(Snack).map((key, i) => {
                      return (
                        <div key={i}>
                          <EntryItems> {Snack[key].food_id.foodName}</EntryItems>
                        </div>
                      );
                    })
                  : <EntryItems>No Snacks have been added</EntryItems>}
              </div>
            </div>
    );

  }
}

export default JournalEntry;
