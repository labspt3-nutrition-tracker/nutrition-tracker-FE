import ApolloClient from "apollo-boost";

import { GET_WEIGHT_ENTRIES_QUERY } from "../graphql/queries";

export const getCurrentWeight = async user => {
  const idToken = localStorage.getItem("token");

  const client = new ApolloClient({
    uri: "https://nutrition-tracker-be.herokuapp.com/",
    headers: { authorization: idToken }
  });
  const variables = { userId: user.id };
  let weights = await client.query({ query: GET_WEIGHT_ENTRIES_QUERY, variables });
  weights = weights.data.getWeightEntriesByUserId;
  weights.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
  const currentWeight = weights.length > 0 ? weights.pop().weight : user.weight;
  return currentWeight;
};
