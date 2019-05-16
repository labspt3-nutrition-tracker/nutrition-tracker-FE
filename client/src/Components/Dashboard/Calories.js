import React from 'react';
import styled from 'styled-components';

const CalCon = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
`

const CalTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`

const CalAmt = styled.div`
  font-size: 4rem;
`

const Calories = () => (
  <CalCon>
    <div className="cal-current">
      <CalTitle>Current Calories Today</CalTitle>
      <CalAmt>1200</CalAmt>
    </div>
    <div className="cal-remain">
      <CalTitle>Remaining Calories Today</CalTitle>
      <CalAmt>800</CalAmt>
    </div>
    <div className="cal-goal">
      <CalTitle>Daily Calorie Goal</CalTitle>
      <CalAmt>2000</CalAmt>
    </div>
  </CalCon>
)

export default Calories;