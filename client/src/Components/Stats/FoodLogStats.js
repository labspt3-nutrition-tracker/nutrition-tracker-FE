import React from "react";
import styled from "styled-components";
// import Grid from "@material-ui/core/Grid";



const FoodLogStats = props => {
  const { daily, weekly, monthly } = props.calories;
  return (
    <DivContainer>
      <div>
        Daily Stats:{" "}
        {daily.map(calorie => (
          <div key={calorie}>
            Total Carbs: {calorie.carbs}
            Total Protein: {calorie.protein} Total Fat: {calorie.fat}
          </div>
        ))}
      </div>
      <div>
        Weekly Stats:{" "}
        {weekly.map(calorie => (
          <div key={calorie}>
             Total Carbs: {calorie.carbs}
             Total Protein: {calorie.protein} Total Fat: {calorie.fat}{" "}
          </div>
        ))}
      </div>
      <div>
        Monthly Stats:{" "}
        {monthly.map(calorie => (
          <div key={calorie}>
            Total Carbs: {calorie.carbs}
            Total Protein:{calorie.protein}Total Fat: {calorie.fat}
          </div>
        ))}
      </div>
    </DivContainer>
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


const DivContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
max-width: 1000px;
`