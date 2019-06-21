
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

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginTop: '10%',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '10%',
    position: "absolute",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,

}));

export default function  AccountNav() {
  const classes = useStyles();

  return (
        <div 
        className={classes.root}
        // MuiAppBarPositionFixed= {
        //     marginTop: "10%",
        //     top: 0,
        //     left: "auto",
        //     right: 0,
        //     position: "fixed",
        // },
        >
        <CssBaseline />
        <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
            <Typography variant="h4" noWrap>
                Account
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
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
    );

}