import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

class JournalEntry extends React.Component {
  constructor(props) {
    super(props);

    const { foodEntries, datePicked } = props;
    this.state = {
      currentUser: 1,
      foodEntries: foodEntries,
    };
  }


  render() {
    // filter by date
    // set as new foodentries
    const Breakfast = this.state.foodEntries.filter(function(entry) {
      return entry.meal_category_id.mealCategoryName === "Breakfast";
    });

    const Lunch = this.state.foodEntries.filter(function(entry) {
      return entry.meal_category_id.mealCategoryName === "Lunch";
    });

    const Dinner = this.state.foodEntries.filter(function(entry) {
      return entry.meal_category_id.mealCategoryName === "Dinner";
    });

    const Snack = this.state.foodEntries.filter(function(entry) {
      return entry.meal_category_id.mealCategoryName === "Snack";
    });
    console.log(this.props.foodEntries)
    return (
     
      <div>
        <h1>{this.props.datePicked}</h1>
        <h1> Breakfast</h1>
        <div>
                {Breakfast.length > 0
                  ? Object.keys(Breakfast).map(function(key) {
                      return (
                        <div key={Breakfast[key].food_id.id}>
                          <p> {Breakfast[key].food_id.foodName}</p>
                        </div>
                      );
                    })
                  : "No Breakfast entries have been added"}
              </div>
              <h2> Lunch</h2>
              <div>
                {Lunch.length > 0
                  ? Object.keys(Lunch).map(function(key) {
                      return (
                        <div key={Lunch[key].food_id.id}>
                          <p> {Lunch[key].food_id.foodName}</p>
                        </div>
                      );
                    })
                  : "No Lunch entries have been added"}
              </div>
              <h1>Dinner</h1>
              <div>
                {Dinner.length > 0
                  ? Object.keys(Dinner).map(function(key) {
                      return (
                        <div key={Dinner[key].food_id.id}>
                          <p> {Dinner[key].food_id.foodName}</p>
                        </div>
                      );
                    })
                  : "No Dinner entries have been added"}
              </div>

              <h1>Snacks</h1>
              <div>
                {Snack.length > 0
                  ? Object.keys(Snack).map(function(key) {
                      return (
                        <div>
                          <p> {Snack[key].food_id.foodName}</p>
                        </div>
                      );
                    })
                  : "No Snacks have been added"}
              </div>
            </div>
    );

  }
}

export default JournalEntry;
