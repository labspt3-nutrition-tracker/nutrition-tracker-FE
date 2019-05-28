<<<<<<< HEAD
import React from 'react';
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick

const Calendar = () => {
    return (
        <div>
            <h1>Calendar</h1>
        </div>
    )
}

export default Calendar;
=======
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
>>>>>>> d22314bbced5ef527f84492f4704a3d5ec6d53bb
