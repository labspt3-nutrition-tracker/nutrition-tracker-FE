import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { NavLink } from "react-router-dom";
import { NONAME } from "dns";

import SearchInputComponent from "./../SearchComponent/SearchInputComponent";
import { getRectCenter } from "@fullcalendar/core";
import MobileMenu from "./MobileMenu";

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "#40A798"
  },
  toolbar: {
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  toolbarMobile: {
    justifyContent: "space-evenly",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-between"
    },
    fontSize: 16
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    textDecoration: "none",
    color: "#ffffff"
    // textShadow: "0 0 1px #000000",
  },
  titleMobile: {
    flexGrow: 1,
    fontSize: 16,
    textDecoration: "none",
    color: "#545454",
    width: "100%"
  },
  menu: {
    color: "#ffffff",
    fontSize: 16
  },
  mobileMenu: {
    // display: "none"
    display: "flex",
    flexDirection: "column",
    textAlign: "left"
  },
  mobileMenuList: {
    fontSize: 16
  }
});

function ButtonAppBar(props) {
  const { classes } = props;

  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.toolbar}>
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
        <Toolbar className={classes.toolbarMobile}>
          <Button className={classes.menu} onClick={toggleDrawer("left", true)}>
            Menu
          </Button>

          <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
            <List className={classes.mobileMenuList}>
              <ListItem><Button className={classes.titleMobile}>
                <NavLink className="navLinkMobile" exact to="/">
                  Home
                </NavLink>
              </Button></ListItem>

              <ListItem><Button className={classes.titleMobile}>
                <NavLink className="navLinkMobile" to="/settings">
                  Account
                </NavLink>
              </Button></ListItem>

              <ListItem><Button className={classes.titleMobile}>
                <NavLink className="navLinkMobile" to="/reports">
                  Reports
                </NavLink>
              </Button></ListItem>

              <ListItem><Button className={classes.titleMobile}>
                <NavLink className="navLinkMobile" to="/dashboard">
                  Dashboard
                </NavLink>
              </Button></ListItem>
              <ListItem><Button className={classes.titleMobile}>
                <NavLink className="navLinkMobile" to="/journal">
                  Journal
                </NavLink>
              </Button></ListItem>
              <ListItem><Button className={classes.titleMobile}>
                <NavLink className="navLinkMobile" to="/coach">
                  Coach
                </NavLink>
              </Button></ListItem>
              <ListItem><Button className={classes.titleMobile}>
                <NavLink className="navLinkMobile" to="/messages">
                  Messages
                </NavLink>
              </Button></ListItem>
            </List>
          </Drawer>
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
