
import React from 'react';
import Login from './Components/Login';
import './App.css';
import { Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import Billing from './Components/Billing/Billing';
import StatsView from './Components/Stats/StatsView';
import Settings from './Components/Settings';

const App = () => {
  return (
    <div className="App">
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
      </main>
      <div>
        <Route exact path="/billing" render={() => <Billing />} />
        <Route exact path="/stats" render={() => <StatsView />} />
        <Route
        exact path="/login" render={() => <Login/>} />
        <Route
        exact path="/settings" render={() => <Settings/>} />
      </div>
    </div>
  );
};

export default App;
