import React from "react";
import { Mutation } from "react-apollo";
import StripeCheckout from 'react-stripe-checkout';
import BillingHistory from './BillingHistory';
import ApolloClient from "apollo-boost";
import moment from 'moment';
import AccountNav from '../AccountNav';
// import { wrap } from "module";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";


import {GET_CURRENT_USER_QUERY, GET_RECENT_BILLING} from "../../graphql/queries";
import {CREATE_SUBSCRIPTION} from "../../graphql/mutations";

const styles = theme => ({
divStyle: {
  fontFamily: "Oswald",
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: "flex-start"
},
subscriptionDiv: {
  display: "flex"
},
gridContainer: {
  padding: "3%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",

},
billingTop: {
    display: 'flex',
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    flexGrow: 1,
    height:"100px",
    width: "100%"
  },
card: {
    width: "100%",
    maxWidth: 500,
    height: "400px",
    marginLeft: "7%",
    padding: 10,
    flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      maxWidth: 1000,
      margin: "inherit",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  },
  paraDiv: {
    display: "flex",
    alignItems: "center",
    fontSize: "2rem"
  },
  paraDivValue: {
    fontSize: "1.7rem",
    paddingLeft: "5px"
  },
  buttons: { justifyContent: "space-around" },
  btn: {
    fontSize: "1.4rem",
    color: "#FCFCFB",
    border: "2px solid #5E366A",
    backgroundColor: "#5E366A",
    padding: "5px 8px",
    "&:hover": {
      backgroundColor: "white",
      color: "#545454"
    },
    fontFamily: "Oswald"
  }
});

 class Billing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      subscriptionLapse: "",
      premiumCurrent: false,
      userType: "",
      name: "",
      email: ""
    }
  }

  componentDidMount(){
    this.getCurrentUser(localStorage.getItem("token"))
  }
  getCurrentUser = async idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    await client
      .query({
        query: GET_CURRENT_USER_QUERY
      })
      .then(response => {
        this.getRecentBilling(response.data.getCurrentUser.id)
        this.setState({
          userType: response.data.getCurrentUser.userType,
          name: response.data.getCurrentUser.firstName,
          email: response.data.getCurrentUser.email
        })
      })
      .catch(err => console.log(err));
  };

  getRecentBilling = async id => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    await client
      .query({
        query: GET_RECENT_BILLING,
        variables: {
          id: id
        }
      })
      .then(response => {
        this.getDates(response.data.getRecentBilling.date)
      })
      .catch(err => console.log(err))
  }

  getDates = date => {
    const lastCycle = moment(date).format();
    const today = moment();
    const thirtyDays = moment(lastCycle).add(30, 'days').format('ddd MMMM D YYYY')

    if(today.diff(lastCycle, 'days') < 30){
      this.setState({
        subscriptionLapse: thirtyDays,
        premiumCurrent: !this.state.premiumCurrent
      })
    }else{
      this.setState({
        premiumCurrent: !this.state.premiumCurrent
      })
    }
  };

  render(){
    const premium = 700;
    const coach = 1000;
    const { classes } = this.props;

    return(

    <div className={classes.divStyle}>
            <AccountNav />
    <Grid 
      item md={8} xs={12}
      container
      justify="center"
      alignItems="center"
      border="1px solid black"
      classes={{ root: classes.gridContainer }}
    >
        <Card className={classes.card}>
          <div className={classes.billingTop}>
            {/* <div> */}
            <p className={classes.paraDiv}>Type:  <p className={classes.paraDivValue}> {this.state.userType.charAt(0).toUpperCase() + this.state.userType.slice(1)}</p></p>
             {
              this.state.subscriptionLapse.length > 1 ? (
                <p className={classes.paraDiv}> Subscription Until: <p className={classes.paraDivValue}> {this.state.subscriptionLapse}</p></p>
              ) : (null)
            }
          <Mutation mutation={CREATE_SUBSCRIPTION} onError={err => {console.log(err)}}>
            {mutation => (
              <div className={classes.subscriptionDiv}>
                <div style={
                  {
                  body: "#5e366a",
                  paddingRight: "5px"
                  }
                }>
                <StripeCheckout
                  amount={premium}
                  class="StripeCheckout"
                  label="Become a Premium User"
                  description="Become a Premium User!"
                  locale="auto"
                  name="NutritionTrkr"
                  email={this.state.email}
                  stripeKey={process.env.REACT_APP_STRIPE_KEY}
                  token={async token => {
                    console.log(token.id,token.email, premium)
                    const response = await mutation({
                      variables: {
                        source: token.id,
                        email: token.email,
                        amount: premium
                      }
                    });
                    console.log(response)
                  }}
                  zipcode
                />
                </div>
                <div>
                <StripeCheckout
                  amount={coach}
                  label="Become a Coach"
                  className="StripeCheckout"
                  description="Become a Coach!"
                  locale="auto"
                  name="NutritionTrkr"
                  email={this.state.email}
                  stripeKey={process.env.REACT_APP_STRIPE_KEY}
                  token={async token => {
                    console.log(token)
                    console.log(token.id,token.email, coach)
                    const response = await mutation({
                      variables: {
                        source: token.id,
                        email: token.email,
                        amount: coach
                      }
                    });
                    console.log(response)
                  }}
                  zipcode
                />
                </div>
              </div>
            )}
          </Mutation>
        </div>
          <BillingHistory/>
          {/* </div> */}
        </Card>
        </Grid>
      </div>
   
    )
  }
}

 export default withStyles(styles)(Billing);
