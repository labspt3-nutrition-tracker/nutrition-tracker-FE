import React from "react";
import Header from "../Reusables/Header";
import { GoogleLogin } from 'react-google-login';
import styled from "styled-components";
import { GraphQLClient } from 'graphql-request'
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

const ME_QUERY = `
  {
    me {
      _id
      name
      email
    }
  }
`;

const LoginOrRegister = ({ classes }) => {

  const onSuccess = async googleUser => {
    console.log({googleUser})
    const idToken = googleUser.getAuthResponse().id_token;
    const client = new GraphQLClient('http://localhost:4000', {
      headers: {authorization: idToken}
    })

    const data = await client.request(ME_QUERY)

    console.log(data)
  }

  return (
    <>
    <LoginOrRegisterContainer>
      <FormContainer>
          <LoginOrRegisterForm>
              <div>
                <GoogleLogin
                  style={{height:10}}
                  clientId="1047286164516-jv47gpee2568sc3bindc9ra3vua101t3.apps.googleusercontent.com"
                  onSuccess={onSuccess}
                />
              </div>
          </LoginOrRegisterForm>
      </FormContainer>
    </LoginOrRegisterContainer>
    </>
  );
}

export default LoginOrRegister;
