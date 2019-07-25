import ApolloClient from "apollo-boost";

import { GET_CURRENT_USER_QUERY } from "../graphql/queries";

export const getCurrentUser = async idToken => {

  const client = new ApolloClient({
    uri: "https://nutrition-tracker-be.herokuapp.com/",
    headers: { authorization: idToken }
  });
  const user = await client.query({ query: GET_CURRENT_USER_QUERY });
  return user.data.getCurrentUser;
};
