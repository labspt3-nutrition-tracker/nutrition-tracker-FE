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
    this.setState({
      date: listedDate
    });
    this.props.handleDateClick(moment(listedDate).format('ddd MMMM D YYYY'));
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
