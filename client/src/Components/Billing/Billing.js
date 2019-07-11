import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import StripeCheckout from 'react-stripe-checkout';
import BillingHistory from './BillingHistory';
import ApolloClient from "apollo-boost";
import moment from 'moment';
import styled from "styled-components";
import AccountNav from '../AccountNav';
import { makeStyles } from '@material-ui/core/styles';
import { wrap } from "module";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";


const createSubscriptionMutation = gql`
  mutation createSubscription($source: String!, $email: String!, $amount: Int!){
    createSubscription(source: $source, email: $email, amount: $amount){
      id
    }
  }
`;

const getRecentBillingQuery  = gql`
  query getRecentBilling($id: ID!){
    getRecentBilling(id: $id){
      date
    }
  }
`;

const GET_CURRENT = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      email
      userType
    }
  }
`;
const BillingContainer = styled.div`
  padding-top:50px;
  display:flex;
  flex-direction:column;
  align-content:center;
  flex-wrap:wrap;
  width:60%;
`;

let divStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  // height: '80vh',
  justifyContent: 'flex-start'
  // marginLeft: "25%"
}

// const useStyles = makeStyles(theme => ({

//   root: {
//     display: 'flex',
//   }

// }));
// const classes = useStyles();

 class Billing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      subscriptionLapse: "",
      premiumCurrent: false,
      userType: ""
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
        query: GET_CURRENT
      })
      .then(response => {
        this.getRecentBilling(response.data.getCurrentUser.id)
        this.setState({
          userType: response.data.getCurrentUser.userType
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
        query: getRecentBillingQuery,
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

      // <div
      // className={classes.root}
      // >

      <div style={divStyle}>
            <AccountNav />
    <Grid 
      item md={8} xs={12}
      container
      justify="center"
      alignItems="center"
      border="1px solid black"
      classes={{ root: classes.gridContainer }}
    >
        {/* <BillingContainer> */}
          <p>Type: {this.state.userType.toUpperCase()}</p>
          {
            this.state.subscriptionLapse.length > 1 ? (
              <p>Current Until: {this.state.subscriptionLapse}</p>
            ) : (null)
          }
          <Mutation mutation={createSubscriptionMutation} onError={err => {console.log(err)}}>
            {mutation => (
              <div>
                <StripeCheckout
                backgroundColor="#5E366A"
                  amount={premium}
                  billingAddress
                  label="Become a Premium User"
                  description="Become a Premium User!"
                  locale="auto"
                  name="NutritionTrkr"
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
                <StripeCheckout
                  amount={coach}
                  billingAddress
                  label="Become a Coach"
                  description="Become a Coach!"
                  locale="auto"
                  name="NutritionTrkr"
                  stripeKey={process.env.REACT_APP_STRIPE_KEY}
                  token={async token => {
                    console.log(token)
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
            )}
          </Mutation>
          <BillingHistory/>
        {/* </BillingContainer> */}
        </Grid>
      </div>
   
    )
  }
}

const styles = theme => ({
  gridContainer: {
    padding: "3%",
    margin: "20% 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

 export default withStyles(styles)(Billing);