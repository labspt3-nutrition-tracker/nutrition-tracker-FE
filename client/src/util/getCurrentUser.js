import ApolloClient from "apollo-boost";

import { GET_CURRENT_USER_QUERY } from "../graphql/queries";

export const getCurrentUser = async idToken => {

  const client = new ApolloClient({
    uri: "http://localhost:4000",
    headers: { authorization: idToken }
  });
  const user = await client.query({ query: GET_CURRENT_USER_QUERY });
  return user.data.getCurrentUser;
};
