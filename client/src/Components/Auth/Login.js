import React from "react";
import LoginForm from "./LoginForm";
import { Redirect } from 'react-router-dom'
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

const ADD_USER = gql`
  mutation addUser($input: UserInput!){
    addUser(input: $input){
      id
    }
  }
`;

const USER_EXIST = gql`
  query getUserBy($param: String!, $value: String!){
    getUserBy(param: $param, value: $value){
      email
    }
  }
`;

class LoginOrRegister extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      toDashboard: false,
      checkExistence: false,
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
    localStorage.setItem('token', idToken);



    const client = new ApolloClient({
      uri:'https://nutrition-tracker-be.herokuapp.com',
      headers: {authorization: idToken}
    })

    client.query({
      query: USER_EXIST,
      variables: {
        param: "email",
        value: email
      }
    }).then(response => {
      this.setState({toDashboard: !this.state.toDashboard})
    }).catch(err => this.setState({checkExistence: !this.state.checkExistence}))
  }

  handleChange = (label, value) => {
    this.setState({
      [label]: value
    })
  }

<<<<<<< HEAD
  createUser = userObj => {
    const client = new ApolloClient({
      uri:'https://nutrition-tracker-be.herokuapp.com'
    })

    client.mutate({
      mutation: ADD_USER,
      variables: {
        input: userObj
      }
    }).then(response => console.log(response.data))
  }
  render(){
    if (this.state.toDashboard === true){
      return <Redirect to="/dashboard"/>
    }
    return (
      <LoginOrRegisterContainer>
        <FormContainer>
            <LoginOrRegisterForm>
=======
  return (
    <>
    <LoginOrRegisterContainer>
      <FormContainer>
          <LoginOrRegisterForm>
>>>>>>> 2bc87e7434cc382ecb5ce3eb46c5fe3db9efcb17
              <div>
                {
                  this.state.checkExistence ? ( <LoginForm addUser={this.createUser} handleChange={this.handleChange} props={this.state}/>
                    ):(
                      <GoogleLogin
                      style={{height:10}}
                      clientId='1047286164516-jv47gpee2568sc3bindc9ra3vua101t3.apps.googleusercontent.com'
                      onSuccess={this.onSuccess}
                      /> )
                }
              </div>
<<<<<<< HEAD
            </LoginOrRegisterForm>
        </FormContainer>
      </LoginOrRegisterContainer>
    );
  }
=======
          </LoginOrRegisterForm>
      </FormContainer>
    </LoginOrRegisterContainer>
    </>
  );
>>>>>>> 2bc87e7434cc382ecb5ce3eb46c5fe3db9efcb17
}

export default LoginOrRegister;
