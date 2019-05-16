import React from "react";
import styled from 'styled-components'

const MealCategory = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`

const Meal = styled.div`
  padding: 10px;
`

const FoodEntry = props => (
  <div>
    <Meal>
      <MealCategory>Breakfast</MealCategory>
      <div className="meals meals-breakfast">
        {props.entries.breakfast.map(meal => {
          return <div className="food">{meal.food}</div>;
        })}
      </div>
    </Meal>
    <Meal>
      <MealCategory>Lunch</MealCategory>
      <div className="meals meals-lunch">
        {props.entries.lunch.map(meal => {
          return <div className="food">{meal.food}</div>;
        })}
      </div>
    </Meal>
    <Meal>
      <MealCategory>Dinner</MealCategory>
      <div className="meals meals-dinner">
        {props.entries.dinner.map(meal => {
          return <div className="food">{meal.food}</div>;
        })}
      </div>
    </Meal>
    <Meal>
      <MealCategory>Snacks</MealCategory>
      <div className="meals meals-snacks">
        {props.entries.snacks.map(meal => {
          return <div className="food">{meal.food}</div>;
        })}
      </div>
    </Meal>
  </div>
);

export default FoodEntry;
