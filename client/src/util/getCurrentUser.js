// import { GraphQLClient } from "graphql-request";
import ApolloClient from "apollo-boost";

import { GET_CURRENT_USER_QUERY } from "../graphql/queries";

const BASE_URL = "https://nutrition-tracker-be.herokuapp.com/";

export const getCurrentUser = async idToken => {
  // const client = new GraphQLClient(BASE_URL, {
  //   mode: "cors",
  //   headers: { authorization: idToken }
  // });
  const client = new ApolloClient({
    uri: "https://nutrition-tracker-be.herokuapp.com",
    headers: { authorization: idToken }
  });
  // const user = await client.request(GET_CURRENT_USER_QUERY);
  const user = await client.query({ query: GET_CURRENT_USER_QUERY });
  return user.data.getCurrentUser;
};
