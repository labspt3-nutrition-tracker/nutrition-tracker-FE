import ApolloClient from "apollo-boost";

import { UPDATE_USER_MUTATION } from "../graphql/mutations";

export const updateUserData = async (userId, newUser) => {
  console.log({ userId }, { newUser });
  const idToken = localStorage.getItem("token");

  const client = new ApolloClient({
    uri: "http://localhost:4000",
    headers: { authorization: idToken }
  });
  const variables = { id: userId, input: newUser };
  const newUserId = await client.mutate({ mutation: UPDATE_USER_MUTATION, variables });
  console.log({ newUserId });
  return newUserId.data.updateUser;
};
