import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "https://nutrition-tracker-be.herokuapp.com"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter as Router } from "react-router-dom";
// import { ApolloProvider } from "react-apollo";
// import { ApolloClient } from "apollo-client";
// import { createHttpLink } from "apollo-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { setContext } from 'apollo-link-context'
// import { AUTH_TOKEN } from './constants'

// const httpLink = createHttpLink({
//   uri: "https://nutrition-tracker-be.herokuapp.com/"
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem(AUTH_TOKEN)
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   }
// })

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <Router>
//       <App />
//     </Router>
//   </ApolloProvider>,
//   document.getElementById("root")
// );
