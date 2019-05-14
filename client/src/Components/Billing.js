import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button';


class Billing extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            'firstName': '',
            'lastName': '',
            'email': '',
            'password': '',
            'paymentInfo': '',
            'subscriptionType': ''
        }
    }
    
    // componentDidMount() {

    // }

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({ ...this.state, [e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        console.log(e)
        e.preventDefault();
console.log('handle submit');
const { firstName, lastName, email } = this.state;

    }

    render(){
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="firstName"
                        placeholder={this.state.firstName}
                        handleChange={this.handleChange}
                        value={this.state.firstName}
                    />
                     <input 
                        type="text"
                        name="lastName"
                        placeholder={this.state.lastName}
                        handleChange={this.handleChange}
                        value={this.state.lastName}
                    />
                     <input 
                        type="text"
                        name="email"
                        placeholder={this.state.email}
                        handleChange={this.handleChange}
                        value={this.state.email}
                    />
                </form>
                <Button variant="contained" type="submit "color="primary">
                Submit changes
                </Button>
            </>
        )
    }

}

export default Billing;