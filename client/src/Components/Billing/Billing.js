import React from "react";
import Header from "../Reusables/Header";
// import BillingPlans from "./BillingPlans";
import { Link } from 'react-router-dom';
import styled from "styled-components";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from "prop-types";
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';



const BillingContainer = styled.div`
  background: #fcfcfb;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
`;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    height: 40,
    width: 100,
    color: "white",
    textDecoration: "none",
    disableUnderline: true,
  },
  container: {
    display: 'flex',
    width: '1000px',
    maxWidth: '1500px',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textField: {
    flexBasis: 200,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

const plans = [
  {
    plan: 'Monthly',
    label: 7
  },
  {
    plan: 'Yearly',
    label: 70
  }
]

const BillingSubmitButton = withStyles({
  root: {
    color: "#FCFCFB",
    backgroundColor: "#F4B4C3",
    width: "200px",
    height: 90,
    "&:hover": {
      backgroundColor: "#dba2af"
    }
  }
})(Button);

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      creditCardNumber: "",
      expiration: "",
      cvv: "",
      subscriptionType: "",
    };
  }

  // componentDidMount() {

  // }


  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
    console.log(e.target.value);
  };

  handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    // const { firstName, lastName, email } = this.state;
  };

  render(props) {
    const { classes } = this.props;
    return (
      <div>
           <Header />
      {/* <BillingContainer> */}
        <Button color="secondary" variant="contained" className={classes.button}><Link to="/billing-plan">Close</Link></Button>
        <Grid
          container
          spacing={0}
          // lg={8}
          direction="column"
          justify="center"
          alignItems="center"
        >
          {/* <form onSubmit={this.handleSubmit}> */}
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              required
              id="filled-required"
              label="Required"
              type="text"
              label="First Name"
              className={classes.textField}
              onChange={this.handleChange("firstName")}
              value={this.state.firstName}
              margin="normal"
            variant="filled"
            />
            <TextField
              required
              id="filled-required"
              type="text"
              label="Last Name"
              className={classes.textField}
              onChange={this.handleChange("lastName")}
              value={this.state.lastName}
              margin="normal"
            variant="filled"
            />
            <TextField
              required
              id="filled-email-input"
              label="Email "
              className={classes.textField}
              type="email"
              name="email"
              onChange={this.handleChange("email")}
              value={this.state.email}
              autoComplete="email"
              margin="normal"
              variant="filled"
            />
             <TextField
              required
              id="filled-number"
              label="CC #"
              className={classes.textField}
              type="CC#"
              onChange={this.handleChange("creditCardNumber")}
              value={this.state.creditCardNumber}
              autoComplete="CC #"
              margin="normal"
              variant="filled"
            />
              <TextField
              required
              id="filled-number"
              label="expiration date"
              className={classes.textField}
              type="expiration"
              onChange={this.handleChange("expiration")}
              value={this.state.expiration}
              autoComplete="expiration"
              margin="normal"
              variant="filled"
            />
               <TextField
              required
              id="filled-number"
              label="cvv"
              className={classes.textField}
              type="cvv"
              onChange={this.handleChange("cvv")}
              value={this.state.cvv}
              autoComplete="cvv"
              margin="normal"
              variant="filled"
            />
              <TextField
                required
                select
                label="Plan Type"
                className={classes.textField}
                value={this.state.subscriptionType}
                onChange={this.handleChange('subscriptionType')}
                margin="normal"
                variant="filled"
                // InputProps={{
                //   startAdornment: <InputAdornment position="start">Plan Type</InputAdornment>,
                // }}
              >
                {plans.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                      {option.plan}: {option.label}
                  </MenuItem>
                ))}
            </TextField>
          </form>
          <BillingSubmitButton variant="contained" type="submit" size="large">
            Buy Now
          </BillingSubmitButton>
        </Grid>
      {/* </BillingContainer> */}
      {/* </div> */}
      </div>
    );
  }
}

Billing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Billing);
