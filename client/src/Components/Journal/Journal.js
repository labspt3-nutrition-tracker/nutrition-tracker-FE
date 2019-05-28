import React from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
import moment from 'moment';
import JournalEntry from './JournalEntry';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const JournalContainer = styled.div`
  margin: 3%;
  display: flex;
`;

const JournalEntryDiv = styled.div`
  width: 25%;
`;

const CalendarDiv = styled.div`
  width: 70%;
  height: 800px;
  border: 3px solid black;
`;

class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 1,
      datePicked: ""
    };
  };


  handleDateClick = date => {

    this.setState({ datePicked: date });
  };

  componentDidMount() {
    // var today = new Date();
    // var options = {weekday: 'short'};
    // var day = new Intl.DateTimeFormat('en-US', options).format();
    // console.log(new Intl.DateTimeFormat('en-US', options).format());
    // // should say current day of the week
    // var dd = String(today.getDate()).padStart(2, "0");
    // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    // var yyyy = today.getFullYear();
    // today = day + " " + mm + " " + dd + " " + yyyy;

    let date = moment().format('ddd MMMM D YYYY')
    this.setState({ datePicked: date });
  }

  render(){
 

    const FOODENTRYQUERY = gql`
      query{
        getFoodEntriesByUserId(userId: ${this.state.currentUser}){
          id
          date
          food_id{
            id
            foodName
          }
          meal_category_id{
            id
            mealCategoryName
          }
        }
      }
    `;

    return(
      <div>
        <Query query={FOODENTRYQUERY}>

        {({ loading, error, data }) => {
          if (loading) return <div>Fetching Entries</div>;
          if (error) return <div>Cannot Load</div>;

          const foodEntries = data.getFoodEntriesByUserId;

        return (
          
          <JournalContainer>
           <JournalEntryDiv>
              <JournalEntry

                modifiedDate={this.state.datePicked}
                foodEntries={foodEntries}
                datePicked={this.state.datePicked} />
            </JournalEntryDiv>
            <CalendarDiv>
              <Calendar
              
                datePicked={this.state.datePicked}
                handleDateClick={this.handleDateClick}/>
            </CalendarDiv>

          </JournalContainer>
        )
        }}
        </Query>


      </div>
    )
  }
}

export default Journal;
