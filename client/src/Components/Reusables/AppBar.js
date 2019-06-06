import React from "react";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import styled from 'styled-components';
// import red from "@material-ui/core/colors/red";
import { NavLink } from "react-router-dom";

import SearchInputComponent from './../SearchComponent/SearchInputComponent'

const AppBar = styled.div`
  display: flex;
  height: 75px;
  flex-direction: row;
  justify-content: space-between;
  background: #3685B5;
  align-items: center;
  padding: 5px;
  padding-left: 15px;
  font-size: 1.3em;

  @media (max-width: 800px){
    flex-direction: column-reverse;
    height: 300px;
    aligh-items: center;
  }
`;

const Toolbar = styled.div`
  width: 50%;

  @media (max-width: 800px){
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 100%;
  }
`;

const ButtonAppBar = (props) => {
  return (
      <AppBar className="appbar" position="static">
        <Toolbar>
          <NavLink className="navLink" exact to="/">
            Home
          </NavLink>
          <NavLink className="navLink" to="/account">
            Account
          </NavLink>
          <NavLink className="navLink" to="/stats">
            Reports
          </NavLink>
          <NavLink className="navLink" to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="navLink" to="/journal">
            Journal
          </NavLink>
        </Toolbar>
        <SearchInputComponent updateSearch={props.updateSearch} searchInput={props.searchInput} getFoodData={props.getFoodData} />
      </AppBar>
  );
}

// export default withStyles(styles)(ButtonAppBar);
export default ButtonAppBar;
