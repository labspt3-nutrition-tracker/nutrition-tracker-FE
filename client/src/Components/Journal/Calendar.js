import React from "react";
import moment from 'moment';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
// import bootstrapPlugin from "@fullcalendar/bootstrap";

import "@fullcalendar/core/main.css";

const GET_CURRENT = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      userType
    }
  }
`;

const getRecentBillingQuery  = gql`
  query getRecentBilling($id: ID!){
    getRecentBilling(id: $id){
      date
    }
  }
`;
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      prevSeven: "",
      userType: "basic"
    };
  }

  componentDidMount(){
    this.getCurrentUser(localStorage.getItem("token"))
  }
  getCurrentUser = async idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    await client
      .query({
        query: GET_CURRENT
      })
      .then(response => {
        this.getRecentBilling(response.data.getCurrentUser.id)
        this.setState({
          userType: response.data.getCurrentUser.userType
        })
      })
      .catch(err => console.log(err));
  };

  getRecentBilling = async id => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    await client
      .query({
        query: getRecentBillingQuery,
        variables: {
          id: id
        }
      })
      .then(response => {
        this.getDates(response.data.getRecentBilling.date)
      })
      .catch(err => console.log(err))
  }

  getDates = date => {
    const lastCycle = moment(date).format();
    const today = moment();
    const sevenDays = moment(lastCycle).subtract(7, 'days').format('ddd MMMM D YYYY')

    if(today.diff(lastCycle, 'days') < 30){
      this.setState({
        prevSeven: sevenDays
      })
    }
  };

  pickDate = arg => {
    const listedDate = arg.date
    const today = moment()
    console.log(this.state.userType)
    if(this.state.userType !== "basic" || !(today.diff(listedDate, 'days') > 7)){
      this.props.handleDateClick(moment(listedDate).format('ddd MMMM D YYYY'), true);
    }else if((today.diff(listedDate, 'days') > 7)){
      this.props.handleDateClick(moment(listedDate).format('ddd MMMM D YYYY'), false)
    }
  };


  render() {
    return (
      <div>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={this.pickDate}
          selectable="true"
          handleWindowResize="true"
        />
      </div>
    );
  }
}

export default Calendar;
