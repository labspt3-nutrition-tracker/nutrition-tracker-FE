import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { NONAME } from "dns";

import SearchInputComponent from "./../SearchComponent/SearchInputComponent";

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "#3685b5"
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    textDecoration: "none",
    color: "#ffffff"
  }
});

function ButtonAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
          <Button className={classes.title}>
            <NavLink className="navLink" exact to="/">
              Home
            </NavLink>
          </Button>

          <Button className={classes.title}>
            <NavLink className="navLink" to="/settings">
              Account
            </NavLink>
          </Button>

          <Button className={classes.title}>
            <NavLink className="navLink" to="/reports">
              Reports
            </NavLink>
          </Button>

          <Button className={classes.title}>
            <NavLink className="navLink" to="/dashboard">
              Dashboard
            </NavLink>
          </Button>
          <Button className={classes.title}>
            <NavLink className="navLink" to="/journal">
              Journal
            </NavLink>
          </Button>
          <Button className={classes.title}>
            <NavLink className="navLink" to="/coach">
              Coach
            </NavLink>
          </Button>
          <Button className={classes.title}>
            <NavLink className="navLink" to="/messages">
              Messages
            </NavLink>
          </Button>
          <SearchInputComponent
            updateSearch={props.updateSearch}
            searchInput={props.searchInput}
            getFoodData={props.getFoodData}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
