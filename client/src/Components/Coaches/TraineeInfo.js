import React from 'react';
import ApolloClient from "apollo-boost";
import * as moment from "moment";
import styled from 'styled-components';
import OneDayStats from './../Reports/OneDayStats';
import StatsDashboard from './../Reports/StatsDashboard';
import ManyDaysStats from "./../Reports/ManyDaysStats";
import WeightStats from "./../Reports/WeightStats";
import ExerciseStats from "./../Reports/ExerciseStats";
import Accomplishments from "./../Reports/Accomplishments";
import PDFReport from "./../Reports/PDFReports/PDFReport";
import { getLastXDays }  from '../../util/getLastXDays.js';
import {
  GET_FOOD_ENTRIES_BY_USER_QUERY,
  GET_WEIGHT_ENTRIES_QUERY,
  GET_EXERCISE_ENTRIES_QUERY,
  GET_USER_BY_ID
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
      option: 0,
      days: [moment().format("YYYY-MM-DD")],
      data: "caloriesPerServ",
    }
  }
  handleChartChange = days => {
    if (days.length === 1 && (this.state.data === "weight" || this.state.data === "exercise"))
      this.setState({ data: "caloriesPerServ" });
    this.setState({ days: days });
  };

  handleDataChange = data => {
    this.setState({ data: data });
  };

  handleOptionChange = (event, option) => {
    this.setState({ option: option });
  };

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
            client.query({
              query: GET_USER_BY_ID,
              variables: {
                userId: trainee
              }
            })
            .then(response =>{
              this.setState({
                initialWeight: response.data.getUserById.weight
              })
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
    const { foodEntries, weightEntries, exerciseEntries, days, data, option, initialWeight } = this.state;
    console.log('this.state', this.state)
    return(
      <TraineeInfoContainer>
        {this.props.traineeID &&
          <div>
            <StatsDashboard
              chartChange={this.handleChartChange}
              dataChange={this.handleDataChange}
              currentUser={this.props.traineeID}
            />

            {days.length === 1 ? (
              <OneDayStats foodEntries={foodEntries} days={days} data={data} />
            ) : (
              <div>
                {data === "weight" ? (
                  <WeightStats weightEntries={weightEntries} days={days} initialWeight={initialWeight} />
                ) : (
                  <div>
                    {data === "exercise" ? (
                      <ExerciseStats exerciseEntries={exerciseEntries} days={days} />
                    ) : (
                      <ManyDaysStats foodEntries={foodEntries} days={days} dataType={data} />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
      }


      </TraineeInfoContainer>
    )
  }
}

export default TraineeInfo;
