import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import StripeCheckout from 'react-stripe-checkout';
import BillingHistory from './BillingHistory';
import ApolloClient from "apollo-boost";
import moment from 'moment';
import AccountNav from '../AccountNav';
import { makeStyles } from '@material-ui/core/styles';

const createSubscriptionMutation = gql`
  mutation createSubscriptionMutation($source: String!, $email: String!, $amount: Int!){
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
    }
  }
`;

let divStyle = {
  display: 'flex',
  height: '80vh',
  justifyContent: 'space-between'
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
    return(

      // <div
      // className={classes.root}
      // >
      <div style={divStyle}>
            <AccountNav />
        <div>
          <p>{this.state.premiumCurrent ? "Premium":"Basic"} User</p>
          {
            this.state.subscriptionLapse.length > 1 ? (
              <p>Current Until: {this.state.subscriptionLapse}</p>
            ) : (null)
          }
        </div>
        <Mutation mutation={createSubscriptionMutation}>
          {mutation => (
            <div>
              <StripeCheckout
                amount={premium}
                billingAddress
                label="Become a Premium User"
                description="Become a Premium User!"
                locale="auto"
                name="NutritionTrkr"
                stripeKey="pk_test_Pq1dd4riM4hc3cc35SbfPQxk00HJAoDPfA"
                token={async token => {
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
                stripeKey="pk_test_Pq1dd4riM4hc3cc35SbfPQxk00HJAoDPfA"
                props={console.log()}
                token={async token => {
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
      {/* </div> */}
    </div>
    )
  }
}

 export default Billing;