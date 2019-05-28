import React from "react";
import moment from 'moment';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import bootstrapPlugin from "@fullcalendar/bootstrap";

import "@fullcalendar/core/main.css";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    };
  }

  

  pickDate = arg => {
  const listedDate = arg.date
    console.log(arg.date);
    this.setState({
      date: listedDate
    });
    console.log(this.state.date);
    console.log(arg.dateStr)
    this.props.handleDateClick(moment(listedDate).format('ddd MMMM D YYYY'));
 
    console.log("date props:", this.props.datePicked);
  };



  render() {
    return (
      <div>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={this.pickDate}
          selectable="true"
        />
      </div>
    );
  }
}

export default Calendar;
