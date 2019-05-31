import React from "react";
import AppBar from "./AppBar";
import styled from "styled-components";
import logo from "../../Assets/logo-black.png";
import {ApolloConsumer } from 'react-apollo';
import { NavLink, Redirect } from "react-router-dom";


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



const Header = (props) => (
  <div>
    <LogoContainer>
      <Logo>
        <img src={logo} alt="Created my free logo at LogoMakr.com" />
      </Logo>
      <LogInOutContainer>
        <NavLink to="/login">
          <p>Login</p>
        </NavLink>
        <p> Logout </p>
      </LogInOutContainer>
    </LogoContainer>

    <AppBar updateSearch={props.updateSearch}  searchInput={props.inputSearch} getFoodData={props.getFoodData} />
  </div>
     
);



export default Header;
