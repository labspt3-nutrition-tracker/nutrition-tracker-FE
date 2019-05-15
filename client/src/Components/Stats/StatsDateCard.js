import React from 'react';
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
    },
  })

const StatsDateCard = props => {
    return (
        <>
        <MuiThemeProvider theme={theme}>
            <Button color="primary">Daily</Button>
            <Button color="secondary">Weekly</Button>
            <Button color="secondary">Monthly</Button>
        </MuiThemeProvider>
        </>
    )
}

StatsDateCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default StatsDateCard;