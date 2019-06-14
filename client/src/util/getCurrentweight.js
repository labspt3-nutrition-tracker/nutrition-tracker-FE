// import { GraphQLClient } from "graphql-request";
import ApolloClient from "apollo-boost";

import { GET_WEIGHT_ENTRIES_QUERY } from "../graphql/queries";

const BASE_URL = "https://nutrition-tracker-be.herokuapp.com/";

export const getCurrentWeight = async userId => {
  const idToken = localStorage.getItem("token");
  // const client = new GraphQLClient(BASE_URL, {
  //   mode: "cors",
  //   headers: { authorization: idToken }
  // });
  const client = new ApolloClient({
    uri: "https://nutrition-tracker-be.herokuapp.com",
    headers: { authorization: idToken }
  });
  const variables = { userId: userId };
  // let weights = await client.request(GET_WEIGHT_ENTRIES_QUERY, variables);
  let weights = await client.query({ query: GET_WEIGHT_ENTRIES_QUERY, variables });
  weights = weights.data.getWeightEntriesByUserId;
  weights.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
  const currentWeight = weights.length > 0 ? weights.pop().weight : 0;
  return currentWeight;
};
