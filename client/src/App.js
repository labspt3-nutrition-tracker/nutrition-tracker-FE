import React from 'react';
import axios from 'axios';
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


const EDAMAM_API_ID = process.env.REACT_APP_EDAMAM_APP_ID;
const EDAMAM_API_KEY = process.env.REACT_APP_EDAMAM_API_KEY;

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchInput:'',
      searchResults: []
    }
  }

  updateSearch = e => {
    this.setState({
      searchInput: e.target.value
    })
    console.log("updateSearch", this.state.searchInput)
  }

  getFoodData = food => {
    food = this.state.searchInput;
    let encodedFood = food.replace(' ', '%20')
    console.log(encodedFood)
    console.log(EDAMAM_API_ID)
    axios
      .get(`https://api.edamam.com/api/food-database/parser?ingr=${encodedFood}&app_id=${EDAMAM_API_ID}&app_key=${EDAMAM_API_KEY}`)
      .then(response =>{
        this.setState({searchResults: response.data.hints})
        this.setState({searchInput: ''})
        console.log(this.state.searchResults)
      })
      .catch(error =>{
        console.log(error)
      })


  }

  render(){
    return (
      <div className="App">
        <Header searchInput={this.state.searchInput} updateSearch={this.updateSearch}
          getFoodData={this.getFoodData}
          searchResults={this.state.searchResults} />
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
