import React from 'react';
import Header from "./Reusables/Header";
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
    root: {
        background: '#40A798',
        width: '150px'
    }
})(Fab);

const StyledLogoutButton = withStyles({
    root: {
        background: '#40A798',
        width: '100px',
        height:'50px'
    }
})(Fab);

const SettingsContainer = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    width:100%;
    height:100vh;
    align-content: center;
`;

const LogoutContainer = styled.div`
    display:flex;
    justify-content:center;
    width:100%;
    margin-bottom:50px;
`;


const Settings = props => {
    return(
        <>
            <SettingsContainer>
            
                <LogoutContainer>
                    <StyledLogoutButton
                    variant="extended"
                    size="large"
                    >
                    Logout
                    </StyledLogoutButton>
                </LogoutContainer>
                <form>
                    <h2 style={{marginBottom:20}}>Body Goals</h2>
                    <div style={{marginBottom:50}}>
                        <h3>Initial Weight</h3>
                        <TextField
                            margin="dense"
                        />
                        <h3>Current Weight</h3>
                        <TextField/>
                    </div>
                    <h2 style={{marginBottom:20}}>Calories</h2>
                    <div style={{marginBottom:50}}>
                        <h3>Daily Calorie Goal</h3>
                        <TextField
                            placeholder="900 Calories"
                            margin="dense"
                        />
                    </div>
                    <h2 style={{marginBottom:20}}>Download Report</h2>
                    <div>
                        <StyledButton
                        variant="extended"
                        size="large"
                        download="test"
                        href="test"
                        >
                        Download
                        </StyledButton>
                    </div>


                </form>
            </SettingsContainer>
        </>
    )
}

export default Settings;