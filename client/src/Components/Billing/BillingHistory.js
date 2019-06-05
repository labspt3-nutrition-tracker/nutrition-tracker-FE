import React from "react";
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import ApolloClient from "apollo-boost";

const GET_BILLING_HISTORY = gql`
query getBillingHistory($id: ID!){
    getBillingHistory(id: $id){
        id
        amount_paid
    }
  }
`;

const GET_CURRENT = gql`
  query getCurrentUser {
    getCurrentUser {
      id
    }
  }
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
        uri: "http://localhost:4000",
        headers: { authorization: idToken }
        });

        client
        .query({
            query: GET_CURRENT
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
                        console.log(error)
                        if (error) return <div>Error</div>;
                        console.log(data)
                    }}
                </Query>
            </>
        )
    }
}

export default BillingHistory;