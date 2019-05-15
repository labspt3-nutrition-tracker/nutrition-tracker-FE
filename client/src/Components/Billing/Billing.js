import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button';

const BillingSubmitButton = withStyles({
    root: {
        color: '#FCFCFB',
        backgroundColor: '#F4B4C3',
        width: '200px',
        height: 90,
        '&:hover': {
            backgroundColor: '#dba2af'
        }
    }
})(Button);


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
        console.log(e)
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        console.log(e)
        e.preventDefault();
// const { firstName, lastName, email } = this.state;

    }

    render(){
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.handleChange}
                        value={this.state.firstName}
                    />
                     <input 
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                        value={this.state.lastName}
                    />
                     <input 
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                </form>
                <BillingSubmitButton variant="contained" type="submit" size="large">
                    Buy Now
                </BillingSubmitButton>
                {/* <Button variant="contained" type="submit" color="#3685B5" size="large">
                Submit changes
                </Button> */}

            </>
        )
    }

}

export default Billing;