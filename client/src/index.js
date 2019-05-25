<<<<<<< HEAD
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
=======
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
>>>>>>> 2bc87e7434cc382ecb5ce3eb46c5fe3db9efcb17

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

<<<<<<< HEAD
ReactDOM.render(
<ApolloProvider client={client}>
  <Router>
  <App />
  </Router>
</ApolloProvider>, document.getElementById('root'));
=======
const httpLink = createHttpLink({
  uri: "https://nutrition-tracker-be.herokuapp.com/"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
>>>>>>> 2bc87e7434cc382ecb5ce3eb46c5fe3db9efcb17

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
