import { GraphQLClient } from "graphql-request";

import { GET_CURRENT_USER_QUERY } from "../graphql/queries";

const BASE_URL = "https://nutrition-tracker-be.herokuapp.com/";

export const getCurrentUser = async idToken => {
  const client = new GraphQLClient(BASE_URL, {
    mode: "cors",
    headers: { authorization: idToken }
  });
  // try {
  const user = await client.request(GET_CURRENT_USER_QUERY);
  return user.getCurrentUser;
  // } catch (err) {
  //   console.log(err);
  //   return null;
  // }
};
