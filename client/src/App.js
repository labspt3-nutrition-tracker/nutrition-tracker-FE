import React from 'react';
import Login from './Components/Auth/Login';
import './App.css';
import Header from './Components/Reusables/Header';
import { Route, withRouter, Link} from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Journal from './Components/Journal/Journal';
import Home from './Components/Home/Home';
import Billing from './Components/Billing/Billing';
import StatsView from './Components/Stats/StatsView';
import Settings from './Components/Settings';
import AccountNav from "./Components/AccountNav";
import BillingPlans from "./Components/Billing/BillingPlans";
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    position:               'absolute'
  }
};

Modal.setAppElement('#root')

const EDAMAM_API_ID = process.env.REACT_APP_EDAMAM_APP_ID;
const EDAMAM_API_KEY = process.env.REACT_APP_EDAMAM_API_KEY;

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchInput:'',
      searchResults: [],
      noResultError: '',
      showModal: false
    };
  }

  updateSearch = e => {
    this.setState({
      searchInput: e.target.value
    })
    console.log("updateSearch", this.state.searchInput)
  }

  openModal = () => {
    this.setState({ showModal: true})
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }


  getFoodData = food => {
    food = this.state.searchInput;
    let encodedFood = food.replace(' ', '%20')
    console.log(encodedFood)
    console.log(EDAMAM_API_ID)
    axios
      .get(`https://api.edamam.com/api/food-database/parser?ingr=${encodedFood}&app_id=${EDAMAM_API_ID}&app_key=${EDAMAM_API_KEY}`)
      .then(response =>{
        this.setState({
          searchResults: response.data.hints,
          searchInput: '',         
          noResultError: '',
          showModal: true
        })
        console.log('search results', this.state.searchResults)
      })
      .catch(error =>{
        this.setState({
          searchInput: '',
          noResultError: 'No results found',
          showModal: true,
          searchResults: []})
          console.log('error', error);
        console.log(this.state.noResultError)
        
      });
  }

  // handleFoodSubmit = e => {
  //   console.log('handle currentTarget',e.currentTarget)
  //   //  [e.target.name]: e.target.value
  //   this.props.history.push('/dashboard')
  // }

  // addToDashBoard = e => {
  //    e.preventDefault();
  //    this.props.push('/dashboard')
  // }

  render(){
    return (
      <div className="App">
        <Header searchInput={this.state.searchInput} updateSearch={this.updateSearch}
          getFoodData={this.getFoodData}
          style={customStyles} 
          />
        <div>
        <Modal
        
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
         
        >
  { this.state.searchResults && Object.keys(this.state.searchResults).map((obj, i) => {
    
     return (
       <Link to={{pathname:'/dashboard', state:{
         edamam_id:this.state.searchResults[obj].food.foodId,
         calories:this.state.searchResults[obj].food.nutrients.ENERC_KCAL,
         carbs:this.state.searchResults[obj].food.nutrients.CHOCDF ? this.state.searchResults[obj].food.nutrients.CHOCDF : 0,
         protein:this.state.searchResults[obj].food.nutrients.PROCNT ? this.state.searchResults[obj].food.nutrients.PROCNT : 0,
         fat:this.state.searchResults[obj].food.nutrients.FAT ? this.state.searchResults[obj].food.nutrients.FAT : 0 ,
       }}} >
          <div
          key={this.state.searchResults[obj].food.foodId} 
          onClick={this.handleFoodSubmit} 
          onSubmit={this.addToDashBoard}       
          >
            <p> {this.state.searchResults[obj].food.label}</p>
            <p>calories: {this.state.searchResults[obj].food.nutrients.ENERC_KCAL ? this.state.searchResults[obj].food.nutrients.ENERC_KCAL : 0}</p>
            <p>carbs: {this.state.searchResults[obj].food.nutrients.CHOCDF ? this.state.searchResults[obj].food.nutrients.CHOCDF : 0 }</p>
            <p>protein: {this.state.searchResults[obj].food.nutrients.PROCNT ? this.state.searchResults[obj].food.nutrients.PROCNT : 0 }</p>
            <p>fat: {this.state.searchResults[obj].food.nutrients.FAT ? this.state.searchResults[obj].food.nutrients.FAT : 0 }</p>
          </div>
       </Link>
     );
     console.log('handleFoodSubmit', this.handleFoodSubmit)
   })}
    {!this.state.searchResults}  <div> {this.state.noResultError} </div> 

          <button onClick={this.closeModal}>close</button>
        </Modal>
        </div>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" render={(props) => <Dashboard {...props} searchResults={this.state.searchResults}/>} />
          <Route exact path="/billing-plan" render={() => <BillingPlans />} />
          <Route exact path="/billing" render={() => <Billing />} />
          <Route exact path="/stats" render={() => <StatsView />} />
          <Route
          exact path="/login" render={() => <Login/>} />
          <Route
          exact path="/settings" render={() => <Settings/>} />
          <Route
            path="/journal" render={() => <Journal/>} />
        </div>
        <Route path="/account" render={() => <AccountNav />} />
      </div>
    )
  };
}




export default withRouter(App);
