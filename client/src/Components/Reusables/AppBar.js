import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
// import WithTheme from './WithTheme';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
  },
  typography: {
    htmlFontSize: 16,
    useNextVariants: true,
  },
})


// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

// function ButtonAppBar(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <Button color="inherit">Home</Button>
//           <Button color="inherit">Account</Button>
//           <Button color="inherit">Reports</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

function ButtonAppBar() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button color="primary">Home</Button>
      <Button color="secondary">Account</Button>
      <Button color="secondary">Reports</Button>
    </MuiThemeProvider>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(ButtonAppBar);
export default ButtonAppBar;