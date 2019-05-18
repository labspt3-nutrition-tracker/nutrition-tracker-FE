import React from "react";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import { withStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import Auth from "./Auth/Auth";

const LoginOrRegisterContainer = styled.div`
  background: #fcfcfb;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
`;

const LoginOrRegisterForm = styled.form`
  background: #3685b5;
  width: 50%;
  height: 500px;
  padding: 100px;
  display: flex;
  justify-content: center;
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
`

const StyledButton = withStyles({
  root: {
    background: "#40A798",
    width: "150px"
  }
})(Fab);

const theme = createMuiTheme({
    overrides: {
      MuiInputLabel: {
        root: {
          color:'#2C363F'
        },
      },
    }
});

class LoginOrRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      username: "",
      password: ""
    };
  }

  // Handle field change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  handleSubmit(e) {
    const auth = new Auth();

    auth.login();
    e.preventDefault();
  }

  render() {
    return (
      <LoginOrRegisterContainer>
        <FormContainer>
            <LoginOrRegisterForm>
                <MuiThemeProvider theme={theme}>
                    <TextField
                        fullWidth
                        label="Username"
                        placeholder="Username"
                        margin="normal"
                        onChange={this.handleChange("username")}
                    />

                    <TextField
                        fullWidth
                        required
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.handleChange("password")}
                    />

                    <StyledButton
                        variant="extended"
                        size="large"
                        onClick={this.handleSubmit}
                    >
                    Submit
                    </StyledButton>
                </MuiThemeProvider>
            </LoginOrRegisterForm>
        </FormContainer>
      </LoginOrRegisterContainer>
    );
  }
}

export default LoginOrRegister;
