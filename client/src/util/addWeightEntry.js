import { GraphQLClient } from "graphql-request";

import { ADD_WEIGHT_ENTRY_MUTATION } from "../graphql/mutations";

const BASE_URL = "https://nutrition-tracker-be.herokuapp.com/";

export const addWeightEntry = async entry => {
  console.log({ entry });
  const idToken = localStorage.getItem("token");
  const client = new GraphQLClient(BASE_URL, {
    mode: "cors",
    headers: { authorization: idToken }
  });
  const variables = { input: entry };
  const weightEntry = await client.request(ADD_WEIGHT_ENTRY_MUTATION, variables);
  console.log({ weightEntry });
  return weightEntry.addWeightEntry;
};
