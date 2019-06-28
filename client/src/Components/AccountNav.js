import React from 'react';
import { Link } from 'react-router-dom';
//import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Subject from '@material-ui/icons/Subject';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Payment from '@material-ui/icons/Payment';
// import Button from '@material-ui/core/Button';

const drawerWidth = 250;


const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    // height: "100vh",
    background: "lavender"
  },
  root: {
    display: 'flex',
    color: "white",
    height: "relative",
    alignItems: "center",
    position: "absolute",
  },
  title: {
    textDecoration: "none",
    color: "#FFFFFF",
    border: 0,
    fontSize: "1.5rem"
  },
  symbol: {
    textDecoration: "none",
    color: "#FFFFFF"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  // navHeader: {
  //   display: 'flex',
  //   color: "#FFFFFF",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   fontSize: "2rem",
  //   margin: "-47px 30px 0 18px",
  //   marginRight: "157px",
  //   paddingBottom: 20,
  //   // borderBottom: "1px solid #FFFFFF"
  // },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    // position: "relative",
    background: "#5E366A",
    position: "relative",
    // height: "50vh"
  },
  // toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

}));

export default function  AccountNav() {
  const classes = useStyles();

  return (
    // <div 
    // className={classes.container}
    // >
        <div 
        className={classes.root}
        >
        <CssBaseline />
        {/* <AppBar position="relative" className={classes.appBar}>
      </AppBar> */}
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            {/* <div className={classes.toolbar} /> */}
            <Divider />
            <List component={Link} to ="/settings" >
            {['',].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon >{<div className={classes.symbol}><Subject /></div>}</ListItemIcon>
                <div className={classes.title}>  Settings    </div> 
                <ListItemText primary={text} />
                </ListItem>
            ))}
           
            </List>
            <Divider />
            <List component={Link} to ="/billing" >
            {[ ''].map((text, index) => (
                  <ListItem button key={text}>
                  <ListItemIcon >{<div className={classes.symbol}><Payment /></div> }</ListItemIcon>
                  <div className={classes.title}>Billing </div>
                  <ListItemText primary={text} />
                  </ListItem>
     
            ))}
            </List>
            <Divider />
        </Drawer>
        <main className={classes.content} >
            <div className={classes.toolbar} />
        </main>
      </div> 
    // </div> 
    );

}