import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://nutrition-tracker-be.herokuapp.com/"
})


ReactDOM.render(
<ApolloProvider client={client}>
  <Router>
  <App />
  </Router>
</ApolloProvider>, document.getElementById('root'));

