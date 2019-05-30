import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const onToken = (token, addresses) => {
  console.log(token)
}
const Billing = props => {
  return(
    <div>
      <StripeCheckout
        amount={700}
        billingAddress
        description="Become a Super User!"
        locale="auto"
        name="NutritionTrkr"
        stripeKey="pk_test_Pq1dd4riM4hc3cc35SbfPQxk00HJAoDPfA"
        token={onToken}
        zipcode
      />
    </div>
  )
}

export default Billing;