import React from "react";
import { GoogleLogin } from 'react-google-login';
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { Mutation, Query } from 'react-apollo';
require('dotenv').config()




const LoginOrRegisterContainer = styled.div`
  background: #fcfcfb;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
`;

const LoginOrRegisterForm = styled.div`
  background: #3685b5;
  width: 50%;
  height: 500px;
  padding: 100px;
  display: flex;
  justify-content: center;
  align-content:center;
  flex-wrap: wrap;
  -webkit-box-shadow: 6px 7px 24px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 7px 24px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 7px 24px -1px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
`;

const FormContainer = styled.div`
    display:flex;
    justify-content:center;
    width:50%;
`;

const ME_QUERY = gql`
  mutation addUser($input: UserInput){
    firstName
  }
`;

const USER_EXIST = gql`
  query getUserBy($filter: String!){
    getUserBy(filter: $filter){
      email
    }
  }
`;

const LoginOrRegister = () => {

  const onSuccess = async googleUser => {
    console.log({googleUser})
    const idToken = googleUser.getAuthResponse().id_token;

    const client = new ApolloClient({
      uri:'https://nutrition-tracker-be.herokuapp.com',
      headers: {authorization: idToken}
    })
  }

  const userId = "leila@leila.com"

  return (
    <LoginOrRegisterContainer>
      <FormContainer>
          <LoginOrRegisterForm>
            <Query query={USER_EXIST} variables={{userId}}>
              { ({ loading, error, data}) => {
                console.log(data)
                return (
                  <div>
                    <GoogleLogin
                      style={{height:10}}
                      clientId='1047286164516-jv47gpee2568sc3bindc9ra3vua101t3.apps.googleusercontent.com'
                      onSuccess={onSuccess}
                    />
                  </div>
                )
              }}
            </Query>

          </LoginOrRegisterForm>
      </FormContainer>
    </LoginOrRegisterContainer>
  );
}

export default LoginOrRegister;
