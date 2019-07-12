import React, { useEffect } from 'react';
import logo from "../../Assets/logo-white.png";
 import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "50vh",
    background: "#40A798",
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    textDecoration: "none",
    zIndex:2
  },

  heading: {
    fontSize: "2rem",
    marginTop: "4.5%",
    maxWidth: 300
  },

  headingImg: {
    width: "100%",
  },

  heading2: {
    fontSize: "2rem",
    margin: "2.5% 0"
  },

  button: {
    background: "#5E366A",
    color: "#FFFFFF",
    width: 300,
    padding: "1% 0",
    fontSize: "1.5rem",
    border: "1px solid #40A798"
  },

  lowerDiv: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    height: "25vh",
    margin: "3.5% 0 0 0",
    alignItems: "center",
    alignContent: "space-evenly",
    justifyContent: "space-between",
    borderTop: "1px solid #FFFFFF",
  },

  contactDiv: {
    display: "flex",
    alignItems: "center",
    alignContent: "space-between",
    justifyContent: "space-around",
    width: "100%",
    padding: "0 30%"
  },

  lDiv: {
    fontSize: "1.3rem",
    // padding: "0 5%",
  },

  href: {
    textDecoration: "none",
    color: "#FFFFFF"
  },

  copyright: {
    fontSize: ".8rem",
    paddingBottom: 30
  }
});

export default function HomeFooter(props) {
  const classes = useStyles();
  const [loggedIn, setValue] = React.useState(false);

React.useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setValue(true)
  } else {
    setValue(false)
  }
})

  return (
  <>
  {loggedIn ? (

            <BottomNavigation  className={classes.root}>
            <div className={classes.heading}>
              <img className={classes.headingImg} src={logo} alt="Created my free logo at LogoMakr.com" />
            </div>
        <div className={classes.lowerDiv}>
          <div className={classes.contactDiv}>
            <div className={classes.lDiv}><Link to="/about">About Us</Link></div>
            <div className={classes.lDiv}>|</div>
            <div className={classes.lDiv}>Contact</div>
            <div className={classes.lDiv}>|</div>
            <div className={classes.lDiv}><a className={classes.href} href="https://github.com/labspt3-nutrition-tracker">Github</a> </div>
          </div>
        </div>
        <div className={classes.copyright}>Copyright 2019 Lambda School</div>
        </BottomNavigation>
          ) : (
            <BottomNavigation  className={classes.root}>                                                                                                                                                                     >
              <div className={classes.heading2}>What are you waiting for? Let's get started.</div>
                 <button className={classes.button}> <Link
                style={{ textDecoration: "none", color: "white" }}
                to={{ pathname: "/login" }}
              >Sign Up</Link></button>
              <div className={classes.lowerDiv}>
                <div className={classes.contactDiv}>
                  <div className={classes.lDiv}><Link to="/about">About Us</Link></div>
                  <div className={classes.lDiv}>|</div>
                  <div className={classes.lDiv}>Contact</div>
                  <div className={classes.lDiv}>|</div>
                  <div className={classes.lDiv}><a className={classes.href} href="https://github.com/labspt3-nutrition-tracker">Github</a> </div>
                </div>
              </div>
              <div className={classes.copyright}>Copyright 2019 Lambda School</div>
            </BottomNavigation>
          )}
  </>
  );
}
