import React from "react";
import AppBar from "./AppBar";
import styled from "styled-components";
import logo from "../../Assets/logo-black.png";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { NavLink } from "react-router-dom";


const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`;

const Logo = styled.div`
  max-width: 300px;
  width: 100%;
  padding-left: 24px;
  img {
    width: 100%;
  }
`;

const LogInOutContainer = styled.div`
  padding-right: 24px;
  display: flex;

  p{
    font-size: 1.3em;
    margin: 0 10px;
    padding-bottom: 30px;
  }
`;

const GET_CURRENT = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      email
    }
  }
`;



class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedOut: false
    }
  }

  componentDidMount(){
    this.getCurrentUser(localStorage.getItem("token"))
  }

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT
      })
      .then(response => {
        if(response.data.getCurrentUser){
          this.setState({
            loggedOut: true
          })
        }
      })
      .catch(err => console.log(err));
  };

  logIn = () => {
    this.setState({
      loggedOut: !this.state.loggedOut
    })
  }
  logOut = () => {
    console.log(localStorage.getItem("token"))
    if (this.state.loggedOut){
      localStorage.removeItem("token")
      this.setState({
        loggedOut: !this.state.loggedOut
      })
    }
  }
 
  render(){
    const loggedOut = this.state.loggedOut
    return(
      <div>
        <LogoContainer>
          <Logo>
            <img src={logo} alt="Created my free logo at LogoMakr.com" />
          </Logo>
          <LogInOutContainer>
            {loggedOut ? (
                <NavLink to="/" onClick={() => this.logOut()}>
                  <p>Logout</p>
                </NavLink>
              ) : (
                <NavLink to="/login" onClick={() => this.logIn()}>
                  <p>Login</p>
                </NavLink>
              )}
          </LogInOutContainer>
    
        </LogoContainer>

        <AppBar updateSearch={this.props.updateSearch}  searchInput={this.props.inputSearch} getFoodData={this.props.getFoodData} />
      </div>
    )
  }
}

export default Header;
