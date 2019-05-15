import React from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';

import Billing from './Components/Billing/Billing';
import StatsView from './Components/Stats/StatsView';

const App = () => {
  return (
    <div className="App">
      <div>
        <Route 
        exact path="/billing" render={() => <Billing /> }/>
        <Route
        exact path="/stats" render={() => <StatsView /> }/>
      </div>
    </div>
  );
}

export default App;
