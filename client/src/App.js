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
import CoachPage from "./Components/Coaches/CoachPage";
import MessagePage from "./Components/Messages/MessagePage";
import Footer from "./Components/Reusables/Footer";
import { getCurrentUser } from "./util/getCurrentUser";
import { CHECK_USER_TYPE } from "./graphql/mutations";
import { GET_CURRENT_USER_QUERY } from "./graphql/queries";
import ApolloClient from "apollo-boost";
import About from "./Components/About";
import Contact from "./Components/Contact";
import AOS from "aos";
import "aos/dist/aos.css";

const EDAMAM_API_ID = process.env.REACT_APP_EDAMAM_APP_ID;
const EDAMAM_API_KEY = process.env.REACT_APP_EDAMAM_API_KEY;

AOS.init();

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
      id: "",
      showModal: false,
      resultsLoading: true
    };
  }

  componentDidUpdate() {
    this.getCurrentUser(localStorage.getItem("token"));
  }

  getCurrentUser = async idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com/",
      headers: { authorization: idToken }
    });

    await client
      .query({
        query: GET_CURRENT_USER_QUERY
      })
      .then(response => {
        this.checkUser(response.data.getCurrentUser.id);
      })
      .catch(err => console.log(err));
  };

  checkUser = async id => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com/"
    });

    await client
      .mutate({
        mutation: CHECK_USER_TYPE,
        variables: {
          id: id
        }
      })
      .then(response => {
        return response
      });
  };

  updateSearch = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  getFoodData = food => {
    if (this.state.searchInput) {
      food = this.state.searchInput;
    }
    let encodedFood = food.replace(" ", "%20");
    this.setState({ showModal: true });
    axios
      .get(
        `https://api.edamam.com/api/food-database/parser?ingr=${encodedFood}&app_id=${EDAMAM_API_ID}&app_key=${EDAMAM_API_KEY}`
      )
      .then(response => {
        console.log("pre-reset", this.state.searchInput);
        this.setState({
          searchResults: response.data.hints,
          searchInput: "",
          noResultError: "",
          resultsLoading: false
        });
        console.log("search results", this.state.searchResults);
        console.log("search input", this.state.searchInput);
      })
      .catch(error => {
        this.setState({
          searchInput: "",
          noResultError: "No results found",
          showModal: true,
          searchResults: [],
          resultsLoading: false
        });
        console.log("error", error);
      });
  };

  handleFoodSubmit = food => {
    this.setState({ selectedFood: food });
    this.closeModal();
  };

  resetSelected = () => {
    this.setState({ selectedFood: null, searchResults: [] });
  };

  resetSearch = () => {
    this.setState({
      searchInput: ""
    });
  };

  check = async mutation => {
    await mutation({
      variables: {
        id: 5
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Header
          resetSearch={this.resetSearch}
          getFoodData={this.getFoodData}
          closeModal={this.closeModal}
        />
        <AppModal
          isOpen={this.state.showModal}
          openModal={this.openModal}
          closeModal={this.closeModal}
          noResultError={this.state.noResultError}
          handleFoodSubmit={this.handleFoodSubmit}
          searchResults={this.state.searchResults}
          resultsLoading={this.state.resultsLoading}
        />
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                updateSearch={this.updateSearch}
                getFoodData={this.getFoodData}
                isOpen={this.state.showModal}
                openModal={this.openModal}
                closeModal={this.closeModal}
                noResultError={this.state.noResultError}
                handleFoodSubmit={this.handleFoodSubmit}
                searchResults={this.state.searchResults}
                resultsLoading={this.state.resultsLoading}
              />
            )}
          />
          <PrivateRoute
            path="/dashboard"
            render={props => (
              <Dashboard
                {...props}
                selectedFood={this.state.selectedFood}
                resetSelected={this.resetSelected}
              />
            )}
          />
          <PrivateRoute exact path="/billing" render={() => <Billing />} />
          <PrivateRoute exact path="/reports" render={() => <StatsView />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/contact" render={() => <Contact />} />
          <PrivateRoute exact path="/settings" render={() => <Settings />} />
          <PrivateRoute path="/journal" render={() => <Journal />} />
          <PrivateRoute path="/coach" render={() => <CoachPage />} />
          <PrivateRoute path="/messages" render={() => <MessagePage />} />
        </div>
        <PrivateRoute path="/account" component={AccountNav} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
