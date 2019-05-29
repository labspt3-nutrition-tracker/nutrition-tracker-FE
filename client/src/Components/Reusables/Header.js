import React from "react";
import AppBar from "./AppBar";
import styled from "styled-components";
import logo from "../../Assets/logo-black.png";

const Logo = styled.div`
  max-width: 100px;
  padding-left: 24px;
`;

const Header = (props) => (
  <div>
    <Logo>
      <img src={logo} alt="Created my free logo at LogoMakr.com" />
    </Logo>
    <AppBar updateSearch={props.updateSearch}  searchInput={props.inputSearch} getFoodData={props.getFoodData} searchResults={props.searchResults} noResultError={props.noResultError}/>
  </div>
);

export default Header;
