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
    height: "100vh",
    position: "absolute"
  },
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    // position: "relative",
    background: "#5E366A",
    position: "absolute",
    height: "65vh"
  },
  // toolbar: theme.mixins.toolbar
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

}));

export default function  AccountNav() {
  const classes = useStyles();

  return (
    <div 
        className={classes.container}
        >
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
            <div className={classes.toolbar} />
            Account
            <Divider />
            <List component={Link} to ="/settings">
            {['Settings',].map((text, index) => (
                
                <ListItem button key={text} >
                <ListItemIcon >{<Subject />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
            <Divider />
            <List component={Link} to ="/billing" >
            {[ 'Billing'].map((text, index) => (
                <ListItem  button key={text}>
                <ListItemIcon >{<Payment /> }</ListItemIcon>
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
     </div> 
    );

}