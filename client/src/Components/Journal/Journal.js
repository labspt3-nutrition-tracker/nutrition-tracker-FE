import React from 'react';
import Calendar from './Calendar';
import JournalEntry from './JournalEntry';


// import { Link } from 'react-router-dom';

class Journal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodEntries: [
            ],

        }
    }



componentDidMount(){
    
}

    render(){
        const foodEntries = [
            {
              "food_id": {
                "id": "3",
                "foodName": "apple"
              },
              "meal_category_id": {
                "id": "3",
                "mealCategoryName": "Lunch"
              }
            },
            {
              "food_id": {
                "id": "4",
                "foodName": "orange"
              },
              "meal_category_id": {
                "id": "3",
                "mealCategoryName": "Lunch"
              }
            }
          ]
        return (
            <>
            <h1> Breakfast</h1>

            <div>{Object.keys(foodEntries).map(function(key) {
                if (foodEntries[key].meal_category_id.mealCategoryName === 'Breakfast' && foodEntries[key].food_id.foodName !== ''){
             return <div>
                     {/* <h1> {foodEntries[key].meal_category_id.mealCategoryName}</h1> */}
                     <h3> {foodEntries[key].food_id.foodName}</h3>
                    </div> 
                } else { 
                   return <div> No Breakfast have been added </div>
                }    
            })}</div>

<h1> Lunch</h1>

<div>{Object.keys(foodEntries).map(function(key) {
    if (foodEntries[key].meal_category_id.mealCategoryName === 'Lunch')
return <div>
         {/* <h1> {foodEntries[key].meal_category_id.mealCategoryName}</h1> */}
         <h3> {foodEntries[key].food_id.foodName}</h3>
        </div>
})}</div>

<h1> Dinner</h1>

<div>{Object.keys(foodEntries).map(function(key) {
    if (foodEntries[key].meal_category_id.mealCategoryName === 'Dinner')
return <div>
         {/* <h1> {foodEntries[key].meal_category_id.mealCategoryName}</h1> */}
         <h3> {foodEntries[key].food_id.foodName}</h3>
        </div>
})}</div>
            <Calendar />
            <JournalEntry />
            </>
        )
    }
}

export default Journal;