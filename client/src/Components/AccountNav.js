import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from "./Reusables/Header";

const AccountNav = () => {
    return (
        <DivContainer>
            <Header />
            <ButtonDiv>
                <AccountButton>
                <Link to={'/billing-plan'}>Billing</Link>
                </AccountButton>
                <AccountButton>
                <Link to={'/settings'}>Settings</Link>
                </AccountButton>
                           
            </ButtonDiv>
        </DivContainer>
    )
}

export default AccountNav;

const DivContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
max-width: 1000px;
`

const ButtonDiv = styled.div`
margin-top: 2.5%;
display: flex;
width: 100%;
justify-content: center;
padding: 2%;
`;

const AccountButton = styled.button`
display: flex;
justify-content: center;
background-color:  #f4b4c3;
color: white;
width: 40%;
padding: 3% 2%;
margin: 2.5%;
font-size: 3rem;
font-weight: bold;
&:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
}
`;