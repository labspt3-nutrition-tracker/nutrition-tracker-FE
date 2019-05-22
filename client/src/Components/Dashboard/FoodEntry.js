import React from "react";
import styled from "styled-components";

const MealCategory = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`;

const Meal = styled.div`
  padding: 10px;
`;

class FoodEntry extends React.Component {
  
  render() {
    return (
      <div>
        <Meal>
          <MealCategory>Latest Entry</MealCategory>
          <div className="meals meals-breakfast">
            {this.props.entries.breakfast.map(meal => {
              return <div className="food">{meal.food}</div>;
            })}
          </div>
        </Meal>
        <Meal>
          <MealCategory>Lunch</MealCategory>
          <div className="meals meals-lunch">
            {this.props.entries.lunch.map(meal => {
              return <div className="food">{meal.food}</div>;
            })}
          </div>
        </Meal>
        <Meal>
          <MealCategory>Dinner</MealCategory>
          <div className="meals meals-dinner">
            {this.props.entries.dinner.map(meal => {
              return <div className="food">{meal.food}</div>;
            })}
          </div>
        </Meal>
        <Meal>
          <MealCategory>Snacks</MealCategory>
          <div className="meals meals-snacks">
            {this.props.entries.snacks.map(meal => {
              return <div className="food">{meal.food}</div>;
            })}
          </div>
        </Meal>
      </div>
    );
  }
}

export default FoodEntry;
