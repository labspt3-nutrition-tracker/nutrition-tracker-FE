import React from 'react';


class FoodLogStats extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dateTab: '',
            chartChanges: '',
            barChanges: '',
            carbs: '',
            protein: '',
            fat: '',
            random:''
        }
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();
    }
   

render(){
    return (
        <>
        </>
    )
}

}

export default FoodLogStats;