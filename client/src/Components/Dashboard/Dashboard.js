import React from 'react';
import Header from '../Reusables/Header';
import Calories from './Calories';

const Dashboard = () => (
  <div>
    <Header></Header>
    <div className="dash-title">Today's Food Entries</div>
    <div className="current-entries">
      <div>Breakfast</div>
      <div>Lunch</div>
      <div>Dinner</div>
      <div>Snack</div>
    </div>
    <div className="entry-form"><input type="text" placeholder="Add food here..."/></div>
    <Calories />

  </div>
)


export default Dashboard;