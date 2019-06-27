import React from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
    textDecoration: "none"
  },

  heading: {
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
  const [value, setValue] = React.useState('recents');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <div className={classes.heading}>What are you waiting for? Let's get started.</div>
      <button className={classes.button}>Sign Up</button>
      <div className={classes.lowerDiv}>
        <div className={classes.contactDiv}>
          <div className={classes.lDiv}>About Us</div>
          <div className={classes.lDiv}>|</div>
          <div className={classes.lDiv}>Contact</div>
          <div className={classes.lDiv}>|</div>
          <div className={classes.lDiv}><a className={classes.href} href="https://github.com/labspt3-nutrition-tracker">Github</a> </div>
        </div>
      </div>
      <div className={classes.copyright}>Copyright 2019 Lambda School</div>
      {/* <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
      {/* <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} /> */}
      {/* <BottomNavigationAction label="Folder" value="folder" icon={<Icon>folder</Icon>} /> */}
    </BottomNavigation>
  );
}
