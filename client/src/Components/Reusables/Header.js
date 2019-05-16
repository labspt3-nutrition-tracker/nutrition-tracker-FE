import React from "react";
import AppBar from "./AppBar";
import styled from "styled-components";
import logo from "../../Assets/logo-black.png";

const Logo = styled.div`
  max-width: 100px;
`;

const Header = () => (
  <div>
    <Logo>
      <img src={logo} alt="Created my free logo at LogoMakr.com" />
    </Logo>
    <AppBar />
  </div>
);

export default Header;
