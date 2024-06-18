import React from 'react';
import './navbarStyle.css';

const Navbar = () => {
    const handleConnectClick = () => {
        window.location.href = "https://x.com/saumyajeet_6103"; // Replace with your actual redirect URL
    };

    return (
        <nav>
            <a href="/">
                <img src="/logo.png" alt="aoDrop logo" className="logo" />
            </a>
            <img
                src="/X.png"
                alt="Connect"
                className="connect-image"
                onClick={handleConnectClick} // Add onClick event to handle redirection
            />
        </nav>
    );
};

export default Navbar;
