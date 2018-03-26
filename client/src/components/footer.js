import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <nav className="pull-left">
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Use</Link></li>
                    </ul>
                </nav>
                <div className="copyright pull-right">
                    &copy; {`${new Date().getFullYear()}, Letalent. All Rights Reserved.`}   
                </div>
            </div>
        </footer>
    );
}

export default Footer;