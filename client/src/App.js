
import React from 'react';
import Login from './Components/Auth/Login';
import './App.css';
import { Route } from 'react-router-dom';
import Settings from './Components/Settings';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import Billing from './Components/Billing/Billing';
import StatsView from './Components/Stats/StatsView';
import AccountNav from "./Components/AccountNav";
import BillingPlans from './Components/Billing/BillingPlans';


const App = () => {
  return (
    <div className="App">
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/settings" component={Settings} />
      </main>
      <div>
        <Route exact path="/billing-plan" render={() => <BillingPlans />} />
        <Route exact path="/billing" render={() => <Billing />} />
        <Route exact path="/stats" render={() => <StatsView />} />
        <Route
        exact path="/login" render={() => <Login/>} />
        <Route
        exact path="/settings" render={() => <Settings/>} />
      </div>
      <Route path="/account" render={() => <AccountNav />} />
    </div>
  );
};

export default App;
