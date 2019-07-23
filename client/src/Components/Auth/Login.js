import React from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import logo from "../../Assets/logo-green.png";
import loginBg from "../../Assets/login-bg.png";
import { Pulse } from "animate-css-styled-components";

import LoginForm from "./LoginForm";
import { ADD_USER_MUTATION } from "../../graphql/mutations";
import { USER_EXIST_QUERY } from "../../graphql/queries";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// add min width for logo
const LoginOrRegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  background: url(${loginBg}) no-repeat;
  background-size: cover;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.div`
  max-width: 360px;
  width: 100%;
  img {
    width: 100%;
  }
`;

const LoginOrRegisterForm = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  -webkit-box-shadow: 0 0 24px -1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 24px -1px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 24px -1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
`;

const PulseContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginMessage = styled.div`
  display: flex;
  justify-content: center;
  padding: 40% 0;
  color: #5e366a;
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
    }
    localStorage.setItem("token", idToken);

    const client = new ApolloClient({
      uri: "http://localhost:4000",
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
        if (response.data.getUserBy)
          this.setState({ toDashboard: !this.state.toDashboard });
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
      uri: "http://localhost:4000"
    });

    client
      .mutate({
        mutation: ADD_USER_MUTATION,
        variables: {
          input: newUser
        }
      })
      .then(response => this.setState({ toDashboard: !this.state.toDashboard }))
      .catch(err =>
        console.log("There was a problem creating the user account. ", err)
      );
  };

  render() {
    const { from } = this.props.location || { from: { pathname: "/" } };
    if (this.state.toDashboard === true) {
      return <Redirect to={from} />;
    }
    return (
      <LoginOrRegisterContainer>
        <FormContainer>
          <Pulse delay=".3s">
            <PulseContainer>
              <LoginOrRegisterForm>
                <LogoContainer>
                  <Logo>
                    <img
                      src={logo}
                      alt="Created my free logo at LogoMakr.com"
                    />
                  </Logo>
                </LogoContainer>
                <div>
                  {this.state.checkExistence ? (
                    <LoginForm
                      addUser={this.createUser}
                      handleChange={this.handleChange}
                      props={this.state}
                    />
                  ) : (
                    <>
                      <LoginMessage>Login to your account!</LoginMessage>
                      <>
                        <GoogleLogin
                          style={{ height: 10 }}
                          clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                          onSuccess={this.onSuccess}
                          onFailure={this.onFailure}
                          theme="dark"
                        />
                      </>
                    </>
                  )}
                </div>
              </LoginOrRegisterForm>
            </PulseContainer>
          </Pulse>
        </FormContainer>
      </LoginOrRegisterContainer>
    );
  }
}

export default LoginOrRegister;
