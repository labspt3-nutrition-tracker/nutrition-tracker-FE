import React from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
    root: {
        background: '#40A798',
        width: '150px'
    }
})(Fab);

const Settings = props => {
    return(
        <div>
            <StyledButton
                variant="extended"
                size="large"
            >
                Logout
            </StyledButton>
        </div>
    )
}

export default Settings;