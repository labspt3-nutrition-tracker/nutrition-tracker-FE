import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import StripeCheckout from 'react-stripe-checkout';
import BillingHistory from './BillingHistory';
import ApolloClient from "apollo-boost";
import moment from 'moment';

const createSubscriptionMutation = gql`
  mutation createSubscriptionMutation($source: String!, $email: String!){
    createSubscription(source: $source, email: $email){
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

class Billing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      subscriptionLapse: "",
      premiumCurrent: false
    }
  }
  componentDidMount(){
    this.getCurrentUser(localStorage.getItem("token"))
  }
  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "http://localhost:4000",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT
      })
      .then(response => {
        this.getRecentBilling(response.data.getCurrentUser.id)
      })
      .catch(err => console.log(err));
  };

  getRecentBilling = id => {
    const client = new ApolloClient({
      uri: "http://localhost:4000"
    });

    client
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
    return(
      <div>
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
            <StripeCheckout
              amount={700}
              billingAddress
              description="Become a Super User!"
              locale="auto"
              name="NutritionTrkr"
              stripeKey="pk_test_Pq1dd4riM4hc3cc35SbfPQxk00HJAoDPfA"
              token={async token => {
                const response = await mutation({
                  variables: {source: token.id,
                  email: token.email}
                });
                console.log(response)
              }}
              zipcode
            />
          )}
        </Mutation>
        <BillingHistory/>
      </div>
    )
  }
}

export default Billing;