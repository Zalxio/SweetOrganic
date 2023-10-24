import React from "react";
import {Link} from 'react-router-dom';
import './header.css'

const Header = () =>{
    return (
        <header>
            <div className="left">
                <nav className="mainNav">
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/products">Products</Link></li>
                    </ul>
                </nav>
            </div>
            
            <nav className="serviceNav">
                <ul>
                    <li><Link to="/signup">Sign up</Link></li>
                    <li><Link to="/signin">Sign in</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;