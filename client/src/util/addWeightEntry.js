import ApolloClient from "apollo-boost";
import * as moment from "moment";

import { ADD_WEIGHT_ENTRY_MUTATION, UPDATE_WEIGHT_ENTRY_MUTATION } from "../graphql/mutations";
import { GET_WEIGHT_ENTRIES_QUERY } from "../graphql/queries";

export const addWeightEntry = async entry => {
  const idToken = localStorage.getItem("token");

  const client = new ApolloClient({
    uri: "https://nutrition-tracker-be.herokuapp.com/",
    headers: { authorization: idToken }
  });
  // Check if weight entry exist with same date
  let weights = await client.query({ query: GET_WEIGHT_ENTRIES_QUERY, variables: { userId: entry.user_id } });
  weights = weights.data.getWeightEntriesByUserId;
  const dayEntry = weights.find(
    wEntry => moment(new Date(wEntry.date)).format("MM/DD/YY") === moment(new Date(entry.date)).format("MM/DD/YY")
  );
  if (!dayEntry) {
    // If no entry exists, create new one
    const variables = { input: entry };
    const weightEntry = await client.mutate({ mutation: ADD_WEIGHT_ENTRY_MUTATION, variables });
    return weightEntry.data.addWeightEntry;
  } else {
    // else update the existing one
    const variables = { id: dayEntry.id, input: entry };
    const weightEntry = await client.mutate({ mutation: UPDATE_WEIGHT_ENTRY_MUTATION, variables });
    return weightEntry.data.updateWeightEntry;
  }
};
