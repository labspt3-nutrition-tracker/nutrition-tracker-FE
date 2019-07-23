import ApolloClient from "apollo-boost";

import { ADD_WEIGHT_ENTRY_MUTATION } from "../graphql/mutations";

export const addWeightEntry = async entry => {
  const idToken = localStorage.getItem("token");

  const client = new ApolloClient({
    uri: "http://localhost:4000",
    headers: { authorization: idToken }
  });
  const variables = { input: entry };
  const weightEntry = await client.mutate({ mutation: ADD_WEIGHT_ENTRY_MUTATION, variables });
  return weightEntry.data.addWeightEntry;
};
