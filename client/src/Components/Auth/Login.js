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
  query getUserById($userId: ID!){
    getUserById(userId: $userId){
      email
    }
  }
`;

class LoginOrRegister extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userExist: false,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      userType: "",
      calorieGoal:0,
      weight:0
    }

  }
  onSuccess = async googleUser => {
    console.log(googleUser.profileObj.email)
    const email = googleUser.profileObj.email;
    const idToken = googleUser.getAuthResponse().id_token;



    const client = new ApolloClient({
      uri:'https://nutrition-tracker-be.herokuapp.com',
      headers: {authorization: idToken}
    })

    client.query({
      query: USER_EXIST,
      variables: {
        userId: 1
      }
    }).then(response => { if(response.data.getUserById.email){
      this.setState({ userExist: true})}
    })
  }

  userId = () => {
    return 1
  }

  render(){
    return (
      <LoginOrRegisterContainer>
        <FormContainer>
            <LoginOrRegisterForm>
              <Query query={USER_EXIST}>
                { ({ loading, error, data}) => {
                  console.log(this.state.userExist)
                  return (
                    <div>
                      {
                        this.state.userExist ? <form><input/></form> : <GoogleLogin
                        style={{height:10}}
                        clientId='1047286164516-jv47gpee2568sc3bindc9ra3vua101t3.apps.googleusercontent.com'
                        onSuccess={this.onSuccess}
                        userExist
                      />
                      }
                    </div>
                  )
                }}
              </Query>

            </LoginOrRegisterForm>
        </FormContainer>
      </LoginOrRegisterContainer>
    );
  }
}

export default LoginOrRegister;
