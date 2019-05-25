import React from 'react';
import Login from './Components/Auth/Login';
import './App.css';
import Header from './Components/Reusables/Header';
import { Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Journal from './Components/Journal/Journal';
import Home from './Components/Home/Home';
import Billing from './Components/Billing/Billing';
import StatsView from './Components/Stats/StatsView';
import Settings from './Components/Settings';
import AccountNav from "./Components/AccountNav";
import BillingPlans from "./Components/Billing/BillingPlans";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchInput: '',
    }
  }

  updateSearch = e => {
    this.setState({
      searchInput: e.target.value
    })
    console.log(this.state.searchInput)
  }

  render(){
    return (
      <div className="App">
        <Header searchInput={this.state.searchInput} updateSearch={this.updateSearch} />
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/billing-plan" render={() => <BillingPlans />} />
          <Route exact path="/billing" render={() => <Billing />} />
          <Route exact path="/stats" render={() => <StatsView />} />
          <Route
          exact path="/login" render={() => <Login/>} />
          <Route
          exact path="/settings" render={() => <Settings/>} />
          <Route
            path="/journal" render={() => <Journal/>} / >
        </div>
        <Route path="/account" render={() => <AccountNav />} />
      </div>
    );
  };
};

export default App;
