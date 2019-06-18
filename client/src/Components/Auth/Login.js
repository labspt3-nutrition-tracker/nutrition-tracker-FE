import React from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import styled from "styled-components";
import ApolloClient from "apollo-boost";

import LoginForm from "./LoginForm";
import { ADD_USER_MUTATION } from "../../graphql/mutations";
import { USER_EXIST_QUERY } from "../../graphql/queries";

const LoginOrRegisterContainer = styled.div`
  /* background: #fcfcfb; */
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
`;

const LoginOrRegisterForm = styled.div`
  /* background: #3685b5; */
  width: 60%;
  height: 500px;
  padding: 100px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  -webkit-box-shadow: 6px 7px 24px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 7px 24px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 7px 24px -1px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  border: 3px solid #f4b4c3;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
`;

const FacebookBtn = styled.div`
  button {
    margin-top: 20px;
    padding: 9px;
    font-size: 1.2rem;
    height: 47px;
  }
`;

class LoginOrRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDashboard: false,
      checkExistence: false,
      firstName: "",
      lastName: "",
      email: ""
    };
  }
  onSuccess = googleUser => {
    this.loginUser(googleUser, "google");
  };

  responseFacebook = response => {
    console.log(response);
    this.loginUser(response, "facebook");
  };

  loginUser = async (userInfo, auth) => {
    let email, lastName, firstName, idToken;
    if (auth === "google") {
      email = userInfo.profileObj.email;
      lastName = userInfo.profileObj.familyName;
      firstName = userInfo.profileObj.givenName;
      idToken = userInfo.getAuthResponse().id_token;
    } else if (auth === "facebook") {
      email = userInfo.email;
      const name = userInfo.name.split(" ");
      lastName = name.pop();
      firstName = name.join(" ");
      idToken = userInfo.accessToken;
      //testing authenticating the token with fb
      console.log("userID: ", userInfo.userID);
    }
    localStorage.setItem("token", idToken);

    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: USER_EXIST_QUERY,
        variables: {
          param: "email",
          value: email
        }
      })
      .then(response => {
        if (response.data.getUserBy) this.setState({ toDashboard: !this.state.toDashboard });
        else
          this.setState({
            checkExistence: !this.state.checkExistence,
            email: email,
            lastName: lastName,
            firstName: firstName
          });
      })
      .catch(err => console.log(err));
  };

  onFailure = async error => {
    console.log(error);
  };

  handleChange = (label, value) => {
    this.setState({
      [label]: value
    });
  };

  createUser = userObj => {
    const newUser = {
      ...userObj,
      userType: "basic",
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .mutate({
        mutation: ADD_USER_MUTATION,
        variables: {
          input: newUser
        }
      })
      .then(response => this.setState({ toDashboard: !this.state.toDashboard }))
      .catch(err => console.log("There was a problem creating the user account. ", err));
  };

  render() {
    const { from } = this.props.location || { from: { pathname: "/" } };
    if (this.state.toDashboard === true) {
      // return <Redirect to='/dashboard' />;
      return <Redirect to={from} />;
    }
    return (
      <LoginOrRegisterContainer>
        <FormContainer>
          <LoginOrRegisterForm>
            <div>
              {this.state.checkExistence ? (
                <LoginForm addUser={this.createUser} handleChange={this.handleChange} props={this.state} />
              ) : (
                <>
                  <GoogleLogin
                    style={{ height: 10 }}
                    clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    theme='dark'
                  />
                  {/* <FacebookBtn>
                    <FacebookLogin
                      appId='390080238272158'
                      // autoLoad={true}
                      fields='name,email'
                      callback={this.responseFacebook}
                      icon='fa-facebook'
                    />
                  </FacebookBtn> */}
                </>
              )}
            </div>
          </LoginOrRegisterForm>
        </FormContainer>
      </LoginOrRegisterContainer>
    );
  }
}

export default LoginOrRegister;
