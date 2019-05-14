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

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();

    }

    render(){
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <Input 
                        type="text"
                        name="firstName"
                        placeholder={this.state.firstName}
                        handleChange={this.handleChange}
                        value={this.state.firstName}
                    />
                     <Input 
                        type="text"
                        name="lastName"
                        placeholder={this.state.lastName}
                        handleChange={this.handleChange}
                        value={this.state.lastName}
                    />
                     <Input 
                        type="text"
                        name="email"
                        placeholder={this.state.email}
                        handleChange={this.handleChange}
                        value={this.state.email}
                    />
                </form>
                <Button variant="contained" color="primary">
                Submit changes
                </Button>
            </>
        )
    }

}

export default Billing;