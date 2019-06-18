// import { GraphQLClient } from "graphql-request";
import ApolloClient from "apollo-boost";

import { UPDATE_USER_MUTATION } from "../graphql/mutations";

const BASE_URL = "https://nutrition-tracker-be.herokuapp.com/";

export const updateUserData = async (userId, newUser) => {
  console.log({ userId }, { newUser });
  const idToken = localStorage.getItem("token");
  // const client = new GraphQLClient(BASE_URL, {
  //   mode: "cors",
  //   headers: { authorization: idToken }
  // });
  const client = new ApolloClient({
    uri: "https://nutrition-tracker-be.herokuapp.com",
    headers: { authorization: idToken }
  });
  const variables = { id: userId, input: newUser };
  // const newUserId = await client.request(UPDATE_USER_MUTATION, variables);
  const newUserId = await client.mutate({ mutation: UPDATE_USER_MUTATION, variables });
  console.log({ newUserId });
  return newUserId.data.updateUser;
};
