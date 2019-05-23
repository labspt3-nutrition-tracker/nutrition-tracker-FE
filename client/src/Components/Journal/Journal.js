import React from 'react';
import Calendar from './Calendar';
import JournalEntry from './JournalEntry';


// import { Link } from 'react-router-dom';

class Journal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render(){
        return (
            <>
            <Calendar />
            <JournalEntry />
            </>
        )
    }
}

export default Journal;