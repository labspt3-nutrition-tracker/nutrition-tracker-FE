import React from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
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
    }
  }

  componentWillReceiveProps(newProps){
      this.setState({foodEntries: newProps.FOODENTRYQUERY.data})
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
          console.log(foodEntries);

        return (
          <JournalContainer>
           <JournalEntryDiv>
              <JournalEntry foodEntries={foodEntries} />
            </JournalEntryDiv>
            <CalendarDiv>
              <Calendar />
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
