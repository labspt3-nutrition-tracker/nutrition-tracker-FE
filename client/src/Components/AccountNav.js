import React from 'react';
import { Link } from 'react-router-dom';
import Header from "./Reusables/Header";

const AccountNav = () => {
    return (
        <>
            <Header />
            <div>
            <Link to={'/billing'}>Billing</Link>
            </div>
            <div>
            <Link to={'/settings'}>Settings</Link>
            </div>
        </>
    )
}

export default AccountNav;