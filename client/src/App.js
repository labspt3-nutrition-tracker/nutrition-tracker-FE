import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Login from "./Components/Auth/Login";
import Header from "./Components/Reusables/Header";
import Dashboard from "./Components/Dashboard/Dashboard";
import Journal from "./Components/Journal/Journal";
import Home from "./Components/Home/Home";
import Billing from "./Components/Billing/Billing";
import StatsView from "./Components/Reports/StatsView";
import Settings from "./Components/Settings";
import AccountNav from "./Components/AccountNav";
import AppModal from "./Components/Reusables/AppModal";
import Footer from "./Components/Reusables/Footer";
import { getCurrentUser } from "./util/getCurrentUser";

const EDAMAM_API_ID = process.env.REACT_APP_EDAMAM_APP_ID;
const EDAMAM_API_KEY = process.env.REACT_APP_EDAMAM_API_KEY;

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const token = localStorage.getItem("token");
  getCurrentUser(token)
    .then()
    .catch(err => {
      console.log(err);
      localStorage.removeItem("token"); //If token expired or not valid, remove it
    });
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          Component ? (
            <Component {...props} />
          ) : (
            render(props)
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchResults: [],
      noResultError: "",
      showModal: false
    };
  }

  updateSearch = e => {
    console.log(this.state.searchInput)
    this.setState({
      searchInput: e.target.value
    });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    console.log(this.state.searchInput)
    this.setState({ showModal: false, searchInput: " " });
  };

  getFoodData = food => {
    food = this.state.searchInput;
    let encodedFood = food.replace(" ", "%20");
    axios
      .get(
        `https://api.edamam.com/api/food-database/parser?ingr=${encodedFood}&app_id=${EDAMAM_API_ID}&app_key=${EDAMAM_API_KEY}`
      )
      .then(response => {
        this.setState({
          searchResults: response.data.hints,
          searchInput: "",
          noResultError: "",
          showModal: true
        });
        console.log("search results", this.state.searchResults);
        console.log("search input", this.state.searchInput);
      })
      .catch(error => {
        this.setState({
          searchInput: "",
          noResultError: "No results found",
          showModal: true,
          searchResults: []
        });
        console.log("error", error);
      });
  };

  handleFoodSubmit = food => {
    this.setState({ selectedFood: food });
    this.closeModal();
  };

  render() {
    return (
      <div className='App'>
        <Header searchInput={this.state.searchInput}  updateSearch={this.updateSearch} getFoodData={this.getFoodData} closeModal={this.closeModal}/>
        <AppModal
          isOpen={this.state.showModal}
          openModal={this.openModal}
          closeModal={this.closeModal}
          noResultError={this.state.noResultError}
          handleFoodSubmit={this.handleFoodSubmit}
          searchResults={this.state.searchResults}
          updateSearch={this.updateSearch}
        />
        <div>
          <Route exact path='/' component={Home} />
          <PrivateRoute
            path='/dashboard'
            render={props => <Dashboard {...props} selectedFood={this.state.selectedFood} />}
          />
          <PrivateRoute exact path='/billing' render={() => <Billing />} />
          <PrivateRoute exact path='/reports' render={() => <StatsView />} />
          <Route exact path='/login' render={() => <Login />} />
          <PrivateRoute exact path='/settings' render={() => <Settings />} />
          <PrivateRoute path='/journal' render={() => <Journal />} />
        </div>
        <PrivateRoute path='/account' component={AccountNav} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
