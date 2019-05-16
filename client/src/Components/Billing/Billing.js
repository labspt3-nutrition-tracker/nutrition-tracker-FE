import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

const BillingCheckLabel = withStyles({
    root: {
        color: '#3685B5',
        '&$checked': {
            color: '#3685B5',
          },
    },
    checked: {}
})


class Billing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            creditCardNumber: '',
            expiration: '',
            cvv: '',
            subscriptionType: '',
            checkedLabel: false,
            checkedDummy: false
        }
    }
    
    // componentDidMount() {

    // }

    handleChange = input => (e) => {
        this.setState({ [input]: e.target.value});
        console.log(e.target.value)
    }

    handleSubmit = (e) => {
        console.log(e)
        e.preventDefault();
// const { firstName, lastName, email } = this.state;

    }

    render(){
        const { classes } = this.props;
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.handleChange('firstName')}
                        value={this.state.firstName}
                    />
                     <input 
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={this.handleChange('lastName')}
                        value={this.state.lastName}
                    />
                     <input 
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange('email')}
                        value={this.state.email}
                    />
                     <input 
                        type="text"
                        name="creditCardNumber"
                        placeholder="CC#"
                        onChange={this.handleChange('creditCardNumber')}
                        value={this.state.creditCardNumber}
                    />
                     <input 
                        type="text"
                        name="expiration"
                        placeholder="Expiration Date"
                        onChange={this.handleChange('expiration')}
                        value={this.state.expiration}
                    />
                     <input 
                        type="text"
                        name="cvv"
                        placeholder="cvv"
                        onChange={this.handleChange('cvv')}
                        value={this.state.cvv}
                    />
                    <label>
                <input
                    name="checkedDummy"
                    type="checkbox"
                    checked={this.state.icheckedDummy}
                    onChange={this.handleChange} />
                        monthly subscription - $ 5.99
                </label>
                        <FormControlLabel
                control={
                    <Checkbox
                    name={this.state.checkedLabel}
                    //   type='checkbox'
                    onChange={this.handleChange('checkedLabel')}
                    value={this.state.checkedLabel}
                    classes={{
                        root: classes.root,
                        checked: classes.checked,
                    }}
                    />
                }
                label="1 Year Subscription - $9.99"
                />
                </form>
                <BillingSubmitButton variant="contained" type="submit" size="large">
                    Buy Now
                </BillingSubmitButton>

         </>
        )
    }

}

Billing.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(BillingCheckLabel)(Billing);