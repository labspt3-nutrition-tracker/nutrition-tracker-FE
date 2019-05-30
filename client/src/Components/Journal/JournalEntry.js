import React from "react";

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
    const Breakfast = ModifiedEntry.filter(function(entry) {
      return entry.meal_category_id.mealCategoryName === "Breakfast";
    });

    const Lunch = ModifiedEntry.filter(function(entry) {
      return entry.meal_category_id.mealCategoryName === "Lunch";
    });

    const Dinner = ModifiedEntry.filter(function(entry) {
      return entry.meal_category_id.mealCategoryName === "Dinner";
    });

    const Snack = ModifiedEntry.filter(function(entry) {
      return entry.meal_category_id.mealCategoryName === "Snack";
    });
    console.log(this.props.foodEntries)

    console.log('calendar in journalEntry: ',this.props.datePicked)
    
   

    return (
     
      <div>
        <h1>{this.props.datePicked}</h1>
        {/* {ModifiedEntry.length > 0 
          ? 
          Object.keys(ModifiedEntry).map(function(key) {
            return (
              <div key={ModifiedEntry[key].food_id.id}>
                <p> {ModifiedEntry[key].food_id.foodName}</p>
              </div>
            );
          })
        : "No entries have been added for today"} */}
       
       
        <h1> Breakfast</h1>
        <div>
  
                {Breakfast.length > 0
                  ? Object.keys(Breakfast).map((key, i) => {
                      return (
                        <div key={i}>
                          <p> {Breakfast[key].food_id.foodName}</p>
                        </div>
                      );
                    })
                  : "No Breakfast entries have been added"}
              </div>
              <h2> Lunch</h2>
              <div>
                {Lunch.length > 0
                  ? Object.keys(Lunch).map((key, i) => {
                      return (
                        <div key={i}>
                          <p> {Lunch[key].food_id.foodName}</p>
                        </div>
                      );
                    })
                  : "No Lunch entries have been added"}
              </div>
              <h1>Dinner</h1>
              <div>
                {Dinner.length > 0
                  ? Object.keys(Dinner).map((key, i) => {
                      return (
                        <div key={i}>
                          <p> {Dinner[key].food_id.foodName}</p>
                        </div>
                      );
                    })
                  : "No Dinner entries have been added"}
              </div>

              <h1>Snacks</h1>
              <div>
                {Snack.length > 0
                  ? Object.keys(Snack).map((key, i) => {
                      return (
                        <div key={i}>
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
