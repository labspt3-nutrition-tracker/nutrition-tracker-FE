
import React from "react";
import LoginForm from "./LoginForm";
<<<<<<< HEAD
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
=======
import { Redirect } from 'react-router-dom'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
>>>>>>> 6bef74a16ba10b5c9b0f462bda66db23e09f0115
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
// import { Mutation, Query } from 'react-apollo';

<<<<<<< HEAD
=======

>>>>>>> 6bef74a16ba10b5c9b0f462bda66db23e09f0115
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
<<<<<<< HEAD
  align-content: center;
=======
  align-content:center;
>>>>>>> 6bef74a16ba10b5c9b0f462bda66db23e09f0115
  flex-wrap: wrap;
  -webkit-box-shadow: 6px 7px 24px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 7px 24px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 7px 24px -1px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
`;

const FormContainer = styled.div`
<<<<<<< HEAD
  display: flex;
  justify-content: center;
  width: 50%;
`;

const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
=======
    display:flex;
    justify-content:center;
    width:50%;
`;

const ADD_USER = gql`
  mutation addUser($input: UserInput!){
    addUser(input: $input){
>>>>>>> 6bef74a16ba10b5c9b0f462bda66db23e09f0115
      id
    }
  }
`;

const USER_EXIST = gql`
<<<<<<< HEAD
  query getUserBy($param: String!, $value: String!) {
    getUserBy(param: $param, value: $value) {
=======
  query getUserBy($param: String!, $value: String!){
    getUserBy(param: $param, value: $value){
>>>>>>> 6bef74a16ba10b5c9b0f462bda66db23e09f0115
      email
    }
  }
`;

const GET_CURRENT = gql`
  query getCurrentUser{
    getCurrentUser{
      id
      email
    }
  }
`

class LoginOrRegister extends React.Component {
<<<<<<< HEAD
  constructor(props) {
=======

  constructor(props){
>>>>>>> 6bef74a16ba10b5c9b0f462bda66db23e09f0115
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

    const test = localStorage.getItem('token')

    this.getCurrentUser(test);

    const client = new ApolloClient({
      uri:'https://nutrition-tracker-be.herokuapp.com',
      headers: {authorization: idToken}
    })

    client
      .query({
        query: USER_EXIST,
        variables: {
          param: "email",
          value: email
        }
      })
      .then(response => {
        if (response.data.getUserBy) this.setState({ toDashboard: !this.state.toDashboard });
        else this.setState({ checkExistence: !this.state.checkExistence });
      })
      .catch(err => console.log(err));
<<<<<<< HEAD
  };
=======
  }
>>>>>>> 6bef74a16ba10b5c9b0f462bda66db23e09f0115

  handleChange = (label, value) => {
    this.setState({
      [label]: value
<<<<<<< HEAD
    });
  };

  createUser = userObj => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .mutate({
        mutation: ADD_USER,
        variables: {
          input: userObj
        }
      })
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  };
  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to='/dashboard' />;
=======
    })
  }

  createUser = userObj => {
    const client = new ApolloClient({
      uri:'https://nutrition-tracker-be.herokuapp.com'
    })

    client.mutate({
      mutation: ADD_USER,
      variables: {
        input: userObj
      }
    }).then(response => this.setState({toDashboard: !this.state.toDashboard}))
  }

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri:'https://nutrition-tracker-be.herokuapp.com',
      headers: {authorization: idToken}
    })

    client.query({
      query: GET_CURRENT
    }).then(response => console.log(response.data) ).catch(err => console.log(err))

  }
  render(){
    if (this.state.toDashboard === true){
      return <Redirect to="/dashboard"/>
>>>>>>> 6bef74a16ba10b5c9b0f462bda66db23e09f0115
    }
    return (
      <LoginOrRegisterContainer>
        <FormContainer>
<<<<<<< HEAD
          <LoginOrRegisterForm>
            <div>
              {this.state.checkExistence ? (
                <LoginForm addUser={this.createUser} handleChange={this.handleChange} props={this.state} />
              ) : (
                <GoogleLogin
                  style={{ height: 10 }}
                  clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                  onSuccess={this.onSuccess}
                />
              )}
            </div>
          </LoginOrRegisterForm>
=======
            <LoginOrRegisterForm>
              <div>
                {
                  this.state.checkExistence ? ( <LoginForm addUser={this.createUser} handleChange={this.handleChange} props={this.state}/>
                    ):(
                      <GoogleLogin
                      style={{height:10}}
                      clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                      onSuccess={this.onSuccess}
                      /> )
                }
              </div>
            </LoginOrRegisterForm>
>>>>>>> 6bef74a16ba10b5c9b0f462bda66db23e09f0115
        </FormContainer>
      </LoginOrRegisterContainer>
    );
  }
}

export default LoginOrRegister;
