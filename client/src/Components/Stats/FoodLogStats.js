import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const FoodLogStats = props => {
  const { daily, weekly, monthly } = props.calories;
  return (
    <>
      <div>
        Daily Stats:{" "}
        {daily.map(calorie => (
          <div key={calorie}>
            {calorie.carbs}
            {calorie.protein} {calorie.fat}
          </div>
        ))}
      </div>
      {/* <div className="meals meals-breakfast">
        {props.entries.breakfast.map(meal => {
          return <div className="food">{meal.food}</div>;
        })}
      </div> */}
      <div>
        Weekly Stats:{" "}
        {weekly.map(calorie => (
          <div key={calorie}>
            {calorie.carbs}
            {calorie.protein} {calorie.fat}{" "}
          </div>
        ))}
      </div>
      <div>
        Monthly Stats:{" "}
        {monthly.map(calorie => (
          <div key={calorie}>
            {calorie.carbs}
            {calorie.protein} {calorie.fat}
          </div>
        ))}
      </div>
    </>
  );
};

// class FoodLogStats extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             dateTab: '',
//             chartChanges: '',
//             barChanges: '',
//             carbs: '',
//             protein: '',
//             fat: '',
//             currentTotalChartEntries: {
//                 carbs: 1000,
//                 protein: 400,
//                 fat: 10
//             }
//         }
//     }

//     handleChange = input => e => {
//         this.setState({ [input]: e.target.value})
//     }

//     handleSubmit = e => {
//         e.preventDefault();
//     }

// render(){
//     return (
//         <>
//         <Grid
//             container
//             spacing={8}
//             lg={4}
//             direction="column"
//             justify="center"
//             alignItems="center"
//             >
//         <div>
//             Food Log
//             <div>Progress Chart here</div>
//             <div>Bar chart here</div>
//         </div>
//         <div>
//             Nutritional Stats
//         </div>
//         </Grid>
//         </>
//     )
// }

// }

export default FoodLogStats;
