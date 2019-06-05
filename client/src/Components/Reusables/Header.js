import React from "react";
import AppBar from "./AppBar";
import styled from "styled-components";
import logo from "../../Assets/logo-black.png";
import { NavLink } from "react-router-dom";


const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-self: flex-end;


`;
const Logo = styled.div`
  max-width: 100px;
  padding-left: 24px;
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



class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedOut: false
    }
  }

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
