import React from 'react'
import styled from "styled-components";

const Card = styled.div`
    display:flex;
    margin:10px;
`

const BillingHistoryCard = props => (
    <Card>
        <div className="amount">
            <p>${props.amountPaid === 700 ? 7 : 10}</p>
        </div>
        <div className="date" style={{marginLeft:"5px"}}>
            <p>{props.date}</p>
        </div>
    </Card>
)

export default BillingHistoryCard;