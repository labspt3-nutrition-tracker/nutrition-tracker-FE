import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';

import Billing from './Components/Billing/Billing';
import StatsView from './Components/Stats/StatsView';

const App = () => {
  return (
    <div className="App">
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
      </main>
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
