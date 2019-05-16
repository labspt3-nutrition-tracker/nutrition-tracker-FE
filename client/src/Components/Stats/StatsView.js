import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StatsDashboard from './StatsDashboard';
import FoodLogStats from './FoodLogStats';


class StatsView extends React.Component{
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
                <Grid
            container
            spacing={8}
            lg={4}
            direction="row"
            justify="center"
            alignItems="center"
            >
                <StatsDashboard />
                <FoodLogStats />
            </Grid>
            </>
         
        )
    }
}

export default StatsView;