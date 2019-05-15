import React from 'react';
import StatsDateCard from './StatsDateCard';
import {withStyles} from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button';

class Stats extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value});
         console.log(e.target.value)
    }

    handleSubmit = (e) => {
        console.log(e)
        e.preventDefault();
// const { firstName, lastName, email } = this.state;

    }

    render(){
        return (
            <>
                <StatsDateCard />
                
            </>
        )
    }
}

export default Stats;