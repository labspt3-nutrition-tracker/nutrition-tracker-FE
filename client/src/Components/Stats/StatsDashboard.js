import React from 'react';
import {Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: blue,
    },
    typography: {
      htmlFontSize: 24,
      useNextVariants: true,
    },
  })

const StatsDashboard = props => {
    return (
        <>
        <MuiThemeProvider theme={theme}>
        <div>
            <Button color="primary">Daily</Button>
            <Button color="secondary">Weekly</Button>
            <Button color="secondary">Monthly</Button>
         </div>

        </MuiThemeProvider>

        <MuiThemeProvider theme={theme}>
         <div>
            <Button color="primary">Log</Button>
            <Button color="secondary">Eating Healthy</Button>
            <Button color="secondary">Account</Button>
         </div>
        </MuiThemeProvider>
      
        </>
    )
}

StatsDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default StatsDashboard;