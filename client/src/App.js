import React from "react";
import Login from "./Components/Auth/Login";
import "./App.css";
import Header from "./Components/Reusables/Header";
<<<<<<< HEAD
import { Route, withRouter, Link } from "react-router-dom";
=======
import { Route, withRouter} from "react-router-dom";
>>>>>>> development
import Dashboard from "./Components/Dashboard/Dashboard";
import Journal from "./Components/Journal/Journal";
import Home from "./Components/Home/Home";
import Billing from "./Components/Billing/Billing";
import StatsView from "./Components/Stats/StatsView";
import Settings from "./Components/Settings";
import AccountNav from "./Components/AccountNav";
import BillingPlans from "./Components/Billing/BillingPlans";
<<<<<<< HEAD
import axios from "axios";
import Modal from "react-modal";
import styled from "styled-components";

const Food = styled.div`
  margin: 5px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.1);
`;

const ResultDiv = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid black;
  flex-direction: column;
  font-size: 1.5rem;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "absolute"
  }
};

Modal.setAppElement("#root");
=======
import AppModal from "./Components/Reusables/AppModal";
import axios from "axios";
>>>>>>> development

const EDAMAM_API_ID = process.env.REACT_APP_EDAMAM_APP_ID;
const EDAMAM_API_KEY = process.env.REACT_APP_EDAMAM_API_KEY;

class App extends React.Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
=======
  constructor(props){
    super(props);
    this.state = {
      searchInput:"",
>>>>>>> development
      searchResults: [],
      noResultError: "",
      showModal: false
    };
  };

  updateSearch = e => {
    this.setState({
      searchInput: e.target.value
    });
<<<<<<< HEAD
    console.log("updateSearch", this.state.searchInput);
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
=======
  };

  openModal = () => {
    this.setState({ showModal: true})
  };

  closeModal = () => {
    this.setState({ showModal: false })
>>>>>>> development
  };

  getFoodData = food => {
    food = this.state.searchInput;
<<<<<<< HEAD
    let encodedFood = food.replace(" ", "%20");
    console.log(encodedFood);
    console.log(EDAMAM_API_ID);
=======
    let encodedFood = food.replace(" ", "%20")
>>>>>>> development
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
<<<<<<< HEAD
        });
        console.log("search results", this.state.searchResults);
=======
        })
        console.log("search results", this.state.searchResults)
>>>>>>> development
      })
      .catch(error => {
        this.setState({
          searchInput: "",
<<<<<<< HEAD
          noResultError: "No results found",
          showModal: true,
          searchResults: []
        });
        console.log("error", error);
        console.log(this.state.noResultError);
=======
          noResultError: 'No results found',
          showModal: true,
          searchResults: []})
          console.log("error", error);
>>>>>>> development
      });
  };

  handleFoodSubmit = food => {
<<<<<<< HEAD
    // console.log('handle currentTarget',e.currentTarget)
    //  [e.target.name]: e.target.value
    // this.props.history.push('/dashboard')
    // console.log(food)
    this.setState({ selectedFood: food });
  };

  addToDashBoard = e => {
    e.preventDefault();
    //  const addedFood = this.props.location.state;
    //  this.props.history.push(addedFood)
    //  console.log('addToDashBoard', addedFood)
  };

  render() {
    console.log(this.state.searchResults);
=======
    this.setState({selectedFood: food})
    this.closeModal()
  }

  render(){
>>>>>>> development
    return (
      <div className="App">
        <Header
          searchInput={this.state.searchInput}
          updateSearch={this.updateSearch}
          getFoodData={this.getFoodData}
<<<<<<< HEAD
          style={customStyles}
        />
        <div>
          <Modal isOpen={this.state.showModal} onRequestClose={this.closeModal}>
            <ResultDiv>
            {this.state.searchResults &&
              this.state.searchResults.map(food => {
                //console.log("food:", food)
                return (
                  <Food
                    key={food.food.foodId}
                    onClick={() => this.handleFoodSubmit(food.food)}
                  >
                    <Link to={{ pathname: "/dashboard" }}>
                      <div>
                        <div>{food.food.label}</div>
                        <div>{food.food.brand ? food.food.brand : null}</div>
                        <div>Calories:{food.food.nutrients.ENERC_KCAL}</div>
                        <div>Carbohydrates:{food.food.nutrients.CHOCDF}</div>
                        <div>Protein:{food.food.nutrients.PROCNT}</div>
                        <div>Fat:{food.food.nutrients.FAT}</div>
                      </div>
                    </Link>
                  </Food>
                );
                console.log("handleFoodSubmit", this.handleFoodSubmit);
              })}
            {!this.state.searchResults} <div> {this.state.noResultError} </div>
            <button onClick={this.closeModal}>close</button>
            </ResultDiv>
          </Modal>
        </div>
        <div>
          <Route exact path="/" component={Home} />
          <Route
            path="/dashboard"
            render={props => (
              <Dashboard {...props} selectedFood={this.state.selectedFood} />
            )}
          />
=======
          />
        <AppModal
          isOpen={this.state.showModal}
          openModal={this.openModal}
          closeModal={this.closeModal}
          noResultError={this.state.noResultError}
          handleFoodSubmit={this.handleFoodSubmit}
          searchResults={this.state.searchResults}/>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" render={(props) => <Dashboard {...props} selectedFood = {this.state.selectedFood}/>} />
>>>>>>> development
          <Route exact path="/billing-plan" render={() => <BillingPlans />} />
          <Route exact path="/billing" render={() => <Billing />} />
          <Route exact path="/stats" render={() => <StatsView />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/settings" render={() => <Settings />} />
          <Route path="/journal" render={() => <Journal />} />
        </div>
        <Route path="/account" render={() => <AccountNav />} />
      </div>
    );
  }
}

export default withRouter(App);
