import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import StripeCheckout from 'react-stripe-checkout';

const createSubscriptionMutation = gql`
  mutation createSubscriptionMutation($source: String!, $email: String!){
    createSubscription(source: $source, email: $email){
      id
    }
  }
`

const Billing = props => {
  return(
    <Mutation
      mutation={createSubscriptionMutation}
    >
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
              variables: {source: token.id, email: token.email}
            });
            console.log(response)
          }}
          zipcode
        />
      )}
    </Mutation>
  )
}

export default Billing;