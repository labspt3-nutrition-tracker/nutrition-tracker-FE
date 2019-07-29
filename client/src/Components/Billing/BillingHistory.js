import React from "react";
import { Query } from 'react-apollo';
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import BillingHistoryCard from './BillingHistoryCard';
import {GET_CURRENT_USER_QUERY, GET_BILLING_HISTORY} from "../../graphql/queries";



const PaymentHistory = styled.div`
    display:flex;
    font-size: 1.3rem;
    flex-direction:column;
    justify-content:center;
    overflow:auto;
    align-items:center;
    padding:20px;
    max-height:350px;
`;
class BillingHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: null
        }
    }

    componentDidMount(){
        this.getCurrentUser(localStorage.getItem("token"))
    }

    getCurrentUser = idToken => {
        const client = new ApolloClient({
        uri: "https://nutrition-tracker-be.herokuapp.com",
        headers: { authorization: idToken }
        });

        client
        .query({
            query: GET_CURRENT_USER_QUERY
        })
        .then(response => {
            this.setState({
                userId: response.data.getCurrentUser.id
            });
        })
        .catch(err => console.log(err));
    };



    render(){
        return(
            <>
                <Query query={GET_BILLING_HISTORY} variables={{id: this.state.userId}}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Fetching Entries</div>;
                        if (error) return <div>Error</div>;
                        return (
                            <PaymentHistory>
                                <h2 style={{fontSize:"2rem", display: "flex"}}>Previous Payments:</h2>
                                {data.getBillingHistory.map(bills => (
                                    <BillingHistoryCard key={bills.id} date={bills.date} amountPaid={bills.amount_paid}/>
                                ))}
                            </PaymentHistory>
                        )
                    }}
                </Query>
            </>
        )
    }
}

export default BillingHistory;
