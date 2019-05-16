import React from 'react';
import { Link } from 'react-router-dom';


const AccountNav = () => {
    return (
        <>
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