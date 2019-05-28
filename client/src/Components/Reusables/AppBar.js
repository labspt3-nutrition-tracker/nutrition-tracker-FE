import React from "react";
import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
// import red from "@material-ui/core/colors/red";
import { NavLink } from "react-router-dom";

import SearchInputComponent from './../SearchComponent/SearchInputComponent'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue
  },
  typography: {
    fontSize: 25,
    useNextVariants: true,
  },
})

// const styles = {
//   root: {
//     flexGrow: 1
//   },
//   grow: {
//     flexGrow: 1
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20
//   }
// };

// function ButtonAppBar(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <NavLink to="/">
//             <Button color="inherit">Home</Button>
//           </NavLink>
//           <NavLink to="/login">
//             <Button color="inherit">Login</Button>
//           </NavLink>
//           <NavLink to="/settings">
//             <Button color="inherit">Account</Button>
//           </NavLink>
//           <NavLink to="/reports">
//             <Button color="inherit">Reports</Button>
//           </NavLink>
//           <NavLink to="/dashboard">
//             <Button color="inherit">Dashboard</Button>
//           </NavLink>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

const ButtonAppBar = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/">
            <Button color="inherit">Home</Button>
          </NavLink>
          <NavLink to="/login">
            <Button color="inherit">Login</Button>
          </NavLink>
          <NavLink to="/account">
            <Button color="inherit">Account</Button>
          </NavLink>
          <NavLink to="/stats">
            <Button color="inherit">Reports</Button>
          </NavLink>
          <NavLink to="/dashboard">
            <Button color="inherit">Dashboard</Button>
          </NavLink>
          <NavLink to="/journal">
            <Button color="inherit">Journal</Button>
          </NavLink>
        </Toolbar>
        <SearchInputComponent updateSearch={props.updateSearch} searchInput={props.searchInput} getFoodData={props.getFoodData} searchResults={props.searchResults}/>
      </AppBar>
    </MuiThemeProvider>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(ButtonAppBar);
export default ButtonAppBar;
