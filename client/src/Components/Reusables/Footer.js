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
    width: 500,
  },
});

export default function Footer(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <div>Lambda School</div>
      <div>Nutrition Tracker App</div>
      <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
      {/* <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} /> */}
      <BottomNavigationAction label="Folder" value="folder" icon={<Icon>folder</Icon>} />
    </BottomNavigation>
  );
}
