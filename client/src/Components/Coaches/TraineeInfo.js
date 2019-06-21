import React from 'react';
import ApolloClient from "apollo-boost";
import * as moment from "moment";
import styled from 'styled-components';
import {
  GET_FOOD_ENTRIES_BY_USER_QUERY,
  GET_WEIGHT_ENTRIES_QUERY,
  GET_EXERCISE_ENTRIES_QUERY
} from "../../graphql/queries";

const TraineeInfoContainer = styled.div`
  width: 100%;
  height: 50vh;
`;

const SelectDay = styled.select`
  padding-left: 5px;
  display: block;
  width: 30%;
  height: 35px;
  color: #40A798;
  background: #FCFCFB;
  font-size: 1.4em;
  margin: 0 auto;
  margin-top: 15px;
  border: 1px solid #40A798;
`;

const ViewData = styled.div`

`;

class TraineeInfo extends React.Component{
  constructor(props){
    super(props)
    this.state={
      viewMode: "today",
      foodEntries: [],
      weightEntries: [],
      exerciseEntries: [],
      initialWeight: 0,
      dayValue: moment().format("YYYY-MM-DD")
    }
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.traineeID !== this.props.traineeID){
      const trainee = this.props.traineeID
      const idToken = localStorage.getItem("token");
      const client = new ApolloClient({
        uri: "https://nutrition-tracker-be.herokuapp.com",
        headers: { authorization: idToken }
      });
      client.query({
        query: GET_FOOD_ENTRIES_BY_USER_QUERY,
        variables: {
          userId: trainee
        }
      })
      .then(response => {
        this.setState({
          foodEntries: response.data.getFoodEntriesByUserId
        })
        client.query({
          query: GET_WEIGHT_ENTRIES_QUERY,
          variables: {
            userId: trainee
          }
        })
        .then(response => {
          this.setState({
            weightEntries: response.data.getWeightEntriesByUserId
          })
          client.query({
            query: GET_EXERCISE_ENTRIES_QUERY,
            variables: {
              userId: trainee
            }
          })
          .then(response => {
            this.setState({
              exerciseEntries: response.data.getExerciseEntriesByUserId
            })
          })
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  handleViewChange = e => {
    this.setState({ viewMode: e.target.value})
  }

  render(){
    const { foodEntries, weightEntries, exerciseEntries } = this.state;
    const todayFoodEntries = foodEntries.filter(function(entry){
      return moment(new Date(entry.date)).format("MM/DD") === moment().format("MM/DD")
    })
    const todayWeightEntries = weightEntries.filter(function(entry){
      return moment(new Date(entry.date)).format("MM/DD") === moment().format("MM/DD")
    })
    const todayExerciseEntries = exerciseEntries.filter(function(entry){
      return moment(new Date(entry.date)).format("MM/DD") === moment().format("MM/DD")
    })
    console.log(todayFoodEntries)

    return(
      <TraineeInfoContainer>
        <SelectDay onChange={this.handleViewChange} >
          <option value="today"> Today</option>
          <option value="seven_days"> Last week's data</option>
        </SelectDay>
        {this.state.viewMode === "today" &&
        <ViewData>
          <h1> Today's Info </h1>
        </ViewData>
        }
        {this.state.viewMode === "seven_days" &&
        <ViewData>
          <h1> Last 7 days </h1>
        </ViewData>
      }

      </TraineeInfoContainer>
    )
  }
}

export default TraineeInfo;
