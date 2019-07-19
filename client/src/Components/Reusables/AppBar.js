import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";

import SearchInputComponent from "./../SearchComponent/SearchInputComponent";

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
          <SearchInputComponent getFoodData={props.getFoodData} />
        </Toolbar>
        <Toolbar className={classes.toolbarMobile}>
          <Button className={classes.menu} onClick={toggleDrawer("left", true)}>
            Menu
          </Button>

          <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
            <List className={classes.mobileMenuList}>
              <ListItem>
                <Button className={classes.titleMobile}>
                  <NavLink className="navLinkMobile" exact to="/">
                    Home
                  </NavLink>
                </Button>
              </ListItem>

              <ListItem>
                <Button className={classes.titleMobile}>
                  <NavLink className="navLinkMobile" to="/settings">
                    Account
                  </NavLink>
                </Button>
              </ListItem>

              <ListItem>
                <Button className={classes.titleMobile}>
                  <NavLink className="navLinkMobile" to="/reports">
                    Reports
                  </NavLink>
                </Button>
              </ListItem>

              <ListItem>
                <Button className={classes.titleMobile}>
                  <NavLink className="navLinkMobile" to="/dashboard">
                    Dashboard
                  </NavLink>
                </Button>
              </ListItem>
              <ListItem>
                <Button className={classes.titleMobile}>
                  <NavLink className="navLinkMobile" to="/journal">
                    Journal
                  </NavLink>
                </Button>
              </ListItem>
              <ListItem>
                <Button className={classes.titleMobile}>
                  <NavLink className="navLinkMobile" to="/coach">
                    Coach
                  </NavLink>
                </Button>
              </ListItem>
              <ListItem>
                <Button className={classes.titleMobile}>
                  <NavLink className="navLinkMobile" to="/messages">
                    Messages
                  </NavLink>
                </Button>
              </ListItem>
            </List>
          </Drawer>
          <SearchInputComponent getFoodData={props.getFoodData} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
