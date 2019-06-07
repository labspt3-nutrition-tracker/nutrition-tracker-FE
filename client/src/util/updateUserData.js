import { GraphQLClient } from "graphql-request";

import { UPDATE_USER_MUTATION } from "../graphql/mutations";

const BASE_URL = "https://nutrition-tracker-be.herokuapp.com/";

export const updateUserData = async (userId, newUser) => {
  console.log({ userId }, { newUser });
  const idToken = localStorage.getItem("token");
  const client = new GraphQLClient(BASE_URL, {
    mode: "cors",
    headers: { authorization: idToken }
  });
  const variables = { id: userId, input: newUser };
  const newUserId = await client.request(UPDATE_USER_MUTATION, variables);
  console.log({ newUserId });
  return newUserId.updateUser;
};
