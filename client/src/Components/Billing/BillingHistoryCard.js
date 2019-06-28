import React from 'react'

const BillingHistoryCard = props => (

    <div>
        <div className="amount">

            <p>${props.amountPaid === 700 ? 7 : 10}</p>
        </div>
        <div className="date">
            <p>{props.date}</p>
        </div>
    </div>
)

export default BillingHistoryCard;